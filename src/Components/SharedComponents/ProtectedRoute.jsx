import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../SharedComponents/UserContext'; // Make sure you have UserContext

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();  // Get user from context

  // If the user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;  // If authenticated, render the children (protected route content)
};

export default ProtectedRoute;
