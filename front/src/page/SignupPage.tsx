import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import StatusBar from "../component/StatusBar";
import ArrowBack from "../component/ArrowBack";
import Alert from "../component/Alert";
import Page from "../component/Page";
import Title from "../component/Title";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SignUpPage 1: ", email, password, navigate);

    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(
        "SignUpPage 2: response",
        response,
        email,
        password,
        navigate
      );
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
    <Page>
      <StatusBar />
      <ArrowBack />
      <Title title="Sign up" description="Choose a registration method" />
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
    </Page>
  );
};

export default SignupPage;
