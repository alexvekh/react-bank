import React from "react";
import { Link } from "react-router-dom";
import StatusBar from "../component/status-bar";

// На цій сторінці ми створюємо верстку та розміщуємо дві
// кнопки-посилання на сторінку /signup та сторінку /signin
const WelcomePage: React.FC = () => {
  return (
    <div className="welcome-page">
      <div className="welcome">
        <StatusBar color="white" />
        <h1 className="welcome-title">Hello!</h1>
        <p className="welcome-text">Welcome to bank app</p>
      </div>

      <div className="welcome-space"></div>

      <div className="buttons">
        <Link className="button button-primary" to="/signup">
          Sign Up{" "}
        </Link>
        <Link className="button button-secondary" to="/signin">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
