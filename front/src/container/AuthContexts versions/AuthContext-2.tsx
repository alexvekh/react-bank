import { createContext, useContext, Dispatch } from "react";

// Створюємо контекст, в якому будемо тримати дані аутентифікації
// В контексті буде знаходитись:
//    створений state через useReducer, який буде знаходитись
//            властивість token та об'єкт user
//    dispatch функція, яка буде мати наступні типи дій:
//            увійти в акаунт, вийти з акаунту

type User = {
  email: string;
};

type AuthState = {
  isLogged: boolean;
  token: string | null;
  user: User | null;
};

type AuthAction =
  | { type: "LOGIN"; token: string; user: User }
  | { type: "LOGOUT" };

export const initialAuthState: AuthState = {
  isLogged: false,
  token: null,
  user: null,
};

console.log("Context: initialAuthState: ", initialAuthState);

// Редуктор для управління станом аутентифікації
export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { isLogged: true, token: action.token, user: action.user };
    case "LOGOUT":
      return initialAuthState;
    default:
      return state;
  }
};

console.log("Context: authReducer", authReducer);

// =========================================
// Створюємо контекст аутентифікації
export const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

console.log("Context: AuthContext: ", AuthContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
