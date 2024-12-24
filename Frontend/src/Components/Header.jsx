import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "./Redux/slice.jsx";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [isLogin, setIsLogin] = useState(token);

  const handleLogout = () => {
    dispatch(clearToken());
    setIsLogin(token);
    navigate("/login");
  };

  useEffect(() => {
    setIsLogin(token);
  }, [token]);

  return (
    <section
      id="header"
      className="bg-[#0000003d] shadow-md py-2 px-6 flex justify-between items-center"
    >
      {/* Logo/Welcome Text */}
      <div>
        <Link className="text-2xl text-white font-bold">Welcome User</Link>
        <NavLink
          className={({ isActive }) =>
            ` text-white ml-10  px-3 py-1 rounded-md ${
              isActive ? "bg-white !text-[#172b4d]" : ""
            }`
          }
          to="/"
        >
          Board
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            ` text-white ml-2  px-3 py-1 rounded-md ${
              isActive ? "bg-white !text-gray-900" : ""
            }`
          }
          to="/table"
        >
          Table
        </NavLink>
      </div>

      {/* Navigation */}
      <div className="space-x-4">
        {isLogin ? (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink
              className={({ isActive }) =>
                ` text-white ml-10  px-3 py-1 rounded-md ${
                  isActive ? "bg-white !text-[#172b4d]" : ""
                }`
              }
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                ` text-white ml-10  px-3 py-1 rounded-md ${
                  isActive ? "bg-white !text-[#172b4d]" : ""
                }`
              }
              to="/signup"
            >
              SignUp
            </NavLink>
          </>
        )}
      </div>
    </section>
  );
};

export default Header;
