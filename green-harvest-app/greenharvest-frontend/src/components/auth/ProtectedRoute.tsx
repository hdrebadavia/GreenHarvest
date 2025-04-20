import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('authToken'); // Check if the token exists
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;