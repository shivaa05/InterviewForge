import {
  Activity,
  ArrowRightIcon,
  Code,
  Code2,
  Crown,
  Dot,
  MessagesSquare,
  Radio,
  Trophy,
  User,
  Users,
  Zap,
} from "lucide-react";

const Welcome = ({setCreateSession}) => {
  return (
    <div className="flex px-30 mt-10 items-center gap-5">
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <div className="size-10 flex items-center justify-center bg-linear-to-r from-green-500 via-green-400 to-teal-500 font-bold rounded-lg ">
            <MessagesSquare />
          </div>
          <div className="text-[40px] font-extrabold bg-linear-to-r from-green-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
            Welcome back, Shiva Verma!
          </div>
        </div>

        <div className="px-14 font-semibold text-zinc-400 -mt-1">
          Ready to level up your coding skills?
        </div>
      </div>

      <div className="bg-green-500 rounded-lg text-lg py-2 px-4 flex gap-2 items-center text-zinc-800 cursor-pointer" onClick={()=>setCreateSession(true)}>
        <Activity className="size-5" /> Create Session{" "}
        <ArrowRightIcon className="size-5" />
      </div>
    </div>
  );
};

export default Welcome;
