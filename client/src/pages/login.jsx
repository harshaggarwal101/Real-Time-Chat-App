import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {setToken} from "../redux/slices/auth";
import { setUserDetails } from "../redux/slices/user";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in...");

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        formData,
      );

      if (!response.data.success) {
        throw new Error("Login failed");
      }
      dispatch(setUserDetails(response.data.userDetails));
      dispatch(setToken(response.data.token));
      toast.dismiss(toastId);
      toast.success(response.data.message);

      // Wait before redirect so toast remains visible
      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-[550px]">
      <div className="bg-gray-800 px-6 py-4 flex flex-col items-center rounded-[20px]">
        <h2 className="text-4xl mb-2">Login</h2>
        <p>Welcome back, please enter your details</p>

        <form
          className="mt-6 w-[96%] flex flex-col gap-3"
          onSubmit={submitHandler}
        >
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={onchangeHandler}
            className="px-4 py-2 bg-transparent border border-gray-600 text-white rounded-md"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={onchangeHandler}
            className="px-4 py-2 bg-transparent border border-gray-600 text-white rounded-md"
          />

          <button
            disabled={loading}
            className="bg-yellow-400 px-4 py-2 mt-2 rounded-md font-semibold flex items-center justify-center gap-2 text-black"
            type="submit"
          >
            {loading && (
              <i className="fa-solid fa-spinner animate-spin text-black"></i>
            )}
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>

      <div className="flex items-center gap-2 justify-center mt-2 text-gray-100">
        <p>Don't have an account?</p>
        <Link to={"/"} className="underline text-blue-700">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;