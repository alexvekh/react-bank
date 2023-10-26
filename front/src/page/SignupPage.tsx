import React, { useState, ChangeEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import StatusBar from "../component/StatusBar";
import ArrowBack from "../component/ArrowBack";
import Alert from "../component/Alert";
import Page from "../component/Page";
import Title from "../component/Title";
import Input from "../component/Input";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailValid, setEmailIsValid] = useState(false);
  const [isPassworValid, setPasswordIsValid] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newEmail: string = e.target.value;
    setEmail(newEmail);
    setEmailIsValid(validateEmail(newEmail));
  };

  const handleEmailBlur = () => {
    setEmailIsValid(validateEmail(email));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPassword: string = e.target.value;
    setPassword(newPassword);
    //setPasswordIsValid(validatePassword(newPassword));
  };

  const validatePassword = (password: string) => {
    // Define your password validation criteria here
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return password.length >= minLength && hasUppercase && hasSpecialChar;
  };

  const handlePasswordBlur = () => {
    setPasswordIsValid(validatePassword(password));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SignUpPage 1: ", email, password, navigate);

    try {
      const response = await fetch("http://localhost:4000/signup", {
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
          {/* <div className="input">
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
          </div> */}
          <Input
            label="Email"
            // {isEmailValid ? "Email: (✅valid)" : "Email: (❌ not valid)"}
            labelClassName={isEmailValid ? "input" : "input--error"}
            borderClassName={
              isEmailValid ? "input__field" : "input__field--error"
            }
            name={"email"}
            type="text"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          <Input
            label="Password"
            labelClassName="input"
            borderClassName={
              isPassworValid ? "input__field" : "input__field--error"
            }
            name={"password"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
          />

          <div className="notice">
            Already have an account?{" "}
            <Link className="notice__link" to="/signin">
              Sign In
            </Link>
          </div>
          <button className="button button-primary" type="submit">
            Continue
          </button>
          <Alert color="red" />
        </form>
      </div>
    </Page>
  );
};

export default SignupPage;
