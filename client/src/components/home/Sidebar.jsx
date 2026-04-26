import React, { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../redux/slices/auth";
import { setUserDetails } from "../../redux/slices/user";
import axios from "axios";
import Loader from "../common/Loader";

const Sidebar = ({ setChatUserId, chatUserId }) => {
  const { userData } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { allOnlineUsers } = useSelector((state) => state.socketio);

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
        throw new Error("Error fetching users");
      }

      setAllUsers(response.data.allUsers);
      setOriginalAllUsers(response.data.allUsers);
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

    if (!value) {
      setAllUsers(originalAllUsers);
      return;
    }

    const filtered = originalAllUsers.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(value);
    });

    setAllUsers(filtered);
  };

  const onlineSet = useMemo(() => {
    return new Set(allOnlineUsers || []);
  }, [allOnlineUsers]);

  return (
    <div className="h-full py-2">
      <div className="h-[91%] px-4 py-1">
        {/* Header */}
        <div className="h-[20%]">
          <h2 className="text-3xl flex items-center font-semibold">
            <p>RIVOR</p>
            <p className="text-5xl text-yellow-400 animate-bounce">A</p>
          </h2>

          <input
            type="text"
            className="w-full bg-gray-800 outline-none rounded-xl p-2 mt-4 text-lg"
            placeholder="Search here"
            onChange={searchHandler}
          />
        </div>

        {/* Users list */}
        <div className="h-[77%] overflow-y-auto p-2">
          {loading ? (
            <div className="flex justify-center items-center mt-52">
              <Loader />
            </div>
          ) : allUsers.length < 1 ? (
            <div className="text-center mt-40 font-semibold">
              Users not found
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {allUsers.map((user) => {
                const isActive = String(chatUserId) === String(user?._id);

                const isOnline = onlineSet.has(user?._id);

                return (
                  <div
                    key={user?._id}
                    onClick={() => setChatUserId(user?._id)}
                    className={`flex items-center gap-4 cursor-pointer p-2 rounded-full transition-colors duration-200
                      ${isActive ? "bg-gray-900" : "hover:bg-gray-950"}
                    `}
                  >
                    {/* Profile */}
                    <div className="relative">
                      <img
                        src={user?.profilePic}
                        className="h-12 w-12 rounded-full object-cover"
                        alt="profile"
                      />

                      {isOnline && (
                        <div className="h-3 w-3 rounded-full bg-green-400 absolute top-0 right-0" />
                      )}
                    </div>

                    {/* Name + status */}
                    <div>
                      <p>
                        {user?.firstName} {user?.lastName}
                      </p>

                      <p
                        className={`text-sm font-semibold ${
                          isOnline ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {isOnline ? "online" : "offline"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom profile */}
      <div className="h-[9%] flex items-center justify-between px-4 border-t border-gray-950">
        <div className="flex items-center gap-3">
          <img
            src={userData?.profilePic}
            className="h-10 w-10 rounded-full object-cover"
          />
          <p>
            {userData?.firstName} {userData?.lastName}
          </p>
        </div>

        <button
          onClick={logoutHandler}
          className="bg-gray-900 px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
