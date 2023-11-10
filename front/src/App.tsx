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
import {
  AuthContext,
  authReducer,
  initialAuthState,
} from "./container/AuthContext";
//import { AuthProvider } from "./container/AuthProvider";

const RecivePage: React.FC = () => {
  //Сторінка поповнення балансу. Користувач вводить суму, натискає
  //на платіжний метод і відправляється запит. Після чого
  //створюється нова транзакція та нова нотифікація
  return (
    <div>
      <h1>RecivePage</h1>
    </div>
  );
};

const Error: React.FC = () => {
  return <div className="App-header">Error Page</div>;
};

function App() {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  console.log("App: state, dispatch : ", state, dispatch);

  console.log("App:state, dispatch entered: ", state, dispatch);
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
