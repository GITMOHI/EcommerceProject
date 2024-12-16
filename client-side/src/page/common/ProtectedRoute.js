// ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectLoggedInUser } from '../../features/Auth/authSlice';

const ProtectedRoute = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const location = useLocation();

  if (!loggedInUser?.id) {
    toast.warn("Please log in first", {
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
