import { createSlice } from "@reduxjs/toolkit";

import { clockIn, clockOut, getList } from "./slices";

const attdSlice = createSlice({
    name : "attd",
    initialState : {
        isLoading : false,
        list : []
    },
    reducers : {

    },
    extraReducers : {
        [getList.pending] : (state,action) => {
            state.isLoading = true
        },
        [getList.fulfilled] : (state,action) => {
            state.isLoading = false
            state.list = action.payload.data
        },
        [getList.rejected] : (state,action) => {
            state.isLoading = false
            state.list = []
        },
        [clockIn.pending] : (state,action) => {
            state.isLoading = true
        },
        [clockIn.rejected] : (state,action) => {
            state.isLoading = false
        },
        [clockIn.fulfilled] : (state,action) => {
            state.isLoading = false
        },
        [clockOut.pending] : (state,action) => {
            state.isLoading = true
        },
        [clockOut.rejected] : (state,action) => {
            state.isLoading = false
        },
        [clockOut.fulfilled] : (state,action) => {
            state.isLoading = false
        }
    }
})

export default attdSlice.reducer