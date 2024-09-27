import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const ProtectedRoute = ({ role, children }) => {
  const { user } = useUser();

  // Redirect to home if the user is not logged in
  // or does not have the required role
  if (!user || user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
