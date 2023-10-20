import React, { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

// type AuthContextType = {
//   isLogged: boolean;
//   login: (status: boolean) => void;
// };

//const AuthContext = createContext<AuthContextType | null>(null);

const Error: React.FC = () => {
  return <div className="App-header">Error Page</div>;
};

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authContextData = useContext(AuthContext);

  console.log(
    "AuthContext:",
    AuthContext,
    "authContextData: ",
    authContextData
  );

  if (!authContextData) return <Error />;
  return authContextData.isLogged ? (
    <>{children}</>
  ) : (
    <Navigate to="/signup" replace />
  );
};

export default AuthRoute;
