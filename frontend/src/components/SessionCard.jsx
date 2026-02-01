import { Clock, Code2, Users } from "lucide-react";
import React from "react";

const SessionCard = () => {
  return (
    <div className="border p-3 flex flex-col gap-3 rounded-lg bg-black/20">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-linear-to-br from-green-600 via-green-400 to-teal-400">
          <Code2 className="text-zinc-800" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Two Sum</span>
          <span className="bg-green-600 px-2 py-0.5 rounded-full text-xs w-fit">
            Easy
          </span>
        </div>
      </div>

      <div className="text-xs text-zinc-200 flex items-center gap-1">
        <Clock className="size-3" />
        <span>about 3 hours ago</span>
      </div>

      <div className="text-xs text-zinc-200 flex items-center gap-1">
        <Users className="size-3"/>
        <span>2 participants</span>
      </div>

      <div className="flex justify-between text-xs">
        <div>Completed</div>
        <div>24/01/2026</div>
      </div>
    </div>
  );
};

export default SessionCard;
