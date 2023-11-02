import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

//AuthRoute це компонент, який перевіряє, чи є в контексті аутентифікації токен,
//якщо так, то переводить на сторінку /balance
const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authContext = useContext(AuthContext);
  console.log("AuthRoute: authContext", authContext);

  // Перевіряємо, чи контекст ініціалізований
  if (!authContext) {
    // Якщо контекст не ініціалізований, виконуємо відповідну логіку
    return <Navigate to="/error" />;
  }

  // Якщо контекст ініціалізований, отримуємо state
  const { state } = authContext;
  console.log("AuthRoute: state", state);

  // Перевіряємо, чи є токен
  if (state.token && state.isLogged) {
    // Якщо немає токена, переадресовуємо на сторінку входу
    return <Navigate to="/balance" />;
  }

  // Якщо є токен, дозволяємо доступ до сторінок з регістрацією
  return <>{children}</>;
};

export default AuthRoute;
