import React from "react";
import Navbar from "../components/Navbar";
import ProblemCardProblemPage from "../components/ProblemCardProblemPage";
import { PROBLEMS } from "../data/problems.js";
const Problem = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="mt-8 px-15">
        <h1 className="text-5xl font-bold">Practice Problems</h1>
        <p className="mt-2 text-zinc-300 font-semibold">
          Sharpen your skills by practicing these problems
        </p>
      </div>

      <div className="flex flex-col gap-5 px-15 mt-5">
        {Object.entries(PROBLEMS).map((problem, ind) => (
          <ProblemCardProblemPage problem={problem[1]} key={ind} />
        ))}
      </div>
    </div>
  );
};

export default Problem;
