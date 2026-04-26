import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitFormDataHandler = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm password do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    const toastId = toast.loading("Creating Account...");
    console.log("clicked submit");

    try {
      setLoading(true);

      //  FIXED URL HERE 🔥🔥🔥
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/signup`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.data.success) {
        throw new Error("Error occurred during signup");
      }

      toast.dismiss(toastId);
      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 800);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.dismiss(toastId);
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-w-[550px]">
      <div className="bg-gray-800 px-6 py-4 flex flex-col items-center rounded-[20px]">
        <h2 className="text-4xl mb-2">Sign Up</h2>
        <p>Sign up to continue</p>

        <form
          className="mt-6 w-[96%] flex flex-col gap-2"
          onSubmit={submitFormDataHandler}
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={onchangeHandler}
            className="w-full px-4 py-2 bg-transparent border border-gray-600 text-white rounded-md"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={onchangeHandler}
            className="w-full px-4 py-2 bg-transparent border border-gray-600 text-white rounded-md"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={onchangeHandler}
            className="w-full px-4 py-2 bg-transparent border border-gray-600 text-white rounded-md"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={onchangeHandler}
            className="w-full px-4 py-2 bg-transparent border border-gray-600 text-white rounded-md"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={onchangeHandler}
            className="w-full px-4 py-2 bg-transparent border border-gray-600 text-white rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 px-4 py-2 mt-2 rounded-md font-semibold"
          >
            Create Account
          </button>

          {loading && (
            <i className="fa-solid fa-spinner animate-spin text-white"></i>
          )}
        </form>
      </div>

      <div className="flex items-center gap-2 justify-center mt-2 text-gray-100">
        <p>Already have an account?</p>
        <Link to={"/login"} className="underline text-blue-700">
          SignIn
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
