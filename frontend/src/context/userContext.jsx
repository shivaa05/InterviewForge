import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserDataContext = createContext(null);

const UserContext = ({ children }) => {
  const serverUrl = "http://localhost:3000/api";
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState("signin");
  const [allSessions, setAllSessions] = useState(null);

  const fetchUser = async () => {
    const res = await axios.get(`${serverUrl}/auth/current-user`, {
      withCredentials: true,
    });
    setUser(res.data.user);
  }

  const getActiveSessions = async () => {
    const res = await axios.get(`${serverUrl}/session/active`, {
      withCredentials: true,
    });
    console.log("res",res)
    setAllSessions(res.data.sessions);
  };
  
  useEffect(() => {
    fetchUser();
    getActiveSessions();
  }, []);
  const value = {
    serverUrl,
    user,
    setUser,
    auth,
    setAuth,
    allSessions,
    setAllSessions,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
