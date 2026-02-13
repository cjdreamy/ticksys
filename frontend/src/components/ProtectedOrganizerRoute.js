import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedOrganizerRoute = ({ children }) => {
  const { isOrganizerLoggedIn, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return isOrganizerLoggedIn ? children : <Navigate to="/organizer/login" />;
};

export default ProtectedOrganizerRoute;
