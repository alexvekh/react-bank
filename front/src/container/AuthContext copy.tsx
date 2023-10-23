import React, { createContext, useContext } from "react";

//Створюємо контекст, в якому будемо тримати дані аутентифікації
//В контексті буде знаходитись: створений state через useReducer, який буде
//знаходитись властивість token та об'єкт user dispatch функція, яка
//буде мати наступні типи дій: увійти в акаунт, вийти з акаунту

type AuthContextType = {
  isLogged: boolean;
  token: string | null;
  login: (status: boolean, token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
