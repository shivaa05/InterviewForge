import { ArrowRightIcon, Code2, Crown, Users } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProblemCard = ({ session }) => {
  const navigate = useNavigate();
  const { user, serverUrl } = useContext(UserDataContext);

  const joinSessionHandler = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/session/${session._id}/join`,
        {},
        { withCredentials: true },
      );

      navigate(`/session/${session._id}`);
      toast.success("Joined Session successfully! ");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };
  return (
    <div className="border rounded-lg p-2 flex justify-between items-center border-zinc-700">
      {/* left */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-linear-to-br from-green-600 via-green-400 to-teal-400">
          <Code2 className="text-zinc-800" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">{session.problem}</span>
            <span
              className={`${session.difficulty == "easy" && "bg-green-600"} ${session.difficulty == "medium" && "bg-yellow-600"} ${session.difficulty == "hard" && "bg-red-500"} px-2 py-0.5 rounded-full text-xs`}
            >
              {session.difficulty.slice(0, 1).toUpperCase() +
                session.difficulty.slice(1)}
            </span>
          </div>

          <div className="flex gap-3 items-center text-sm text-zinc-400">
            <span>
              <Crown className="size-4" />
            </span>
            <span>
              {session.host.name.slice(0, 1).toUpperCase() +
                session.host.name.slice(1)}
            </span>
            <span className="flex gap-1 items-center">
              <Users className="size-4" /> {!session.participant ? "1" : "2"}/2
            </span>
          </div>
        </div>
      </div>
      <div></div>

      {/* right */}
      {session?.participant?._id &&
      session?.participant?._id !== user._id &&
      session.host._id !== user._id ? (
        <div className="flex bg-gray-200 opacity-25 cursor-not-allowed text-black rounded-full px-4">
          Full
        </div>
      ) : (
        <div
          className="flex bg-green-500 text-black/95 rounded-full py-1 gap-1 items-center px-4 cursor-pointer"
          onClick={joinSessionHandler}
        >
          {session?.participant?._id === user._id ||
          session.host._id === user._id
            ? "Rejoin"
            : "Join"}
          <ArrowRightIcon className="size-4" />
        </div>
      )}
    </div>
  );
};

export default ProblemCard;
