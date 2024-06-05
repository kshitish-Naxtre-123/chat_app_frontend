import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.png";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/chat/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true,
      });
      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(logout());
        navigate("/email");
      }
      console.log("currentuser details:", response);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div className=" grid grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className=" bg-white">
        <Sidebar />
      </section>
      <section>
        <Outlet />
      </section>
      {/* <div
        className={`justify-center items-center flex-col gap-2  lg:flex" `}
      >
        <div>
          <img src={logo} alt="logo" width={250} />
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
