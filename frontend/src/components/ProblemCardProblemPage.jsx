import { ArrowRight, Code2, LucideArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProblemCardProblemPage = ({ problem }) => {
  const navigate = useNavigate()
  return (
    <div className="w-full border bg-black/10 border-black/15 p-4 rounded-lg cursor-pointer" onClick={()=>navigate(`${problem.id}`)}>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="p-3 bg-green-600/15 text-green-500 rounded-lg">
            <Code2 className="size-7" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{problem.title}</span>
              <span
                className={`text-sm px-3 rounded-full ${problem.difficulty == "Easy" && "bg-green-600"} ${problem.difficulty == "Medium" && "bg-yellow-500"} ${problem.difficulty == "Hard" && "bg-red-500"}`}
              >
                {problem.difficulty}
              </span>
            </div>
            <div className="text-sm text-zinc-300 font-semibold">
              {problem.category}
            </div>
          </div>
        </div>

        <div className="text-green-500 cursor-pointer">Solve</div>
      </div>
      <div className="text-sm mt-2 text-zinc-300">
        {problem.description.text}
      </div>
    </div>
  );
};

export default ProblemCardProblemPage;
