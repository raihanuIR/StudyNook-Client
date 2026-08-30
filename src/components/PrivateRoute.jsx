import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader fullPage={true} />;
  }

  if (user) {
    return children;
  }

  // Redirect to login page, preserving the current location in state
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
