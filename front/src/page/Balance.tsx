import React from "react";
import { Link } from "react-router-dom";

//На цій сторінці ми створюємо верстку та розміщуємо дві
//кнопки-посилання на сторінку /signup та сторінку /signin
const WelcomePage: React.FC = () => {
  console.log("WelcomePage");
  return (
    <div className="welcome-page">
      {/* <img
        src="./svg/status-bar-white.svg"
        alt="Status bare"
        className="status-bar"
      /> 
      Зроблений в CSS
      */}

      <div className="welcome">
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
