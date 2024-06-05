import React, { useState } from "react";
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

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);

  const [editUserOpen, setEditUserOpen] = useState(false);

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/email");
    localStorage.clear();
  };
  return (
    <div className=" w-full h-full grid-cols-[48px,1fr] bg-white ml-2">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
        <div>
          <NavLink
            className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded  "bg-slate-200"`}
            title="chat"
          >
            <IoChatbubbleEllipses size={20} />
          </NavLink>
          <div
            className=" w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded-md "
            title="add friend"
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

      {/** edi user details */}
      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}
    </div>
  );
};

export default Sidebar;
