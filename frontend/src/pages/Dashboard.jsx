import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import LiveSessions from "../components/LiveSessions";
import PastSessions from "../components/PastSessions";
import { UserDataContext } from "../context/userContext";
import { PROBLEMS } from "../data/problems";
import { Code2, Plus } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { serverUrl } = useContext(UserDataContext);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [createSession, setCreateSession] = useState(false);
  const [creating, setCreating] = useState(false);

  const createSessionHandler = async () => {
    setCreating(true);
    try {
      if (!selectedProblem) return;
      const difficulty = selectedProblem?.difficulty?.toLowerCase();
      const problem = selectedProblem.id;
      if (!difficulty || !problem) return;
      const res = await axios.post(
        `${serverUrl}/session/create`,
        { difficulty, problem },
        { withCredentials: true },
      );
      console.log(res);
      toast.success("Session created!")
      setCreateSession(false)
    } catch (error) {
      console.log("Error in creating session");
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setCreating(false);
    }
  };
  useEffect(() => {
    console.log(selectedProblem);
  }, [selectedProblem]);
  return (
    <div className="w-full pb-10">
      <Navbar />
      <Welcome setCreateSession={setCreateSession} />
      <LiveSessions />
      <PastSessions />

      {createSession && (
        <div
          className="h-full absolute top-0 left-0 w-full bg-black/20 backdrop-blur-[1px]"
          onClick={() => setCreateSession(false)}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-black/50 p-4 w-110 bg-neutral-950 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xl font-bold">Create New Session</div>
            <div className="font-semibold text-zinc-400 relative mt-3 mb-2">
              Select Problem
              <span className="absolute top-0 px-1 text-red-500 font-semibold text-lg">
                *
              </span>
            </div>
            <select
              className="border w-full py-1 px-2 rounded-lg cursor-pointer bg-neutral-950 outline-none"
              onChange={(e) => setSelectedProblem(JSON.parse(e.target.value))}
            >
              <option>Select a problem</option>
              {Object.entries(PROBLEMS).map((problem, ind) => (
                <option value={JSON.stringify(problem[1])}>
                  {problem[1].title} - {problem[1].difficulty}
                </option>
              ))}
            </select>

            {selectedProblem && (
              <>
                <div className="font-semibold pt-3 text-lg">
                  Session Summary:
                </div>
                <div className="flex gap-2 items-center mt-2 p-2 bg-green-500/40 rounded-2xl">
                  <div>
                    <Code2 className="size-6" />
                  </div>

                  <div>
                    <div className="font-sm">
                      Problem: {selectedProblem.title}
                    </div>
                    <div className="line-clamp-2 text-sm">
                      {selectedProblem.description.text}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-5 items-center mt-4 justify-end">
              <span
                className="cursor-pointer"
                onClick={() => setCreateSession(false)}
              >
                Cancel
              </span>
              <span
                className="flex gap-1 items-center bg-green-500/70 w-fit px-3 cursor-pointer py-0.5 rounded-full"
                onClick={createSessionHandler}
              >
                <Plus className="size-4 font-semibold" /> Create{" "}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
