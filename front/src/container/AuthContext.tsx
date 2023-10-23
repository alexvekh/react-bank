import React, { createContext, useReducer, Dispatch } from "react";

//Створюємо контекст, в якому будемо тримати дані аутентифікації
//В контексті буде знаходитись: створений state через useReducer, який буде
//знаходитись властивість token та об'єкт user dispatch функція, яка
//буде мати наступні типи дій: увійти в акаунт, вийти з акаунту
type UserType = {
  username: string;
  email: string;
};
console.log("c1");
type AuthState = {
  isLogged: boolean;
  token: string | null;
  user: UserType | null;
};
console.log("c2");
type AuthAction =
  | { type: "LOGIN"; token: string; user: UserType }
  | { type: "LOGOUT" };
console.log("c3");
const initialAuthState: AuthState = {
  isLogged: false,
  token: null,
  user: null,
};
console.log("c4", "initialAuthState: ", initialAuthState);

// Редуктор для управління станом аутентифікації
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { isLogged: true, token: action.token, user: action.user };
    case "LOGOUT":
      return initialAuthState;
    default:
      return state;
  }
};

console.log("c5", "authReducer", authReducer);
// =========================================
// Створюємо контекст аутентифікації
export const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: Dispatch<AuthAction>;
    }
  | undefined
>(undefined);
console.log("c6", "AuthContext: ", AuthContext);

// Компонент-постачальник контексту
type AuthProviderProps = {
  children: React.ReactNode; // Визначте властивість 'children' для типу
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  console.log("c7");
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
