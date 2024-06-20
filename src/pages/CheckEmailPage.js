import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { PiUserCircle } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

const CheckEmailPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/chat/check-email`;
    try {
      const response = await axios.post(URL, data);
      console.log("reposne", response);
      toast.success(response?.data?.message);
      if (response?.data?.success) {
        setData({
          email: "",
        });
        navigate("/password", {
          state: response?.data?.data,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className=" mt-5">
      <div className=" bg-white w-full max-w-md rounded-md overflow-hidden p-4 mx-auto">
        <div className=" w-fit mx-auto mb-2">
          <PiUserCircle size={80} />
        </div>
        <h3>Welcome to Chat app!</h3>
        <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>
          <div className=" flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="text"
              name="email"
              placeholder="enter your email"
              className="bg-slate-200 px-2 py-1 focus:outline-primary rounded-sm "
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <button className=" bg-primary text-lg px-4  py-1 hover:bg-secondary rounded-md mt-2 font-bold text-white leading-relaxed tracking-wide" type="submit">
            Let's go
          </button>
        </form>
        <p className="my-3 text-center">
          New User ?{" "}
          <Link to={"/register"} className="hover:text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
