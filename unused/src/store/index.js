import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/auth/index.js"
import attdReducer from "./slice/attd/index.js"

const store = configureStore(
    {
        reducer : {
            auth : authReducer,
            attd : attdReducer
        }
    }
)

export default store