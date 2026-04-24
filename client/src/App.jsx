import React from "react";
import SignUp from "./pages/signUp"
import Login  from "./pages/login";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Homepage from "./pages/Homepage";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path:"/login",element:<Login/>
    },
    {
      path:"/home",element:<Homepage/>
    }
  ]);
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
