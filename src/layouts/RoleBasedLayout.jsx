import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import NotFound from '../components/common/NotFound';

const RoleBasedLayout = ({ roles }) => {
  const { user } = useSelector((state) => state.auth);

  // If user not loaded yet, show a loader or nothing
  // if (!user) return <Navigate to="/" replace />;
  if (!user) return <NotFound />;

  // If user role not allowed, redirect
  if (!roles.includes(user.role)) {
    return <Navigate to={`/${user?.role}-dashboard`} replace />;
  }

  // Otherwise, allow access
  return <Outlet />;
};

export default RoleBasedLayout;
