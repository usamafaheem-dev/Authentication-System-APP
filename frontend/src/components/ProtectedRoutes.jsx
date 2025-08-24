import { UserContext } from "@/Context/ContextApi";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user } = useContext(UserContext);
 
  return <div>{user ? children : <Navigate to="/signin" />}</div>;
};

export default ProtectedRoutes;
