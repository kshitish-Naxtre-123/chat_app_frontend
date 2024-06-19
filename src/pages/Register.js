import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helper/uploadFile";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  //usestate
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [uploadPhoto, setUploadPhoto] = useState("");

  //function section
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    setUploadPhoto(file);
    setFormData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  const url=process.env.REACT_APP_BACKEND_URL
  console.log("url",url);

  const handleClearUploadPhoto = (e) => {
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/chat/register`;
    console.log("bakcendUrl", URL);
    try {
      const response = await axios.post(URL, formData);
      console.log("reposne data<>>>>>>>>>", response);

      toast.success(response.data.message);

      if (response.data.success) {
        setFormData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });
        setUploadPhoto("")

        navigate("/email");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className=" mt-5">
      <div className=" bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome to chat app!</h3>
        <form className=" grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className=" flex flex-col gap-1">
            <label>Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder=" enter your name"
              className=" bg-slate-200 px-2 py-1 focus:outline-primary rounded-sm"
              value={formData.name}
              onChange={handleOnchange}
              required
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label>Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" enter your email"
              className=" bg-slate-200 px-2 py-1 focus:outline-primary rounded-sm"
              value={formData.email}
              onChange={handleOnchange}
              required
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label>Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" enter your password"
              className=" bg-slate-200 px-2 py-1 focus:outline-primary rounded-sm"
              value={formData.password}
              onChange={handleOnchange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo :
              <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto?.name
                    ? uploadPhoto?.name
                    : "Upload profile photo"}
                </p>
                {uploadPhoto?.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleClearUploadPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>

            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleUploadPhoto}
            />
          </div>

          <button className=" bg-primary text-lg px-4 py-1 hover:bg-secondary mt-2 font-bold text-white leading-relaxed tracking-wide" type="submit">
            Register
          </button>
        </form>
        <p className=" my-3 text-center">
          Already have an account ?
          <Link to="/email" className=" hover:text-primary font-semibold ml-2">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
