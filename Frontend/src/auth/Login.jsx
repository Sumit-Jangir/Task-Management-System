import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken } from "../Redux/slice";

function Login({ getBgUrl }) {
  const [userDetail, setUserDetail] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/auth/login`, {
        ...userDetail,
      });
  
      if (response.status === 200) {
        toast.success("Login Successfully!");
        setUserDetail({});
        dispatch(setToken(response.data.token));
        localStorage.setItem("userId", response.data._id);
        await getBgUrl();
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Please try again.");
    }
  };

  return (
    <div className="h-screen bg-[#1D2125] flex items-center justify-center px-4 -pt-11">
      <div className="w-full max-w-[400px] bg-[#282E33] rounded-lg shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#9FADBC] text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="w-full px-4 py-2.5 bg-[#22272B] border border-[#A6C5E229] rounded-md text-white placeholder-[#9FADBC] focus:outline-none focus:ring-2 focus:ring-[#579DFF] focus:border-transparent transition-colors"
              required
              onChange={(e) =>
                setUserDetail({
                  ...userDetail,
                  email: e.target.value,
                })
              }
            />
          </div>
          
          <div>
            <label className="block text-[#9FADBC] text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="Password"
              className="w-full px-4 py-2.5 bg-[#22272B] border border-[#A6C5E229] rounded-md text-white placeholder-[#9FADBC] focus:outline-none focus:ring-2 focus:ring-[#579DFF] focus:border-transparent transition-colors"
              required
              onChange={(e) =>
                setUserDetail({
                  ...userDetail,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#579DFF] hover:bg-[#579DFF]/90 text-white font-medium py-2.5 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#579DFF] focus:ring-offset-2 focus:ring-offset-[#282E33]"
          >
            Log in
          </button>

          <div className="text-center">
            <p className="text-[#9FADBC] text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#579DFF] hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
