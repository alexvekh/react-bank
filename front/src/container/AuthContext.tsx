import React, { createContext, useContext } from "react";

type AuthContextType = {
  isLogged: boolean;
  login: (status: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
