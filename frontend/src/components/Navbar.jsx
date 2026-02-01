import {
  BookOpen,
  LayoutDashboard,
  LogOutIcon,
  MessagesSquare,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const location = useLocation();
  const [page, setPage] = useState(location.pathname.slice(1));
  const { user, setUser, serverUrl } = useContext(UserDataContext);
  const [popup, setPopup] = useState(false);
  
  const logoutHandler = async () => {
    const res = await axios.get(`${serverUrl}/auth/signout`, {
      withCredentials: true,
    });
    if (res.data.success) {
      toast.success(res.data.message)
    }
    setUser(null);
  };
  const navigate = useNavigate();
  return (
    <nav className="px-15 flex justify-between items-center sticky top-0 bg-black/30 backdrop-blur-sm py-2 border-b border-green-600">
      <div
        className="flex gap-4 items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="size-11 flex items-center justify-center bg-linear-to-r from-green-500 via-green-400 to-teal-500 font-bold rounded-lg ">
          <MessagesSquare />
        </div>

        <div className="flex flex-col">
          <span className="bg-linear-to-r from-green-500 via-green-400 to-teal-500 bg-clip-text text-transparent font-bold text-xl">
            InterviewForge
          </span>
          <span className="text-zinc-300 font-semibold -mt-1">Live Coding</span>
        </div>
      </div>

      <div className="flex gap-6">
        <div
          className={`cursor-pointer py-2 px-3 flex items-center gap-2 rounded-lg ${page === "problems" && "bg-green-500 text-black"}`}
          onClick={() => navigate("/problems")}
        >
          <BookOpen className="size-4" />
          Problems
        </div>

        <div
          className={`cursor-pointer py-2 px-3 flex items-center gap-2 rounded-lg ${page === "dashboard" && "bg-green-500 text-black"}`}
          onClick={() => navigate("/dashboard")}
        >
          <LayoutDashboard className="size-4" />
          Dashboard
        </div>

        <div
          className="size-9 cursor-pointer rounded-full flex items-center justify-center text-lg font-semibold bg-green-900"
          onClick={() => setPopup(!popup)}
        >
          {user.name.slice(0, 1).toUpperCase()}
        </div>

        {popup && (
          <div className="absolute flex flex-col gap-2 bg-neutral-900 border-black rounded-lg top-15 right-20 py-2 px-4 font-semibold">
            <div>
              {user.name.slice(0, 1).toUpperCase() + user.name.slice(1)}
            </div>
            <div
              className="flex gap-2 items-center text-red-500 cursor-pointer"
              onClick={logoutHandler}
            >
              <LogOutIcon className="size-5" /> Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
