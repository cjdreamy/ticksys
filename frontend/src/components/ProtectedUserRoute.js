import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedUserRoute = ({ children }) => {
  const { isUserLoggedIn, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return isUserLoggedIn ? children : <Navigate to="/user/login" />;
};

export default ProtectedUserRoute;
