import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./page/WelcomePage";
import SignupPage from "./page/SignupPage";
import AuthRoute from "./container/AuthRoute";
//import { AuthContext } from "./container/AuthContext";
import { AuthProvider } from "./container/AuthProvider";

const SignupConfirmPage: React.FC = () => {
  return (
    <div>
      <h1>SignupConfirmPage</h1>
    </div>
  );
};
const SigninPage: React.FC = () => {
  return (
    <div>
      <h1>SigninPage</h1>
    </div>
  );
};
const RecoveryPage: React.FC = () => {
  return (
    <div>
      <h1>RecoveryPage</h1>
    </div>
  );
};
const RecoveryConfirmPage: React.FC = () => {
  return (
    <div>
      <h1>RecoveryConfirmPage</h1>
    </div>
  );
};
const BalancePage: React.FC = () => {
  return (
    <div>
      <h1>BalancePage</h1>
    </div>
  );
};
const NotificationsPage: React.FC = () => {
  return (
    <div>
      <h1>NotificationsPage</h1>
    </div>
  );
};
const SettingsPage: React.FC = () => {
  return (
    <div>
      <h1>SettingsPage</h1>
    </div>
  );
};

const RecivePage: React.FC = () => {
  return (
    <div>
      <h1>RecivePage</h1>
    </div>
  );
};
const SendPage: React.FC = () => {
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
  const authContextData = {
    isLogged: true, // Ваш статус аутентифікації
    token: "your_token_here", // Токен користувача
    login: (status: boolean) => {
      // Реалізуйте вашу функцію входу тут
    },
  };
  return (
    //<AuthContext.Provider value={authContextData}>
    <AuthProvider>
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
              //<PrivateRoute>
              //На сторінці /signup-confirm використовуємо PrivateRoute, адже
              //підтвердити акаунт може користувач, який вже увійшов в
              //акаунтПісля підтвердження акаунту потрібно оновити дані
              //аутентифікації в контексті
              <SignupConfirmPage />
              // На цій сторінці вводимо код підтвердження реєстрації акаунта
              //та після успішного запиту переводимо на сторінку /balance
              //Перевіряємо в контексті аутентифікації чи user.confirm. Якщо
              //так, то переводимо на сторінку /balance
              //</PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SigninPage />
                //Вхід в акаунт. Зберігаємо дані аутентифікації в контекст. Якщо
                //user.confirm є false, то перенаправляємо на /signup-confirm
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <RecoveryPage />
                //Сторінка відновлення акаунту. Після вводу пошти, створюється
                //код з підтвердженням відновлення акаунту, переводимо на
                сторінку /recovery-confirm
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm"
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
                //Сторінка підтвердження відновлення та оновлення пароля. Після
                //відправки форми потрібно перевести на сторінку /balance
              </AuthRoute>
            }
          />
          <Route
            path="/balance"
            element={
              //<PrivateRoute>

              <BalancePage />
              // Сторінка балансу
              //</PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              //<PrivateRoute>
              <NotificationsPage />
              // Сторінка списку нотифікацій, який створюються при діях: Вхід
              //в акаунт Відновлення акаунту Зміна пароля Зміна пошти
              // Поповнення Переказ
              //</Routes></PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              //<PrivateRoute>
              <SettingsPage />
              //Сторінка налаштувань, на якій можна: Змінити пароль Змінити
              //пошту Вийти з акаунту Кожна дія повинна в кінці оновлювати
              //контекст аутентифікації
              //</PrivateRoute>
            }
          />
          <Route
            path="/recive"
            element={
              //<PrivateRoute>
              <RecivePage />
              //Сторінка поповнення балансу. Користувач вводить суму, натискає
              //на платіжний метод і відправляється запит. Після чого
              //створюється нова транзакція та нова нотифікація
              //</PrivateRoute>
            }
          />
          <Route
            path="/send"
            element={
              //<PrivateRoute>
              <SendPage />
              //
              // {/* /Користувач вводить пошту та суму. Після чого у користувача, який відправив суму, створюється транзакція на списання грошей на нотифікацію, а у користувача, який отримав гроші, створюється транзакція на отримання грошей та нотифікацію */}
              //</PrivateRoute>
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
    </AuthProvider>
    //</AuthContext.Provider>
  );
}

export default App;
