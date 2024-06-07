import React, { useState, useEffect } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FiArrowUpLeft } from "react-icons/fi";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import { logout } from "../redux/userSlice";
import EditUserDetails from "./EditUserDetails";
import Divider from "./Divider";
import SearchUser from "./SearchUser";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );

  const [editUserOpen, setEditUserOpen] = useState(false);
  const [openSearchUser, setOpenSearchUser] = useState(false);
  const [allUser, setAllUser] = useState([]);

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/email");
    localStorage.clear();
  };

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
        <div>
          <NavLink
            className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded `}
            title="chat"
          >
            <IoChatbubbleEllipses size={20} />
          </NavLink>
          <div
            title="add friend"
            onClick={() => setOpenSearchUser(true)}
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
          >
            <FaUserPlus size={20} />
          </div>
        </div>
        <div className=" flex flex-col items-center">
          <button
            className="mx-auto"
            title={user?.name}
            onClick={() => setEditUserOpen(true)}
          >
            <Avatar
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user?.profile_pic}
              userId={user?._id}
            />
          </button>
          <button
            title="logout"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
            onClick={handleLogOut}
          >
            <span className="-ml-2">
              <BiLogOut size={20} />
            </span>
          </button>
        </div>
      </div>

      <div className=" w-full">
        <div className=" h-16 flex items-center">
          <h2 className=" text-xl font-bold p-4 text-slate-800 mt-2 ">
            {" "}
            Message
          </h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>
        <div className=" h-[calc(100vh-65px)] overflow-x-hidden overflow-y-hidden scrollbar">
          {" "}
          {allUser.length === 0 && (
            <div className=" mt-12">
              <div className=" flex justify-center items-center my-4 text-slate-500">
                <FiArrowUpLeft size={50} />
              </div>
              <p className=" text-lg text-center text-slate-400">
                Explore users to start a conversation with .
              </p>
            </div>
          )}
        </div>
      </div>

      {/** edi user details */}
      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}

      {/** serach user */}
      {openSearchUser && (
        <SearchUser onClose={() => setOpenSearchUser(false)} />
      )}
    </div>
  );
};

export default Sidebar;
