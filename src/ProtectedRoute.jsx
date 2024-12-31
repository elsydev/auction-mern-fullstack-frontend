import React from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = () => {
    const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) return <h1>Loading...</h1>;
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
    <Outlet />
 </>
  );
};

export default ProtectedRoute;