import React from "react";
import SignUp from "./pages/signUp"
import Login  from "./pages/login";
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Homepage from "./pages/Homepage";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useEffect } from "react";
import { setAllOnlineUsers, setSocket } from "./redux/slices/socket";
const App = () => {

  const {token}=useSelector((state)=>state.auth);
  const {userData}=useSelector((state)=>state.user);
  const dispatch=useDispatch();

  console.log("userData",userData);

  const router = createBrowserRouter([
    {
      path: "/",
      element:token?<Homepage/>:<SignUp/>
    },
    {
      path:"/login",element:token?<Homepage/>:<Login/>
    },
    {
      path:"/home",element:token?<Homepage/>:<Navigate to={"/login"}/>
    }
  ]);

  useEffect(()=>{
    const socket = io(`${import.meta.env.VITE_SOCKET_URL}`,{
      query:{
        userId:userData?._id,
      }
    });

    dispatch(setSocket(socket));
    
    socket.on("sent-all-online-users",(data)=>{
      dispatch(setAllOnlineUsers(data));
    });

    return ()=>{
      socket.disconnect();

    }
  },[token]);

  return (
    <div className="min-h-screen w-[100vw] bg-gray-950 flex items-center justify-center text-white">
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default App;
