import { createContext, useContext, Dispatch } from "react";

// Створюємо контекст, в якому будемо тримати дані аутентифікації
// В контексті буде знаходитись:
//    створений state через useReducer, який буде знаходитись
//            властивість token та об'єкт user
//    dispatch функція, яка буде мати наступні типи дій:
//            увійти в акаунт, вийти з акаунту

type AuthState = {
  isLogged: boolean;
  token: string | null;
  email: string | null;
};

type AuthAction =
  | {
      type: "LOGIN";
      payload: {
        isLogged: boolean;
        token: string;
        email: string;
      };
    }
  | { type: "LOGOUT" };

export const initialAuthState: AuthState = {
  isLogged: false,
  token: null,
  email: null,
};

// ==============   Keepin login in For testsing private pages
// export const initialAuthState: AuthState = {
//   isLogged: true,
//   isConfirmed: true,
//   token: "Q&FdPDvByVne",
//   email: "bob@mail.com",
// };

console.log("AuthContest.initialAuthState: ", initialAuthState);

// Редуктор для управління станом аутентифікації
export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLogged: action.payload.isLogged,
        token: action.payload.token,
        email: action.payload.email,
      };
    case "LOGOUT":
      return initialAuthState;
    default:
      return state;
  }
};

console.log("AuthContest.authReducer", authReducer);
// =========================================
// Створюємо контекст аутентифікації
export const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
