import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./page/WelcomePage";
import SignupPage from "./page/SignupPage";
import AuthRoute from "./container/AuthRoute";
import AuthContext from "./container/AuthContext";

function App() {
  const authContextData = {
    isLogged: true, // Your authentication status
    login: (status: boolean) => {
      // Implement your login function here
    },
  };
  return (
    <AuthContext.Provider value={authContextData}>
      {/* //Створюємо контекст, в якому будемо тримати дані аутентифікації В
      //контексті буде знаходитись: створений state через useReducer, який буде
      //знаходитись властивість token та об'єкт user //dispatch функція, яка
      //буде //мати наступні типи дій: увійти в акаунт, вийти з акаунту */}
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
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
