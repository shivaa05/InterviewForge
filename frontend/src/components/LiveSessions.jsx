import React, { useContext, useEffect } from "react";
import ProblemCard from "./ProblemCard";
import { Dot, Radio, Trophy, Users, Zap } from "lucide-react";
import { UserDataContext } from "../context/userContext";

const LiveSessions = () => {
  const { serverUrl, allSessions } = useContext(UserDataContext);
  useEffect(() => {
    console.log(allSessions);
  }, [allSessions]);
  return (
    <div className="flex gap-4 px-15 mt-15">
      <div className="flex flex-col gap-4  w-100">
        <div className="h-36 border border-green-700 rounded-xl bg-black/20 p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="bg-green-700/20 text-green-500 p-2 rounded-lg">
              <Users className="size-5" />
            </span>
            <div className="bg-green-500 px-3 py-1 flex rounded-full items-center gap-1 text-black text-sm">
              <Radio className="size-3" /> Live
            </div>
          </div>

          <div className="text-2xl font-bold">10</div>

          <div className="font-semibold text-zinc-300">Active Users</div>
        </div>

        <div className="h-36 border border-green-700 rounded-xl bg-black/20 p-4 flex flex-col gap-3">
          <span className="bg-green-700/20 text-green-500 p-2 rounded-lg w-fit">
            <Trophy className="size-5" />
          </span>

          <div className="text-2xl font-bold">{allSessions?.length}</div>

          <div className="font-semibold text-zinc-300">Sessions</div>
        </div>
      </div>

      <div className="flex-1 border border-green-700 rounded-xl bg-black/20 p-4 h-76">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-green-700/30 text-green-500 rounded-lg">
              <Zap className="size-5" />
            </span>
            <span className="text-xl font-semibold ">Live Sessions</span>
          </div>

          <div className="px-1 pe-3 items-center flex text-sm font-semibold text-green-500 rounded-full">
            <Dot />
            Active
          </div>
        </div>

        <div className="mt-5 px-2 overflow-y-scroll h-56 py-3 flex flex-col gap-3">
          {allSessions ? (
            allSessions.map((session) => (
              <ProblemCard session={session} key={session._id} />
            ))
          ) : (
            <div> </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveSessions;
