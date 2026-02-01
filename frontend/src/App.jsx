import React, { useContext } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import Problem from "./pages/Problem";
import { UserDataContext } from "./context/userContext";
import axios from "axios";
import { useEffect } from "react";
import ProblemDetailPage from "./pages/ProblemDetailPage";
import toast, { Toaster } from "react-hot-toast";
import Session from "./pages/Session";

const App = () => {
  const { user } = useContext(UserDataContext);

  return (
    <div className="min-h-screen w-full bg-neutral-800 text-white">
      <Toaster
        position="top-center"
        duration="1500"
        toastOptions={{
          style: {
            background: "#18181b", // zinc-900
            color: "#fff",
            border: "1px solid #3f3f46",
            borderRadius: "12px",
            padding: "12px 16px",
          },
          
        }}
      />
      <Routes>
        <Route
          path="/"
          element={!user ? <Home /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/problems"
          element={user ? <Problem /> : <Navigate to="/" />}
        />
        <Route
          path="/problems/:id"
          element={user ? <ProblemDetailPage /> : <Navigate to="/" />}
        />
        <Route
          path="/session/:id"
          element={user ? <Session /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
