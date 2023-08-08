import { Attend } from "../../models/attendance.js"
import { Penalty } from "../../models/penalty.js";
import moment from "moment";

import * as helpers from "../../helper/index.js";
import * as error from "../../middleware/error.handler.js";
import db from "../../database/index.js";

export const clockIn = async(req, res, next) => {
    try{
        const {employeeId} = req.body;
        const action = "Clock In";
        const clock = moment().format("YYYY-MM-DD HH:mm:ss")
        const today = moment().format("YYYY-MM-DD")

        const existingClockIn = await Attend.findOne({
            where: {
                employeeId,
                clock: { $between: [`${today} 00:00:00`, `${today} 23:59:59`] },
                action: 'Clock In',
            }
        });

        if (existingClockIn) {
            return res.status(400).json({ message: "You've already clocked in today." });
        }

        const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
        /**
            const previousClockOut = await Attend.findOne({
                where: {
                    employeeId,
                    clock: { $between: [`${yesterday} 00:00:00`, `${yesterday} 23:59:59`] },
                    action: 'Clock Out',
                }
            });
    
            if (!previousClockOut) {
                return res.status(400).json({ message: "You haven't clocked out from yesterday." });
            }
        */

        const inner = await Attend?.create({employeeId, clock, action});

        res.status(200).json({message : "You are clocked in. Make sure you clocked out later.", data:inner})
    }catch(error){
        next(error)
    }
}

export const clockOut = async(req, res, next) => {
    try{
        const {employeeId} = req.body;
        const action = "Clock Out";
        const clock = moment().format("YYYY-MM-DD HH:mm:ss")
        const today = moment().format("YYYY-MM-DD")

        const existingClockIn = await Attend?.findAll({
            where : {
                employeeId,
                clock : {$between : [`${today} 00:00:00`,`${today} 23:59:59`]},
                action : "Clock In"
            }
        });

        if(existingClockIn){
            return res.status(400).json({message : error.CANNOT_CLOCKOUT})
        }

        const existingClockOut = await Attend?.findAll({
            where : {
                employeeId,
                clock : {$between : [`${today} 00:00:00`,`${today} 23:59:59`]},
                action : "Clock Out"
            }
        })
        
        if(existingClockOut){
            return res.status(400).json({message : error.CANNOT_CLOCKOUT})
        }

        const inner = await Attend?.create({employeeId, clock, action});

        res.status(200).json({message : "You are clocked out. Bye Bye!", data:inner})  
    }catch(error){
        next(error)
    }
}

export const attendList = async(req, res, next) => {
    try{
        const {employeeId} = req.body;
        const list = await Attend?.findAll({where : {employeeId: employeeId}});
        res.status(200).json({message : "Here are your list.",data : list})
    }catch(error){
        next(error)
    }
}

export const penaltyList = async(req,res,next) => {
    try{
        const {employeeId} = req.body;
        const penal = await Attend?.findAll({where : {employeeId : employeeId}});
        res.status(200).json({message : "Here are your salary deduction.",data : penal})
    }catch(error){
        next(error)
    }
}