import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

//Приватний роут, який перевіряє наявність токена в контексті аутентифікації.
//Будь-який запит, який відправляється в сторінках під приватним роутом повинні
//передавати токен (будь-яким варіантом) на сервер для перевірки токена
//та отримання інформації що за користувач відправляє дані та передати
//конкретно його дані

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authContext = useContext(AuthContext);
  console.log("PrivateRoute: authContext", authContext);

  // Перевіряємо, чи контекст ініціалізований
  if (!authContext) {
    // Якщо контекст не ініціалізований, виконуємо відповідну логіку
    return <Navigate to="/error" />;
  }

  // Якщо контекст ініціалізований, отримуємо state
  const { state } = authContext;
  console.log("PrivateRoute: state", state);

  // Перевіряємо, чи є токен
  if (!state.token) {
    // Якщо немає токена, переадресовуємо на сторінку входу
    return <Navigate to="/signin" />;
  }

  // Якщо є токен, дозволяємо доступ до захищених сторінок
  return <>{children}</>;
};

// const PrivateRoute = ({ ...props }) => {
//   const authContext = useContext(AuthContext);

//   if (!authContext || !authContext.state) {
//     console.log('PrivateRoute: !authContext', authContext );
//     // Якщо контекст або стан відсутні, перенаправте на сторінку входу
//     return <Navigate to="/login" />;
//   }

//   return authContext.state.isLogged ? (
//     <Route {...props} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

export default PrivateRoute;
