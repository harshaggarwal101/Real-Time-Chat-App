import { createSlice } from "@reduxjs/toolkit";

const initialState={
    socket:null,
    allOnlineUsers:[],
}

export const socketSlice=createSlice({
    name:"socketio",
    initialState,
    reducers:{
        setSocket:(state,value)=>{
            state.socket=value.payload;
        },
        setAllOnlineUsers:(state,value)=>{
            state.allOnlineUsers=value.payload;
        }
    }
})

export const {setAllOnlineUsers,setSocket}=socketSlice.actions;
export default socketSlice.reducer;