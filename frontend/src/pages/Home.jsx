import {
  ArrowRightIcon,
  Check,
  MessagesSquare,
  Video,
  Zap,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";
import { useState } from "react";

const Home = () => {
  const [authPopUp, setAuthPopUp] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-full relative">
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
            <span className="text-zinc-300 font-semibold -mt-1">
              Live Coding
            </span>
          </div>
        </div>

        <div className="group flex items-center justify-center gap-2 bg-linear-to-r from-green-500 via-green-400 to-teal-500 px-5 py-2 rounded-xl cursor-pointer hover:scale-105 transition-all duration-200 ease-linear">
          <div className="font-semibold" onClick={() => setAuthPopUp(true)}>
            Get Started
          </div>
          <ArrowRightIcon className="size-5 group-hover:translate-x-0.5" />
        </div>
      </nav>

      <div className="flex px-30 pt-15">
        {/* left */}
        <div className="flex-1 pt-6">
          <div className="w-50 px-2 bg-linear-to-r from-green-600 via-green-500 to-teal-400 text-sm rounded-full flex items-center justify-center gap-1 text-black">
            <Zap className="size-4 font-thin" />
            <span>Real Time Collaboration</span>
          </div>

          <h2 className="text-5xl font-bold mt-5 flex flex-col gap-2">
            <span className="bg-linear-to-r from-green-600 via-green-400 to-teal-500 w-fit bg-clip-text text-transparent">
              Where Coders{" "}
            </span>
            <span className="text-zinc-300">Learn Together</span>
          </h2>

          <div className="mt-5 w-[90%] text-zinc-300 ">
            Code together in real time with video calls, practice technical
            interviews, and learn collaboratively by solving problems and
            sharing ideas with fellow developers.
          </div>

          <div className="flex gap-5 mt-6">
            <div className="flex gap-2 text-sm px-4 rounded-full border items-center ">
              <Check className="size-3 text-green-500 " />
              Live Video Chat
            </div>
            <div className="flex gap-2 text-sm px-4 rounded-full border items-center ">
              <Check className="size-3 text-green-500 " />
              Code Editor
            </div>
            <div className="flex gap-2 text-sm px-4 rounded-full border items-center ">
              <Check className="size-3 text-green-500 " />
              Multi Language
            </div>
          </div>

          <div className="mt-7 flex gap-5 items-center">
            <button
              className="bg-green-500 flex items-center gap-2 border text-zinc-900 py-3 cursor-pointer px-5 rounded-full text-lg font-semibold shadow-xl"
              onClick={() => setAuthPopUp(true)}
            >
              Start Coding Now <ArrowRightIcon className="size-5" />
            </button>
            <button className="bg-z flex items-center gap-2 border text-zinc-300 py-3 cursor-pointer px-5 rounded-full text-lg font-semibold shadow-xl">
              <Video className="size-5" /> Watch Demo
            </button>
          </div>

          <div className="bg-black/40 w-fit mt-9 rounded-lg shadow-lg shadow-black/40">
            <div className="h-22 grid grid-cols-3 bg-linear-to-r from-green-600 via-green-400 to-teal-500 bg-clip-text">
              <div className="border-r border-white/25 border-dashed w-28 flex flex-col justify-center items-center">
                <div className="text-3xl font-bold text-transparent">10K+</div>
                <div className="text-sm font-semibold text-zinc-300">
                  Active Users
                </div>
              </div>
              <div className="border-r border-white/25 border-dashed w-28 flex flex-col justify-center items-center">
                <div className="text-3xl font-bold text-transparent">50K+</div>
                <div className="text-sm font-semibold text-zinc-300">
                  Sessions
                </div>
              </div>
              <div className="w-28 flex flex-col justify-center items-center">
                <div className="text-3xl font-bold text-transparent">99%</div>
                <div className="text-sm font-semibold text-zinc-300">
                  Uptime
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="w-130 rounded-xl shadow-lg shadow-black/50">
          <img src="./Hero.png" alt="" className="object-cover" />
        </div>
      </div>

      {authPopUp && <Auth setAuthPopUp={setAuthPopUp}/>}
    </div>
  );
};

export default Home;
