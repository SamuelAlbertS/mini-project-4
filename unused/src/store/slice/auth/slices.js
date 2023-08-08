import api from "../../util/api.instance.js";
import {createAsyncThunk} from "@reduxjs/toolkit";
import { registerValidationSchema, forgetValidationSchema, loginValidationSchema, resetValidationSchema, updateValidationSchema, verifyValidationSchema} from "./validation.js";

export const login = createAsyncThunk(
    "auth/login",
    async (payload, {rejectWithValue}) => {
        try{
            await loginValidationSchema.validate(payload)
            const data = {
                username : payload.username,
                password : payload.password
            }
            const response = await api.post("/api/auth/login",data)
            if(response.data?.length === 0){
                return rejectWithValue({ message : "username or password doesn't exists."})
            }
            if(response.data[0]?.isVerified === "false"){
                return rejectWithValue({ message : "account not verified"})
            }

            localStorage.setItem("token",response.data.token)
            alert("login successful")
            return response.data
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const keepLogin = createAsyncThunk(
    "auth/keepLogin",
    async(payload, {rejectWithValue}) => {
        try{
            const token = localStorage.getItem("token")
            if(!token){
                return rejectWithValue({message : "token not found."})
            }
            const response = await api.get("/api/auth/keepLogin")
            return response.data
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async(payload, {rejectWithValue}) => {
        try{
            localStorage.removeItem("token")
            return{}
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const verifyEmail = createAsyncThunk(
    "auth/verify/",
    async(payload, {rejectWithValue}) => {
        try{
            await verifyValidationSchema.validate(payload)
            const response = await api.patch("/api/auth/verify",payload)
            if(response.data?.length === 0){
                return rejectWithValue({message : "The account doesn't exist."})
            }
            alert("User Verified.");
            return{}
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
        
    }
)

export const forgetPassword = createAsyncThunk(
    "auth/forget",
    async(payload, {rejectWithValue}) => {
        try{
            console.log(payload)
            await forgetValidationSchema.validate(payload)
            const response= await api.put("/api/auth/forget",payload);
            alert("Please check your email.")
            return response.data;
        }catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const resetPassword = createAsyncThunk(
    "auth/reset",
    async(payload, {rejectWithValue}) => {
        try{
            await resetValidationSchema.validate(payload)
            const response = await api.patch("/api/auth/reset",payload)
            if(response.data?.length === 0){
                return rejectWithValue({message : "Something went wrong."})
            }
            alert("Password reset!")
            return {}
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateUser = createAsyncThunk(
    "auth/update",
    async(payload,{rejectWithValue})=>{
        try{
            const response = await api.patch("/api/auth/update",payload)
            if(response.data?.length === 0){
                return rejectWithValue({message : "Something went wrong."})
            }
            alert("User updated")
            return{}
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async(payload, {rejectWithValue}) => {
        try{
            await registerValidationSchema.validate(payload)

            const data = {
                username : payload.username,
                email : payload.email,
                password : payload.password
            }

            const response = await api.post("/api/auth/register",data)
            if(response.data?.length === 0){
                return rejectWithValue({message : "something goes wrong."})
            }
            alert("Please check your mail. Register done!")
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const requestotp = createAsyncThunk(
    "auth/request",
    async(payload,{rejectWithValue}) => {
        try{
            const response = await api.post("/api/auth/requestotp",payload)
            if(response.data?.length === 0){
                return rejectWithValue({message : "something goes wrong"})
            } 
            alert("Please check your mail once again.")
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)