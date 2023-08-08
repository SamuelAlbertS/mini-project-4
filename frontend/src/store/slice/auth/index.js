import { createSlice } from "@reduxjs/toolkit";

import {login, logout, register, keepLogin, forgetPassword, resetPassword, verifyEmail, updateUser, requestotp} from "./slices.js"

const authSlice = createSlice({
    name : "auth",
    initialState : {
        isLoading : false,
        employeeId : null,
        username : null,
        password : null,
        email : null,
        isVerified : null,
        role : null,
        token : null,
        error : null
    },
    reducers : {

    },
    extraReducers : {
        [register.pending] : (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [register.fulfilled] : (state, action) => {
            state.isLoading = false
        },
        [register.rejected] : (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message
        },
        [login.pending] : (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [login.rejected] : (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message
        },
        [login.fulfilled] : (state, action) => {
            state.isLoading = false
            state.employeeId = action.payload?.user?.employeeId
            state.username = action.payload?.user?.username
            state.email = action.payload?.user?.email
            state.password = action.payload?.user?.password
            state.isVerified = action.payload?.user?.isVerified
            state.token = action.payload?.token
        },
        [logout.pending] : (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [logout.fulfilled] : (state, action) => {
            state.isLoading = false
            state.employeeId = null
            state.username = null
            state.email = null
            state.password = null
            state.isVerified = null
            state.token = null
        },
        [logout.rejected] : (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message
        },
        [keepLogin.pending] : (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [keepLogin.fulfilled] : (state, action) => {
            state.isLoading = false
            state.employeeId = action.payload?.user?.employeeId
            state.username = action.payload?.user?.username
            state.email = action.payload?.user?.email
            state.password = action.payload?.user?.password
            state.isVerified = action.payload?.user?.isVerified
            state.token = localStorage.getItem("token")
        },
        [keepLogin.rejected] : (state, action) => {
            state.isKeepLoginLoading = false
            state.error = action.payload?.message
        },
        [forgetPassword.pending] : (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [forgetPassword.fulfilled] : (state, action) => {
            state.isLoading = false
        },
        [forgetPassword.rejected] : (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message
        },
        [verifyEmail.pending] : (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [verifyEmail.fulfilled] : (state, action) => {
            state.isLoading = false
        },
        [verifyEmail.rejected] : (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message
        },
        [resetPassword.pending] : (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [resetPassword.fulfilled] : (state, action) => {
            state.isLoading = false
        },
        [resetPassword.rejected] : (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message
        },
        [updateUser.pending] : (state, action)=>{
            state.isLoading = true
            state.error = null
        },
        [updateUser.fulfilled] : (state, action) => {
            state.isLoading = false
        },
        [updateUser.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload?.message
        },
        [requestotp.pending] : (state,action)=>{
            state.isLoading = true
            state.error = null
        },
        [requestotp.fulfilled] : (state,action)=>{
            state.isLoading = false
        },
        [requestotp.rejected] : (state,action)=>{
            state.isLoading = false
            state.error = action.payload?.message
        }

    }
})

export default authSlice.reducer