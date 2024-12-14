import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { clearToken } from "./Redux/slice";

const Header = () => {
  const navigate = useNavigate()

    const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);


  const [isLogin, setIsLogin] = useState(token);

  const handleLogout = () => {
    dispatch(clearToken());
    setIsLogin(token);
    navigate('/login')
  };

  useEffect(() => {
    setIsLogin(token);
    // console.log("jjjjjjj")
  });

  return (
    <>
      <section
        id="header"
        className="bg-gray-100 shadow-md py-4 px-6 flex justify-between items-center"
      >
        {/* Logo/Welcome Text */}
        <Link to={"/"} className="text-xl font-bold text-gray-800">
          Welcome User
        </Link>

        {/* Navigation */}
        <div className="space-x-4">
          {isLogin ? (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              onClick={handleLogout} // Logout button will call handleLogout
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                className="px-4 py-2 bg-teal-600 text-white rounded"
                to={"/login/"}
              >
                Login
              </Link>
              <Link
                className="px-4 py-2 bg-teal-600 text-white rounded"
                to={"/signup/"}
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Header;
