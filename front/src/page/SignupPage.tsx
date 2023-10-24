import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatusBar from "../component/StatusBar";
import ArrowBack from "../component/ArrowBack";
import Alert from "../component/Alert";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Registration successful, you can navigate to the next page
        navigate("/signup-confirm");
      } else {
        // Handle registration errors
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
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
        <form className="form" onSubmit={handleSubmit}>
          <div className="input">
            <label>
              Email: <br />
              <input
                className="input__field"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="input">
            <label>
              Password: <br />
              <input
                className="input__field"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="notice">
            Already have an account?{" "}
            <Link className="notice__link" to="/signin">
              Sign In
            </Link>
          </div>
          <button className="button button-primary" type="submit">
            Continue
          </button>
          <Alert />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
