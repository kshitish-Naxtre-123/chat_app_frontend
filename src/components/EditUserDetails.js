import React, { useState, useEffect, useRef } from "react";
import Divider from "./Divider";
import Avatar from "./Avatar";
import uploadFile from "../helper/uploadFile";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const EditUserDetails = ({ onClose, user }) => {
  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: user?.user,
    profile_pic: user?.profile_pic,
  });

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        ...user,
      };
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    uploadPhotoRef.current.click();
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/chat/update-user/${token}`;
      // let axiosConfig = {
      //   headers: {
      //       'Content-Type': 'application/json;charset=UTF-8',
      //       "Access-Control-Allow-Origin": "*",
      //   }
      // };   
      const response = await axios({
        method: "put",
        url: URL,
        data: data,
        withCredentials: true,
        
      });
      console.log("response", response);
      toast.success(response?.data?.message);
      if (response?.data?.success) {
        dispatch(setUser(response?.data?.data));
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error();
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white p-4 py-6 m-1 rounded-md w-full max-w-sm">
        <h2 className=" font-semibold"> Profile Details</h2>
        <p className=" text-sm">Edit user Details</p>

        <form className=" grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div>
            <label> Name:</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              className=" w-full bg-slate-200 py-1 px-2  focus:outline-primary border-sm"
            />
          </div>
          <div>
            <label>Photo:</label>
            <div className=" my-1 flex items-center gap-4">
              <Avatar
                width={40}
                height={40}
                imageUrl={data?.profile_pic}
                name={data?.name}
              />
              <button
                className=" font-semibold"
                onClick={handleOpenUploadPhoto}
              >
                Change Photo
              </button>
              <input
                type="file"
                className=" hidden"
                onChange={handleUploadPhoto}
                ref={uploadPhotoRef}
              />
            </div>
          </div>
          <Divider />
          <div className=" flex gap-2 w-fit ml-auto">
            <button
              onClick={handleCancel}
              className=" border-danger bg-danger text-white border px-4 py-1 rounded-md hover:bg-dangerHover font-semibold "
            >
              Cancel
            </button>
            <button
            type="submit"
              className="border-success bg-success text-white border px-4 py-1 rounded-md font-semibold"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
