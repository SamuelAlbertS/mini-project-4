import api from "../../util/api.instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const clockIn = createAsyncThunk(
    "attd/clockin",
    async (payload, {rejectWithValue}) => {
        try{
            const data = {
                employeeId : payload.employeeId,
            }
            const response = await api.post("/api/attd/clockin",data)
            if(response.data?.length === 0){
                return rejectWithValue({ message : "Something is wrong."})
            }
            alert("You have clocked in!");
            return response.data;
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const clockOut = createAsyncThunk(
    "attd/clockout",
    async (payload, {rejectWithValue}) => {
        try{
            const data = {
                employeeId : payload.employeeId,
            }
            const response = await api.post("/api/attd/clockout",data)
            if(response.data?.length === 0){
                return rejectWithValue({ message : "Something is wrong."})
            }
            alert("You have clocked out!");
            return response.data;
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const getList = createAsyncThunk(
    "attd/list",
    async (payload, {rejectWithValue}) => {
        try{
            console.log("payload", payload)
            let data ={
                employeeId:payload
            }
            const response = await api.post("/api/attd/list", data)
            return response.data
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)