import { useEffect, useState } from "react";
import "./App.css";
import SignUp from "./auth/SignUp.jsx";
import Header from "./Components/Header/Header.jsx";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./auth/Login.jsx";
import AddList from "./Components/Board/AddList.jsx";
import Table from "./Components/Table/Table.jsx";
import CalendarComponent from "./Components/Calendear/Calendar.jsx";
import Navbar from "./Components/Header/Navbar.jsx";
import axios from "axios";
import Map from "./Components/map/Map.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import Sidebar from "./Components/Header/Sidebar.jsx";

function App() {
  const [isUrl, setIsUrl] = useState("");

  const useAuth = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  };

  const isAuth = useAuth();

  const getBgUrl = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/setting/getUrl`,
        { userId }
      );
      console.log("API Response:", response);
      setIsUrl(response.data.bgUrl || "11");
    } catch (error) {
      console.error("Error in getBgUrl:", error);
    }
  };

  useEffect(() => {
    if (isAuth) {
      getBgUrl();
    }
  }, [isAuth]);

  return (
    <BrowserRouter>
      {isAuth && (
        <>
          <Navbar getBgUrl={getBgUrl} setIsUrl={setIsUrl} />
          <Header setIsUrl={setIsUrl} />
        </>
      )}
      
      <div
        className={isAuth ? "h-[92.6vh] relative pt-11" : "h-screen"}
        style={
          isAuth
            ? {
                backgroundImage: `url(${isUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : { backgroundColor: "#1D2125" }
        }
      >
        <Routes>
          <Route path="/login" element={<Login getBgUrl={getBgUrl} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<AddList />} />
            <Route path="/table" element={<Table />} />
            <Route path="/calendar" element={<CalendarComponent />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<Map />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;