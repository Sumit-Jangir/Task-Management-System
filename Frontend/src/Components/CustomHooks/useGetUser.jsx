import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetUser = () => {
const [userDetail, setUserDetail] = useState({});
    const userId = localStorage.getItem("userId");  
    const getUser = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_KEY}/auth/getUser`,
            {
              userId,
            }
          );
          setUserDetail(response.data);
          console.log("user", response.data);
          // getBgUrl();
        //   handleReferralFetch();
        } catch (error) {
          console.error("Error getuser:", error);
        }
      };
      useEffect(() => {
        getUser();
      }, [userId]);

  return {userDetail, getUser};
};

export default useGetUser;
