import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RoleBasedLayout = ({ roles }) => {
  const { user } = useSelector((state) => state.auth);
  console.log(user)

  // If user not loaded yet, show a loader or nothing
  if (!user) return <Navigate to="/login" replace />;

  // If user role not allowed, redirect
  if (!roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, allow access
  return <Outlet />;
};

export default RoleBasedLayout;
