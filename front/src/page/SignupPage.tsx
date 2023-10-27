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
  const [isEmailValid, setEmailIsValid] = useState(true);
  const [isPasswordValid, setPasswordIsValid] = useState(true);
  const [alert, setAlert] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newEmail: string = e.target.value;
    setEmail(newEmail);
    setEmailIsValid(validateEmail(newEmail));
  };

  const validatePassword = (password: string) => {
    // Define your password validation criteria here
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return password.length >= minLength && hasUppercase && hasSpecialChar;
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPassword: string = e.target.value;
    setPassword(newPassword);
    setPasswordIsValid(validatePassword(newPassword));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailIsValid(validateEmail(email));
    setPasswordIsValid(validatePassword(password));

    if (!email && !password) {
      setAlert("Enter email and password!");
    } else if (!email) {
      setAlert("Enter email!");
    } else if (!password) {
      setAlert("Enter password!");
    } else if (!isEmailValid) {
      setAlert("Enter e valid email!");
    } else if (!isPasswordValid) {
      setAlert("Enter e valid password!");
    } else {
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
    }
  };

  return (
    <Page>
      <StatusBar />
      <ArrowBack />
      <Title title="Sign up" description="Choose a registration method" />
      <div className="inputs">
        <form className="form" onSubmit={handleSubmit}>
          <Input
            label="Email"
            labelClassName={isEmailValid ? "input" : "input--error"}
            borderClassName={
              isEmailValid ? "input__field" : "input__field--error"
            }
            name={"email"}
            type="text"
            value={email}
            onChange={handleEmailChange}
            notice={isEmailValid ? "" : "Email is not valid"}
          />
          <Input
            label="Password"
            labelClassName={isPasswordValid ? "input" : "input--error"}
            borderClassName={
              isPasswordValid ? "input__field" : "input__field--error"
            }
            name={"password"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            notice={
              isPasswordValid
                ? ""
                : "Minimum 8 symbols, 1 upperCase and 1 special"
            }
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
          {alert ? (
            <Alert src="../svg/alert-yellow.svg" color="orange" text={alert} />
          ) : null}
        </form>
      </div>
    </Page>
  );
};

export default SignupPage;
