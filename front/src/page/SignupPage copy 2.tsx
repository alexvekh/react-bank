import React, { useId } from "react";
import { Link } from "react-router-dom";
import StatusBar from "../component/StatusBar";
import ArrowBack from "../component/ArrowBack";
import Alert from "../component/Alert";

//На цій сторінці створюємо форму, яка відправляє запит на
//реєстрацію користувача та переводить на сторінку
//  /signup-comfirm Після реєстрації потрібно зберегти дані
//  аутентифікації в контекст

const SignupPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement form submission logic here, e.g., sending a request to register the user.
  };

  return (
    <div className="page">
      <StatusBar />
      <ArrowBack />
      <div className="page__info">
        <h1 className="page__title">Sign up</h1>
        <p className="page__text">Choose a registration method</p>
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
          <Alert />
          {/* A user with the same name is already exist */}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
