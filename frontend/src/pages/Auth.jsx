import { LoaderCircle, LogIn, X } from "lucide-react";
import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/userContext";
import toast from "react-hot-toast";

const Auth = ({ setAuthPopUp }) => {
  const { auth, setAuth, user, setUser, serverUrl } =
    useContext(UserDataContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(auth);
    if (auth === "signup" && name === "") return;
    if (email === "" || password === "") return;
    console.log(email, password);
    const payload =
      auth === "signup" ? { name, email, password } : { email, password };

    try {
      setIsAuthenticating(true);
      const res = await axios.post(`${serverUrl}/auth/${auth}`, payload, {
        withCredentials: true,
      });
      console.log(res);
      toast.success(res.data.message);
      setUser(res.data.user);
    } catch (error) {
      console.log("Error in auth", error);
      const message = error.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setIsAuthenticating(false);
    }
  };
  return (
    <div
      className="w-full h-full absolute top-0 left-0 backdrop-blur-sm"
      onClick={() => setAuthPopUp(false)}
    >
      <div
        className="p-4 rounded-lg border-green-700 w-96 border  absolute top-1/2 left-1/2 -translate-1/2 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-transparent text-2xl bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 rounded-lg bg-clip-text font-bold">
          {auth.slice(0, 1).toUpperCase() + auth.slice(1)}
        </div>
        <p className="text mt-2 text-zinc-300 ">
          {auth.slice(0, 1).toUpperCase() + auth.slice(1)} to start preparing
          interview
        </p>

        <form className="mt-5 flex flex-col gap-4" onSubmit={authHandler}>
          {auth === "signup" && (
            <div className="flex gap-2 flex-col">
              <label className="text-green-400 font-semibold">Name:</label>
              <input
                type="text"
                placeholder="Name"
                className="outline-none border border-green-700 py-1 px-3 bg-black/40 rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="flex gap-2 flex-col">
            <label className="text-green-400 font-semibold">Email:</label>
            <input
              type="text"
              placeholder="example@gmail.com"
              className="outline-none border border-green-700 py-1 px-3 bg-black/40 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-col">
            <label className="text-green-400 font-semibold">Password:</label>
            <input
              type="password"
              placeholder="Password"
              className="outline-none border border-green-700 py-1 px-3 bg-black/40 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 py-1 cursor-pointer rounded-lg font-semibold text-lg">
            {isAuthenticating ? (
              <div className="flex items-center justify-center gap-2">
                <LoaderCircle className="size-7 animate-spin"/>
              </div>
            ): (
                auth === "signin" ? "Sign in" : "Sign up"
            )}
          </button>

          {auth === "signup" ? (
            <p className="text-zinc-300 text-center text-sm">
              Already have an account?{" "}
              <span
                className="text-green-500 cursor-pointer "
                onClick={() => setAuth("signin")}
              >
                Sign in
              </span>
            </p>
          ) : (
            <p className="text-zinc-300 text-center text-sm">
              Don't have an account?{" "}
              <span
                className="text-green-500 cursor-pointer "
                onClick={() => setAuth("signup")}
              >
                Sign up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
