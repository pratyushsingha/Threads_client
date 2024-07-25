import React, { useEffect, useState } from "react";
import { App, Spinner } from "./Index";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    const isAuthenticated = !!token;

    if (isAuthenticated && location.pathname === "/login") {
      navigate("/");
    } else if (!isAuthenticated && location.pathname !== "/login") {
      navigate("/login");
    }

    setLoading(false);
  }, [token, navigate, location.pathname]);

  loading && <Spinner />;

  return <App />;
};

export default AuthLayout;
