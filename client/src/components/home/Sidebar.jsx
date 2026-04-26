import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../redux/slices/auth";
import { setUserDetails } from "../../redux/slices/user";
import axios from "axios";
import Loader from "../common/Loader";

const Sidebar = ({ setChatUserId ,chatUserId}) => {
  const { userData } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [originalAllUsers, setOriginalAllUsers] = useState([]);

  const logoutHandler = () => {
    const confirmLogout = window.confirm("Are you sure you want to Logout?");
    if (!confirmLogout) return;

    dispatch(removeToken());
    dispatch(setUserDetails(null));

    toast.success("Logout successful");
    navigate("/login");
  };

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getAllUsers`,
        {
          headers: { Authorization: "Bearer " + token },
        },
      );

      if (!response.data.success) {
        throw new Error("Error occurred during fetching user data");
      }

      setAllUsers(response.data.allUsers);
      setOriginalAllUsers(response.data.allUsers); // ← IMPORTANT
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const searchHandler = (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    if (!value) {
      setAllUsers(originalAllUsers);
      return;
    }

    const searchUsers = originalAllUsers.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(value);
    });
    setAllUsers(searchUsers);
  };

  return (
    <div className="h-full py-2">
      <div className="h-[91%] px-4 py-1">
        <div className="h-[20%]">
          <h2 className="text-semibold text-3xl flex items-center">
            <p>RIVOR</p>
            <p className="text-5xl text-yellow-400 animate-bounce">A</p>
          </h2>

          <div className="w-full">
            <input
              type="text"
              className="w-[100%] bg-gray-800 outline-none rounded-xl p-2 mt-4 text-lg"
              placeholder="Search here"
              onChange={searchHandler}
            />
          </div>
        </div>

        {/* FIXED CONDITIONAL RENDER BLOCK */}
        <div className="h-[77%] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center mt-52">
              <Loader />
            </div>
          ) : (
            <div>
              {allUsers.length < 1 ? (
                <div className="text-center mt-40 font-semibold">
                  Users not found
                </div>
              ) : (
                <div className="flex flex-col gap-4 h-full">
                  {allUsers.map((user, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setChatUserId(user?._id);
                        }}
                        className={`flex items-center gap-5 hover:bg-gray-950 transition-all duration-400 cursor-pointer p-2 rounded-full ${chatUserId==user?._id?"bg-gray-950":""}`}
                      >
                        <div className="relative">
                          <img
                            src={user?.profilePic}
                            alt={`${user?.firstName}Image`}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div className="h-3 w-3 rounded-full bg-green-600 absolute top-0 right-0"></div>
                        </div>
                        <div>
                          <p>
                            <span>{user?.firstName}</span>{" "}
                            <span>{user?.lastName}</span>
                          </p>
                          <p className="text-green-400 font-semibold">online</p>
                          <p className="text-red-400 font-semibold">offline</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Profile + Logout */}
      <div className="h-[9%] flex items-center px-4 justify-between border-t border-gray-950">
        <div className="flex items-center gap-4">
          <img
            src={userData?.profilePic}
            className="h-12 w-12 rounded-full object-cover"
            alt="profile"
          />
          <p className="text-xl font-semibold text-[18px]">
            <span>{userData?.firstName}</span> <span>{userData?.lastName}</span>
          </p>
        </div>

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
