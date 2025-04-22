// src/components/ProtectedRoute/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if the authentication token exists in localStorage
  const token = localStorage.getItem('authToken');

  // If token exists, allow access to the nested routes (render the Outlet)
  // If no token, redirect the user to the root page ('/')
  return token ? <Outlet /> : <Navigate to="/login" replace />;
  // 'replace' ensures the login page replaces the current entry in history,
  // so the user doesn't go back to the protected route by clicking the back button.
};

export default ProtectedRoute;