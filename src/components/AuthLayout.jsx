import React, { useEffect, useState } from "react";
import { App, Spinner } from "./Index";
import { useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
      setLoading(false);
    } else {
      navigate("/");
      setLoading(false);
    }
  }, [navigate, setLoading]);

  return loading ? <Spinner /> : <App />;
};

export default AuthLayout;
