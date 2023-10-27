import React, { useState } from "react";
import { Link } from "react-router-dom";
import StatusBar from "../component/StatusBar";
import ArrowBack from "../component/ArrowBack";
import Alert from "../component/Alert";

//Вхід в акаунт. Зберігаємо дані аутентифікації в контекст. Якщо
//user.confirm є false, то перенаправляємо на /signup-confirm
const SigninPage: React.FC = () => {
  return (
    <div className="page">
      <StatusBar />
      <ArrowBack />
      <div className="page__info">
        <h1 className="page__title">Sign in</h1>
        <p className="page__text">Select login method</p>
      </div>
      <div className="inputs">
        {/* onSubmit={handleSubmit} */}
        <form className="form" method="post">
          <div className="input">
            <label>
              Email: <br />
              <input className="input__field" name="email" />
            </label>
          </div>
          <div className="input">
            <label>
              Password: <br />
              <input className="input__field" name="password" />
            </label>
          </div>
          <div className="notice">
            Already have an account?{" "}
            <Link className="notice__link" to="/signin">
              Sign In
            </Link>
          </div>
          <button className="button button-primary">Continue</button>
        </form>
      </div>

      {/* <div>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" />
      </div> */}

      <Link to="/signup"></Link>
    </div>
  );
};

export default SigninPage;
