import * as config from "../../config/index.js";
import { ValidationError } from "yup";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import moment from "moment";

import * as helpers from "../../helper/index.js";
import * as error from "../../middleware/error.handler.js";
import db from "../../database/index.js";
import * as validation from "./validation.js";
import { Employee } from "../../models/employee.js";

const cache = new Map();

export const register = async (req, res, next) => {
    try{
        const transaction = await db.sequelize.transaction();
        const {username, password, email} = req.body;
        await validation.RegisterValidationSchema.validate(req.body);

        const userExists = await Employee?.findOne({where : {username, email}});
        if(userExists) throw ({status : 400, message : error.USER_ALREADY_EXISTS});

        const hashedPassword = helpers.hashPassword(password);
        const otpToken = helpers.generateOtp();
        const user = await Employee?.create({
            username, password : hashedPassword, email, otp : otpToken, expiredOtp : moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss")
        });
        delete user?.dataValues?.password; delete user?.dataValues?.otp; delete user?.dataValues?.expiredOtp;
        const accessToken = helpers.createToken({uuid : user?.dataValues?.employee, role:user?.dataValues?.role});

        const template = fs.readFileSync(path.join(process.cwd(),"template","verify.html"),"utf8");
        const message = handlebars.compile(template)({otpToken, link : config.REDIRECT_URL + `/verify/reg-${user?.dataValues?.employeeId}`});

        const mailOptions = {
            from : config.GMAIL,
            to : email,
            subject : "Verification new User",
            html : message
        }
        helpers.transporter.sendMail(mailOptions,(error, info)=>{
            if(error) throw error;
            console.log("Email send into: "+info.response);
        })

        res.header("Authorization",`Bearer ${accessToken}`)
        .status(200).json({
            message : `User created, please check ${email}`,
            user
        })
        await transaction.commit();
    }catch(error){
        next(error)
    }
}

export const login = async (req, res, next) => {
    try{
        const {username, password} = req.body;

        await validation.LoginValidationSchema.validate(req.body);

        const userExists = await Employee?.findOne({where : {username}});
        if(!userExists) throw ({status : 400, message : error.USER_DOES_NOT_EXISTS});

        const isPasswordCorrect = helpers.comparePassword(password, userExists?.dataValues?.password);
        if(!isPasswordCorrect) throw ({status:400, message:error.INVALID_CREDENTIALS});

        const cachedToken = cache.get(userExists?.dataValues?.employeeId)
        const isValid = cachedToken && helpers.verifyToken(cachedToken)
        let accessToken = null
        if(cachedToken && isValid){
            accessToken = cachedToken
        }else{
            //generate access token
            accessToken = helpers.createToken({uuid : userExists?.dataValues?.employeeId, role : userExists?.dataValues?.role});
            cache.set(userExists?.dataValues?.employeeId,accessToken)
        }

        //delete password from response
        delete userExists?.dataValues?.password;
        delete userExists?.dataValues?.otp;
        delete userExists?.dataValues?.expiredOtp;

        res.header("Authorization",`Bearer ${accessToken}`)
            .status(200)
            .json({user : userExists, token : accessToken})
    }catch(error){
        if (error instanceof ValidationError){
            return next({ status : 400, message : error?.errors?.[0]})
        }
        next(error)
    }
}

export const verification = async(req, res, next) => {
    try{
        const {otp} = req.body;
        const user = await Employee?.findOne({where : {otp}});
        if(!user) throw ({status : 400, message : error.USER_DOES_NOT_EXISTS});

        const isExpired = moment().isAfter(Employee?.dataValues?.expiredOtp);
        if(isExpired) throw ({status : 400, message : error.INVALID_CREDENTIALS});

        await Employee?.update({isVerified : "true", otp : null, expiredOtp : null},{where : {otp}});

        res.status(200).json({message : "Account verified successfully",data : user?.dataValues?.employeeId});
    }catch(error){
        next(error)
    }
}

export const keepLogin = async(req, res, next) => {
    try{
        const{uuid} = req.user;
        console.log(req.user);
        const user = await Employee?.findOne({where : {employeeId : uuid}})

        delete user?.dataValues?.password;
        delete user?.dataValues?.otp;
        delete user?.dataValues?.expiredOtp;

        res.status(200).json({user});
    }catch(error){
        next(error);
    }
}

export const forgetPassword = async (req, res, next) => {
    try{
        const {email} = req.body;

        const userExists = await Employee?.findOne({where : {email}});
        const employeeId = userExists?.dataValues?.employeeId;
        if(!userExists) throw ({status : 400, message : error.USER_DOES_NOT_EXISTS});

        const otpToken = helpers.generateOtp();
        await Employee?.update({otp : otpToken, expiredOtp : moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss")},{where : {email}});

        const template = fs.readFileSync(path.join(process.cwd(),"template","forget.html"),"utf8");
        const message = handlebars.compile(template)({otpToken, link:config.REDIRECT_URL+`/reset/for-${employeeId}`});

        const mailOptions = {
            from : config.GMAIL,
            to : email,
            subject : "ForgetPassword",
            html : message
        }
        helpers.transporter.sendMail(mailOptions,(error,info)=>{
            if(error) throw error;
            console.log("Email sent :"+info.response);
        })

        res.status(200).json({ message : "Email sent to forget password. Check your email."})
    }catch(error){
        next(error)
    }
}

export const resetPassword = async (req, res, next) => {
    try{
        const {otp, password} = req. body;

        const user = await Employee?.findOne({where : {otp}});
        if(!user) throw ({status : 400, message : error.USER_DOES_NOT_EXISTS});

        const isExpired = moment().isAfter(user?.dataValues?.expiredOtp);
        if(isExpired) throw ({status : 400, message : error.INVALID_CREDENTIALS});

        const newPassword = helpers.hashPassword(password);

        await Employee?.update({password : newPassword, otp : null, expiredOtp : null},{where : {otp}});

        res.status(200).json({message : "Password reset!"})
    }catch(error){
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try{
        const {employeeId, username, email, password} = req.body;

        const isThere = await Employee?.findOne({where : {employeeId}});
        if(!isThere) throw ({status : 400, message : "user not found."});
        
        const updateData = {};
        updateData.username = username;
        updateData.email = email;
        updateData.password = helpers.hashPassword(password);

        const edited = await Employee?.update(updateData, {where : {employeeId}});
        res.status(200).json({message : "Employee data changed!", data:edited})
    }catch(error){
        next(error)
    }
}

export const requestOtp = async (req, res, next) => {
    try{
        const {email, context} = req.body;

        const employee = await Employee?.findOne({where : {email}});
        if(!employee) throw ({status : 400, message : error.USER_DOES_NOT_EXISTS});

        const otpToken = helpers.generateOtp();
        await Employee?.update({otp : otpToken, expiredOtp : moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss")},{where : {email}})

        if(context === "reg"){
            const template = fs.readFileSync(path.join(process.cwd(),"template","verify.html"),"utf8");
            const message = handlebars.compile(template)({otpToken, link : config.REDIRECT_URL + `/verify/reg-${employee?.dataValues?.employeeId}`});

        const mailOptions = {
            from : config.GMAIL,
            to : email,
            subject : "Verification new User",
            html : message
            }
            helpers.transporter.sendMail(mailOptions,(error, info)=>{
                if(error) throw error;
                console.log("Email send into: "+info.response);
            })
        }

        if(context === "for"){
            const template = fs.readFileSync(path.join(process.cwd(),"templates","forget.html"),"utf8");
            const message = handlebars.compile(template)({otpToken, link:config.REDIRECT_URL+`/reset/for-${employee?.dataValues?.employeeId}`});

        const mailOptions = {
            from : config.GMAIL,
            to : email,
            subject : "ForgetPassword",
            html : message
        }
        helpers.transporter.sendMail(mailOptions,(error,info)=>{
            if(error) throw error;
            console.log("Email sent :"+info.response);
        })

        }

        res.status(200).json({message : "please check your email!", data : context})
    }catch(error){
        next(error);
    }
}