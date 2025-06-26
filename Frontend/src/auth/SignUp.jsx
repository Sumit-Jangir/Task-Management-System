import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function SignUp() {
  const [userDetail, setuserDetail] = useState({});
  const [referral, setReferral] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/auth/signup`, {
        ...userDetail,
      });

      if (response.status === 201) {
        toast.success("SignUp Successfully!, Please Login");
        setuserDetail({});
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Please try again...");
    }
  };

  return (
    <div className="h-screen bg-[#1D2125] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px] bg-[#282E33] rounded-lg shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#9FADBC] text-sm font-medium mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              className="w-full px-4 py-2 bg-[#22272B] border border-[#A6C5E229] rounded-md text-white placeholder-[#9FADBC] focus:outline-none focus:ring-2 focus:ring-[#579DFF] focus:border-transparent transition-colors"
              required
              onChange={(e) =>
                setuserDetail({
                  ...userDetail,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-[#9FADBC] text-sm font-medium mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="w-full px-4 py-2 bg-[#22272B] border border-[#A6C5E229] rounded-md text-white placeholder-[#9FADBC] focus:outline-none focus:ring-2 focus:ring-[#579DFF] focus:border-transparent transition-colors"
              required
              onChange={(e) =>
                setuserDetail({
                  ...userDetail,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-[#9FADBC] text-sm font-medium mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              name="password"
              className="w-full px-4 py-2 bg-[#22272B] border border-[#A6C5E229] rounded-md text-white placeholder-[#9FADBC] focus:outline-none focus:ring-2 focus:ring-[#579DFF] focus:border-transparent transition-colors"
              required
              onChange={(e) =>
                setuserDetail({
                  ...userDetail,
                  password: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-[#9FADBC] text-sm font-medium mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              className="w-full px-4 py-2 bg-[#22272B] border border-[#A6C5E229] rounded-md text-white placeholder-[#9FADBC] focus:outline-none focus:ring-2 focus:ring-[#579DFF] focus:border-transparent transition-colors"
              required
              onChange={(e) =>
                setuserDetail({
                  ...userDetail,
                  conformPassword: e.target.value,
                })
              }
            />
          </div>

          <div>
            <button
              type="button"
              onClick={() => setReferral(!referral)}
              className="text-[#9FADBC] hover:text-[#579DFF] text-sm font-medium transition-colors flex items-center gap-2"
            >
              Referral Code (Optional)
              <svg
                className={`w-4 h-4 transition-transform ${referral ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {referral && (
              <input
                type="text"
                placeholder="Enter referral code"
                className="w-full mt-2 px-4 py-2 bg-[#22272B] border border-[#A6C5E229] rounded-md text-white placeholder-[#9FADBC] focus:outline-none focus:ring-2 focus:ring-[#579DFF] focus:border-transparent transition-colors"
                onChange={(e) =>
                  setuserDetail({
                    ...userDetail,
                    refCode: e.target.value,
                  })
                }
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#579DFF] hover:bg-[#579DFF]/90 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#579DFF] focus:ring-offset-2 focus:ring-offset-[#282E33]"
          >
            Create account
          </button>

          <div className="text-center">
            <p className="text-[#9FADBC] text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-[#579DFF] hover:underline font-medium">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
