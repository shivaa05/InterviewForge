import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/userContext";
import { LANGUAGE_CONFIG, PROBLEMS } from "../data/problems";
import { Group, Panel, Separator } from "react-resizable-panels";
import { Loader2Icon, LoaderCircle, LogOut, PhoneOffIcon } from "lucide-react";
import Editor from "@monaco-editor/react";
import { execute } from "../lib/piston";
import toast from "react-hot-toast";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

const Session = () => {
  const { id } = useParams();
  const { serverUrl, user } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [currSession, setCurrSession] = useState(null);
  const [currentProblem, setCurrentProblem] = useState(null);

  const [language, setLanguage] = useState("javascript");
  const [starterCode, setStarterCode] = useState("");
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const isHost = currSession?.host?._id === user?._id;
  const isParticipant = currSession?.participant?._id === user?._id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(currSession, currSession==null, isHost, isParticipant);

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
      const expectedOutput = currentProblem?.expectedOutput[language];
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

  const endSessionHandler = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/session/${currSession._id}/end`,
        {},
        { withCredentials: true },
      );
      toast.success("Session Ended successfully");
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };
  const onChangeHandler = (value) => {
    setStarterCode(value ?? "");
  };

  const fetchSessionById = async () => {
    const res = await axios.get(`${serverUrl}/session/${id}`, {
      withCredentials: true,
    });
    setCurrSession(res.data.session);
  };

  useEffect(() => {
    fetchSessionById();
  }, [id]);

  useEffect(() => {
    if (!currSession) return;
    setCurrentProblem(PROBLEMS[currSession.problem]);
  }, [currSession]);

  useEffect(() => {
    if (!currentProblem) return;
    setStarterCode(currentProblem.starterCode?.[language] || "");
    setOutput(null);
    setError(null);
  }, [currentProblem, language]);
  

  return (
    <div className="h-screen w-full">
      <Group className="h-screen">
        <Panel defaultSize={50} minSize={30}>
          <Group orientation="vertical">
            <Panel
              minSize={20}
              defaultSize={50}
              className="p-4 overflow-y-scroll"
            >
              <div className="flex items-start justify-between rounded-lg gap-5 border p-4 bg-black/20 border-black/30">
                <div className="flex flex-col gap-2">
                  <div className="text-3xl font-bold">
                    {currentProblem?.title}
                  </div>
                  <div>{currentProblem?.category}</div>
                  <div>
                    Host:{" "}
                    {currSession?.host?.name?.[0]?.toUpperCase() +
                      currSession?.host?.name?.slice(1)}
                  </div>
                </div>

                <div className="text-sm flex gap-3">
                  <div
                    className={`py-1 px-3 rounded-lg ${
                      currentProblem?.difficulty === "Easy"
                        ? "bg-green-500"
                        : currentProblem?.difficulty === "Medium"
                          ? "bg-yellow-600"
                          : "bg-red-500"
                    }`}
                  >
                    {currentProblem?.difficulty?.[0]?.toUpperCase() +
                      currentProblem?.difficulty?.slice(1)}
                  </div>

                  {currSession?.host?._id === user?._id && (
                    <div
                      className="flex items-center gap-1 py-1 px-3 rounded-lg bg-red-500 cursor-pointer"
                      onClick={endSessionHandler}
                    >
                      <LogOut className="size-4" /> End Session
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-5 rounded-lg p-4 bg-black/30 text-sm">
                <h2 className="text-2xl font-bold">Description</h2>
                <p>{currentProblem?.description?.text}</p>
                {currentProblem?.description?.notes?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-5 rounded-lg p-3 bg-black/30 text-sm">
                <h2 className="text-2xl font-bold">Examples</h2>
                {currentProblem?.examples?.map((ex, i) => (
                  <div key={i}>
                    <div className="text-lg font-semibold">Example {i + 1}</div>
                    <div className="m-2 p-2 rounded-lg bg-black/30">
                      <div>
                        <b>Input:</b> {ex.input}
                      </div>
                      <div>
                        <b>Output:</b> {ex.output}
                      </div>
                      <div className="mt-2">{ex.explanation}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-5 rounded-lg p-3 bg-black/30 text-sm">
                <h2 className="text-2xl font-bold">Constraints</h2>
                {currentProblem?.constraints?.map((c, i) => (
                  <p key={i}>{c}</p>
                ))}
              </div>
            </Panel>

            <Separator className="h-1 bg-black/50 outline-none" />

            <Panel minSize={40} defaultSize={50}>
              <Group orientation="vertical">
                <Panel defaultSize={70} minSize={30}>
                  <div className="flex items-center justify-between px-2 h-12">
                    <div className="flex items-center gap-3">
                      <img
                        src={LANGUAGE_CONFIG[language].icon}
                        className="h-8"
                      />
                      <select
                        className="bg-zinc-800 px-3 py-1 rounded-lg"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        {Object.entries(LANGUAGE_CONFIG).map(([k, v]) => (
                          <option key={k} value={k}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={runCodeHandler}
                      className="bg-green-600 px-4 py-1 rounded-lg flex items-center gap-2"
                    >
                      {isRunning ? (
                        <>
                          <LoaderCircle className="animate-spin size-4" />
                          Running
                        </>
                      ) : (
                        "Run Code"
                      )}
                    </button>
                  </div>

                  <Editor
                    height="90vh"
                    language={language}
                    theme="vs-dark"
                    value={starterCode}
                    onChange={onChangeHandler}
                  />
                </Panel>

                <Separator className="h-1 bg-black/50 outline-none" />

                <Panel
                  defaultSize={40}
                  minSize={30}
                  className="overflow-y-scroll"
                >
                  <div className="bg-neutral-900 py-2 px-3 font-semibold">
                    Output
                  </div>
                  <div className="p-4">
                    {!error && (
                      <>
                        <div className="font-semibold">Expected Output</div>
                        <pre className="bg-black/20 p-2 rounded mt-2">
                          {currentProblem?.expectedOutput?.[language]}
                        </pre>
                      </>
                    )}

                    {error && <pre className="text-red-500">{error}</pre>}

                    {output && (
                      <>
                        <div className="mt-3 font-semibold">Output</div>
                        <pre className="bg-black/20 p-2 rounded mt-2">
                          {output}
                        </pre>
                      </>
                    )}
                  </div>
                </Panel>
              </Group>
            </Panel>
          </Group>
        </Panel>

        <Separator className="w-1 bg-black/50 outline-none" />

        <Panel defaultSize={50} minSize={30}>
          <div className="h-full bg-base-200 p-4 overflow-auto">
            {isInitializingCall ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
                  <p className="text-lg">Connecting to video call...</p>
                </div>
              </div>
            ) : !streamClient || !call ? (
              <div className="h-full flex items-center justify-center">
                <div className="card bg-base-100 shadow-xl max-w-md">
                  <div className="card-body items-center text-center">
                    <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-4">
                      <PhoneOffIcon className="w-12 h-12 text-error" />
                    </div>
                    <h2 className="card-title text-2xl">Connection Failed</h2>
                    <p className="text-base-content/70">
                      Unable to connect to the video call
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full">
                <StreamVideo client={streamClient}>
                  <StreamCall call={call}>
                    <VideoCallUI chatClient={chatClient} channel={channel} />
                  </StreamCall>
                </StreamVideo>
              </div>
            )}
          </div>
        </Panel>
      </Group>
    </div>
  );
};

export default Session;
