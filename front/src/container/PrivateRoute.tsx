import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ ...props }) => {
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.state) {
    // Якщо контекст або стан відсутні, перенаправте на сторінку входу
    return <Navigate to="/login" />;
  }

  return authContext.state.isLogged ? (
    <Route {...props} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
