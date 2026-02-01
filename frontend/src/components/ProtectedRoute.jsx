import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserDataContext } from "../context/userContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserDataContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
