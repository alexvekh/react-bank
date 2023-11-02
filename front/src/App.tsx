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
import {
  AuthContext,
  authReducer,
  initialAuthState,
} from "./container/AuthContext";
//import { AuthProvider } from "./container/AuthProvider";

const NotificationsPage: React.FC = () => {
  // Сторінка списку нотифікацій, який створюються при діях: Вхід
  //в акаунт Відновлення акаунту Зміна пароля Зміна пошти
  // Поповнення Переказ
  return (
    <div>
      <h1>NotificationsPage</h1>
    </div>
  );
};
const SettingsPage: React.FC = () => {
  //Сторінка налаштувань, на якій можна: Змінити пароль Змінити
  //пошту Вийти з акаунту Кожна дія повинна в кінці оновлювати
  //контекст аутентифікації
  return (
    <div>
      <h1>SettingsPage</h1>
    </div>
  );
};

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
const SendPage: React.FC = () => {
  //
  // {/* /Користувач вводить пошту та суму. Після чого у користувача, який відправив суму, створюється транзакція на списання грошей на нотифікацію, а у користувача, який отримав гроші, створюється транзакція на отримання грошей та нотифікацію */}
  return (
    <div>
      <h1>SendPage</h1>
    </div>
  );
};
const TransactionPage: React.FC = () => {
  return (
    <div>
      <h1>TransactionPage</h1>
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
              //<PrivateRoute>
              <TransactionPage />
              //Сторінка з детальною інформацією про конкретну транзакцію. В
              //сторінці є trainsactionId, який вказує на ідентифікатор
              //транзакції, який використовується для отримання та виводи
              //інформації про конкретну транзакцію. Перехід на цю сторінку
              //здійснюється через натискання на карточку транзакції на
              //сторінці  /balance
              //</Routes></PrivateRoute>
            }
          />
          <Route path="*" Component={Error} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
