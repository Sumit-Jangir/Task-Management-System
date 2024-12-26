import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../Redux/slice.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = localStorage.getItem("userId");

  const [isLogin, setIsLogin] = useState(!!token);
  const [navItems, setNavItems] = useState([]);
  const [selectCheck, setSelectCheck] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const handleCheckboxChange = (option) => {
    setSelectCheck((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const createAndUpdateNavlist = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_KEY}/setting/createAndUpdate`,
        {
          userId,
          navList: selectCheck,
        }
      );
      handleNavlist();
      setShowDropdown(false);
      navigate("/");
    } catch (error) {
      console.error("Error updating nav list:", error);
    }
  };

  const handleNavlist = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/setting/getNavList`,
        {
          userId,
        }
      );
      const fetchedNavList = response.data[0]?.navList || [];
      setNavItems(fetchedNavList);

      if (fetchedNavList.length && selectCheck.length === 0) {
        setSelectCheck(fetchedNavList);
      }
    } catch (error) {
      console.error("Error fetching nav list:", error);
    }
  };

  const handleLogout = () => {
    dispatch(clearToken());
    setIsLogin(false);
    navigate("/login");
  };

  useEffect(() => {
    setIsLogin(!!token);
  }, [token]);

  useEffect(() => {
    if (userId) {
      handleNavlist();
    }
  }, [userId]);

  const handleOpenNavList = (e) => {
    const rect = e.target.getBoundingClientRect();
    setMenuPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setShowDropdown((prev) => !prev);
  };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <section
        id="header"
        className="bg-[#0000003d] shadow-md py-2 px-6 flex justify-between items-center"
      >
        <div>
          <Link className="text-2xl text-white font-bold">Welcome User</Link>
          <NavLink
            className={({ isActive }) =>
              ` text-white ml-10 px-3 py-1 rounded-md ${
                isActive ? "bg-white !text-[#172b4d]" : ""
              }`
            }
            to="/"
          >
            Board
          </NavLink>
          {navItems.includes("Table") && (
            <NavLink
              className={({ isActive }) =>
                ` text-white ml-2 px-3 py-1 rounded-md ${
                  isActive ? "bg-white !text-gray-900" : ""
                }`
              }
              to="/table"
            >
              Table
            </NavLink>
          )}
          {navItems.includes("Calendar") && (
            <NavLink
              className={({ isActive }) =>
                ` text-white ml-2 px-3 py-1 rounded-md ${
                  isActive ? "bg-white !text-gray-900" : ""
                }`
              }
              to="/calendar"
            >
              Calendar
            </NavLink>
          )}
          {navItems.includes("Dashboard") && (
            <NavLink
              className={({ isActive }) =>
                ` text-white ml-2 px-3 py-1 rounded-md ${
                  isActive ? "bg-white !text-gray-900" : ""
                }`
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          )}
          <button
            onClick={handleOpenNavList}
            className={`text-white text-lg px-2  pb-[3px] mx-1 rounded-md ${
              showDropdown ? "bg-white !text-gray-900" : ""
            }`}
          >
            <FontAwesomeIcon icon={faSquareCaretDown} />
          </button>
        </div>

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
                  ` text-white ml-10 px-3 py-1 rounded-md ${
                    isActive ? "bg-white !text-[#172b4d]" : ""
                  }`
                }
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  ` text-white ml-10 px-3 py-1 rounded-md ${
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

      {showDropdown && (
        <div
          className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-5"
          onClick={()=>setShowDropdown(false)}
        >
          <div
            className="relative z-50 text-slate-300 min-w-52 bg-gray-800 rounded-lg shadow-lg p-3"
            style={{
              position: "absolute",
              top: `${40+menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <label>
                  <input type="checkbox" checked disabled />
                  <span>Board</span>
                </label>
              </li>
              <li className="flex items-center space-x-2">
                <label>
                  <input
                    type="checkbox"
                    className="form-checkbox text-purple-500"
                    onChange={() => handleCheckboxChange("Table")}
                    checked={selectCheck.includes("Table")}
                  />
                  <span>Table</span>
                </label>
              </li>
              <li className="flex items-center space-x-2">
                <label>
                  <input
                    type="checkbox"
                    className="form-checkbox text-purple-500"
                    onChange={() => handleCheckboxChange("Calendar")}
                    checked={selectCheck.includes("Calendar")}
                  />
                  <span>Calendar</span>
                </label>
              </li>
              <li className="flex items-center space-x-2">
                <label>
                  <input
                    type="checkbox"
                    className="form-checkbox text-purple-500"
                    onChange={() => handleCheckboxChange("Dashboard")}
                    checked={selectCheck.includes("Dashboard")}
                  />
                  <span>Dashboard</span>
                </label>
              </li>
            </ul>
            <button
              className="px-4 py-1 mt-3 bg-gray-700 hover:bg-gray-600 rounded-md"
              onClick={createAndUpdateNavlist}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
