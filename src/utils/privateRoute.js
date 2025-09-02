import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth } from "app/authSlice";

const PrivateRoute = ({
  redirectPath = "/login",
  children,
  tokenRequired = false,
}) => {
  const auth = useSelector(getAuth);

  if (!auth.isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  if (auth.user.role !== "Admin" && tokenRequired && !auth.user.accessToken) {
    return <Navigate to={redirectPath} replace />;
  }

  if (
    auth.user.role !== "Admin" &&
    tokenRequired &&
    auth.user.accessToken &&
    auth.user.accountStatus === "Pending"
  ) {
    return <Navigate to="/token-input" replace />;
  }

  return children;
};

export default PrivateRoute;
