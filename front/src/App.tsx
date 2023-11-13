import React, { useReducer } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./page/WelcomePage";
import SignupPage from "./page/SignupPage";
import AuthRoute from "./container/AuthRoute";
import PrivateRoute from "./container/PrivateRoute";
import SigninPage from "./page/SigninPage";
import SignupConfirmPage from "./page/SignupConfirmPage";
import RecoveryPage from "./page/RecoveryPage";
import RecoveryConfirmPage from "./page/RecoveryConfirmPage";
import BalancePage from "./page/BalancePage";
import SettingsPage from "./page/SettingsPage";
import NotificationsPage from "./page/NotificationsPage";
import TransactionPage from "./page/TransactionPage";
import SendPage from "./page/SendPage";
import RecivePage from "./page/RecivePage";
import Error from "./page/ErrorPage";
import {
  AuthContext,
  authReducer,
  AuthState,
  initialAuthState,
} from "./container/AuthContext";

function App() {
  const storedState = localStorage.getItem("authState");
  const initialState: AuthState = storedState
    ? JSON.parse(storedState)
    : initialAuthState;

  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log("App: state, dispatch : ", state, dispatch);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <WelcomePage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element={
              <PrivateRoute>
                <SignupConfirmPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SigninPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <RecoveryPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm"
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
              </AuthRoute>
            }
          />
          <Route
            path="/balance"
            element={
              <PrivateRoute>
                <BalancePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/recive"
            element={
              <PrivateRoute>
                <RecivePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transaction/:transactionId"
            element={
              <PrivateRoute>
                <TransactionPage />
              </PrivateRoute>
            }
          />
          <Route path="*" Component={Error} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
