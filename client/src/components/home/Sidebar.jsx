import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../redux/slices/auth";
import { setUserDetails } from "../../redux/slices/user";

const Sidebar = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    const confirm=window.confirm("Are you sure you want to Logout??");
    if(!confirm) return;
    dispatch(removeToken()); // remove JWT token
    dispatch(setUserDetails(null)); // remove stored user data

    toast.success("Logout successful");
    navigate("/login");
  };

  const getAllUsers=async ()=>{
    try {
        
    } catch (error) {
        
    }
  }

  return (
    <div className="h-full py-2">
      <div className="h-[91%]"></div>

      <div className="h-[9%] flex items-center px-3 justify-between border-t border-gray-950">
        <img
          src={userData?.profilePic}
          className="h-12 w-12 rounded-full object-cover"
          alt="profile"
        />

        <button
          onClick={logoutHandler}
          className="bg-gray-900 px-6 py-2 rounded-md hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
};


export default Sidebar;
