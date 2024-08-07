import React, { useEffect } from "react";
import { App, Spinner } from "./Index";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  useCheckAuthStatusQuery,
  useGetCurrentUserQuery,
} from "@/services/authAPI";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/features/authSlice";

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: authStatus,
    isLoading: authLoading,
    isError: authError,
  } = useCheckAuthStatusQuery();
  const {
    data: currentUser,
    isLoading: currentUserLoading,
    isError: currentUserError,
  } = useGetCurrentUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authLoading) {
      if (authStatus?.isAuthenticated && location.pathname === "/login") {
        navigate("/");
      } else if (
        !authStatus?.isAuthenticated &&
        location.pathname !== "/login"
      ) {
        navigate("/login");
      }
    }
  }, [authLoading, authStatus, location.pathname, navigate]);

  useEffect(() => {
    if (currentUser) {
      dispatch(setAuthState({ user: currentUser, token: authStatus?.token }));
    }
  }, [currentUser, dispatch, location.pathname, navigate, authStatus]);

  if (authLoading || currentUserLoading) return <Spinner />;
  if (authError || currentUserError) return <p>Something went wrong</p>;

  return authStatus?.isAuthenticated ? (
    <App />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AuthLayout;
