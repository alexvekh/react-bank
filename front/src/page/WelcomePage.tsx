import React from "react";
import { Link } from "react-router-dom";

const WelcomePage: React.FC = () => {
  return (
    <div className="welcome-page">
      {/* <img
        src="./svg/status-bar-white.svg"
        alt="Status bare"
        className="status-bar"
      /> */}

      <div className="welcome">
        <h1 className="welcome-title">Hello!</h1>
        <p className="welcome-text">Welcome to bank app</p>
      </div>

      <div className="welcome-space"></div>

      <div className="buttons">
        <Link className="button button-primary" to="/signup">
          Sign Up
        </Link>
        <Link className="button button-secondary" to="/signin">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
