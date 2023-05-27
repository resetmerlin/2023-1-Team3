import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { authToken } from "../hooks/MemoizedRedux";
const RequireAuth = () => {
  const auth = useSelector(authToken);
  const location = useLocation();

  return (
    <>
      {auth ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
