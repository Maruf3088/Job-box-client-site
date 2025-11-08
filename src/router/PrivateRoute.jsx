import React, { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full h-[63vh] flex justify-center items-center p-10">
        <span className="loading loading-xl loading-dots"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/logIn" state={location?.pathname}></Navigate>;
};

export default PrivateRoute;
