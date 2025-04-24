import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // *** CHANGE HERE: Use sessionStorage to match Login.tsx ***
  const token = sessionStorage.getItem('authToken'); // Check sessionStorage
  // console.log('ProtectedRoute Check: Token exists?', !!token); // Optional: for debugging

  // Redirect to login ('/') if no token found. Added 'replace' for better history management.
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;