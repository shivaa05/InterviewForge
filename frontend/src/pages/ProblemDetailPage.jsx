import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Group, Separator, Panel } from "react-resizable-panels";
import { LANGUAGE_CONFIG, PROBLEMS } from "../data/problems";
import { LoaderCircle } from "lucide-react";
import Editor from "@monaco-editor/react";
import { execute } from "../lib/piston";
import toast from "react-hot-toast";
const ProblemDetailPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(PROBLEMS[id] || null);
  const [language, setLanguage] = useState("javascript");
  const [starterCode, setStarterCode] = useState(
    PROBLEMS[id]?.starterCode?.[language] || null,
  );
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();

  console.log(problem.title);
  const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ","),
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);

    return normalizedActual == normalizedExpected;
  };

  const runCodeHandler = async () => {
    setIsRunning(true);
    const res = await execute(language, starterCode);
    console.log(res);
    if (res.success) {
      const currOutput = res.output;
      const expectedOutput = problem.expectedOutput[language];
      setOutput(currOutput);
      setError(null);
      if (checkIfTestsPassed(currOutput, expectedOutput)) {
        toast.success("All test case passed");
      } else {
        toast.error("OOPS! PleaseCheck you code ");
      }
    } else {
      setError(res.error);
      setOutput(null);
    }
    setIsRunning(false);
  };

  useEffect(() => {
    const currentProblem = PROBLEMS[id];
    setProblem(currentProblem);
    setStarterCode(currentProblem?.starterCode?.[language] || "");
    setOutput(null);
    setError(null);
  }, [id, language]);

  useEffect(() => {
    console.log(output);
    console.log("error", error);
  }, [output, error]);

  const onChangeHandler = (value) => {
    setStarterCode(value);
  };

  return (
    <div className="w-full h-screen">
      <Group>
        <Panel
          defaultSize="50%"
          minSize="20%"
          className="p-4 overflow-y-scroll"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <div className="text-3xl font-bold">{problem.title}</div>
              <div className="text-zinc-300 font-semibold ">
                {problem.category}
              </div>
            </div>
            <div
              className={`px-3 rounded-full ${problem.difficulty == "Easy" && "bg-green-600"} ${problem.difficulty == "Medium" && "bg-yellow-500"} ${problem.difficulty == "Hard" && "bg-red-500"}`}
            >
              {problem.difficulty}
            </div>
          </div>

          <select
            className="w-full border outline-none py-1 px-3 mt-4 rounded-lg bg-zinc-800"
            value={problem.title}
            onChange={(e) => navigate(`/problems/${e.target.value}`)}
          >
            {Object.entries(PROBLEMS).map(
              ([key, value]) =>
                problem.title && (
                  <option key={key} value={value.title}>
                    {value.title} - {value.difficulty}
                  </option>
                ),
            )}
          </select>

          <div className="flex gap-2 flex-col mt-5 rounded-lg p-3 bg-black/30 text-sm">
            <h2 className="text-2xl font-bold">Description</h2>
            <p>{problem.description.text}</p>
            {problem.description.notes.map((p, ind) => (
              <p className="" key={ind}>
                {p}
              </p>
            ))}
          </div>

          <div className="flex gap-2 flex-col mt-5 rounded-lg p-3 bg-black/30 text-sm">
            <h2 className="text-2xl font-bold">Examples</h2>
            {problem.examples.map((ex, ind) => (
              <div key={ind}>
                <div className="text-lg font-semibold">Example {ind + 1}</div>
                <div className="m-2 p-2 rounded-lg bg-black/30">
                  <div>
                    <span className="font-bold">Input: </span>{" "}
                    <span>{ex.input}</span>
                  </div>
                  <div>
                    <span className="font-">Output: </span>{" "}
                    <span>{ex.output}</span>
                  </div>

                  <div className="mt-2">{ex.explanation}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 flex-col mt-5 rounded-lg p-3 bg-black/30 text-sm">
            <h2 className="text-2xl font-bold">Constraints</h2>
            <div className="flex flex-col px-4 gap-1">
              {problem.constraints.map((constraint, ind) => (
                <p key={ind}>{constraint}</p>
              ))}
            </div>
          </div>
        </Panel>
        <Separator className="w-1 outline-none bg-black/70" />

        <Panel defaultSize="50%" minSize="40%">
          <Group orientation="vertical">
            <Panel defaultSize="50%" minSize="20">
              <div className="flex items-center justify-between px-2 h-12">
                <div className="flex gap-3 items-center">
                  <div className="size-8">
                    <img
                      src={LANGUAGE_CONFIG[language].icon}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <select
                    className="w-36 border outline-none py-1 px-3 mt-4 rounded-lg bg-zinc-800 my-4"
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {Object.entries(LANGUAGE_CONFIG).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <button
                    className="w-24 py-1 text-sm cursor-pointer bg-green-600 rounded-lg flex items-center gap-2 justify-center"
                    onClick={runCodeHandler}
                  >
                    {isRunning ? (
                      <>
                        <LoaderCircle className="size-4 animate-spin" />{" "}
                        Loading..
                      </>
                    ) : (
                      "Run Code"
                    )}
                  </button>
                </div>
              </div>

              <Editor
                height="90vh"
                language={language}
                theme="vs-dark"
                value={starterCode}
                onChange={onChangeHandler}
              />
            </Panel>

            <Separator className="h-1 outline-none bg-black/70" />

            <Panel defaultSize="50%" minSize="10" className="overflow-y-auto">
              <div className="bg-neutral-900 py-2 px-3 text-lg font-semibold">
                Output
              </div>
              <div className="p-4">
                {!error && (
                  <div>
                    <div className="font-semibold">Expected Output</div>
                    <pre className="p-2 bg-black/20 rounded-lg mt-3">
                      {problem.expectedOutput[language]}
                    </pre>
                  </div>
                )}
                {error && <pre className="text-red-500">{error}</pre>}
                {output && (
                  <>
                    <div className="mt-3 font-semibold">Output</div>
                    <pre className="p-2 bg-black/20 rounded-lg mt-3">
                      {output}
                    </pre>
                  </>
                )}
              </div>
            </Panel>
          </Group>
        </Panel>
      </Group>
    </div>
  );
};

export default ProblemDetailPage;
