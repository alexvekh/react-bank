import React, { createContext, useReducer, Dispatch } from "react";

//Створюємо контекст, в якому будемо тримати дані аутентифікації
//В контексті буде знаходитись: створений state через useReducer, який буде
//знаходитись властивість token та об'єкт user dispatch функція, яка
//буде мати наступні типи дій: увійти в акаунт, вийти з акаунту

type AuthState = {
  isLogged: boolean;
  isConfirmed: boolean;
  token: string | null;
  email: string | null;
};

type AuthAction =
  | { type: "LOGIN"; isConfirmed: boolean; token: string; email: string }
  | { type: "LOGOUT" };

// export const initialAuthState: AuthState = {
//   isLogged: false,
//   isConfirmed: false,
//   token: null,
//   email: null,
// };

// Get from local storage
export const initialAuthState: AuthState = {
  isLogged: localStorage.getItem("user.isLogged") === "true" || false,
  isConfirmed: localStorage.getItem("user.isConfirmed") === "true" || false,
  token: localStorage.getItem("user.token") || null,
  email: localStorage.getItem("user.email") || null,
};

console.log("1", "initialAuthState: ", initialAuthState);

// Редуктор для управління станом аутентифікації
export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLogged: true,
        isConfirmed: action.isConfirmed,
        token: action.token,
        email: action.email,
      };
    case "LOGOUT":
      return initialAuthState;
    default:
      return state;
  }
};

console.log("2", "authReducer", authReducer);
// =========================================
// Створюємо контекст аутентифікації
export const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

console.log("3", "AuthContext: ", AuthContext);

// // Компонент-постачальник контексту
// type AuthProviderProps = {
//   children: React.ReactNode; // Визначте властивість 'children' для типу
// };

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialAuthState);
//   console.log("c7");
//   return (
//     <AuthContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
