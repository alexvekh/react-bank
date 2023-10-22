import React, { useId } from "react";
import { Link } from "react-router-dom";

const SignupPage: React.FC = () => {
  return (
    <div className="page">
      <img
        src="./svg/status-bar-black.svg"
        alt="Status bare"
        className="status-bar"
      />
      <div className="arrow">
        <img src="./svg/back.svg" alt="Status bare" className="arrow-back" />
      </div>

      <div className="page__info">
        <h1 className="page__title">Sign up</h1>
        <p className="page__text">Choose a registration method</p>
      </div>

      <div>
        <label>
          Text input: <br />
          <input name="myInput" />
        </label>
      </div>

      {/* <div>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" />
      </div> */}

      <Link className="button button-primary" to="/signup">
        Continue
      </Link>
    </div>
  );
};

export default SignupPage;
