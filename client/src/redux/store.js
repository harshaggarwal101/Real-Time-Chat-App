import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { userSlice } from "./slices/user";

export const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        user:userSlice.reducer,
    }
})