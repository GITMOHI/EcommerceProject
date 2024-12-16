// ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { selectLoggedInUser } from "../../features/Auth/authSlice";

const ProtectAdmin = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  console.log("user=",loggedInUser);
  const location = useLocation();

  if (loggedInUser?.id && loggedInUser.role === "admin") return children;
  else {
    toast.warn("Please log in first", {
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return <Navigate to="/admin/login" state={{ from: location }} />;
  }
};

export default ProtectAdmin;
