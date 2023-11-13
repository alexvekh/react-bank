import React, { useState, ChangeEvent } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import StatusBar from "../component/status-bar/index";
import ArrowBack from "../component/arrow-back/index";
import Alert from "../component/alert/index";
import Page from "../component/page/index";
import Title from "../component/title/index";
import Input from "../component/input/index";
import InputPassword from "../component/input-password/index";
import { useAuth } from "../container/AuthContext";

//Сторінка підтвердження відновлення та оновлення пароля. Після
//відправки форми потрібно перевести на сторінку /balance

const RecoveryConfirmPage: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isPasswordValid, setPasswordIsValid] = useState(true);
  const [alert, setAlert] = useState<string>("");
  const { state, dispatch } = useAuth();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  console.log("email", email);

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
    setPasswordIsValid(validatePassword(password));
    if (!code && !password) {
      setAlert("Enter code and password!");
    } else if (!code) {
      setAlert("Enter code you recived!");
    } else if (!password) {
      setAlert("Create a password!");
    } else if (!isPasswordValid) {
      setAlert("Minimum 8 symbols, 1 UpperCase, 1 special");
    } else {
      const enteredCode: Number = Number(code);
      console.log(email, password, enteredCode);
      try {
        const response = await fetch("http://localhost:4000/recovery-confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, enteredCode }),
        });

        if (response.status === 409) {
          // Handle the case where the email already exists
          const responseData = await response.json();
          console.log(responseData.error);
          console.error(responseData.error);
          setAlert(responseData.error);
        }

        if (response.ok) {
          // Registration successful, you can navigate to the next page
          const responseData = await response.json(); // Parse the JSON response
          console.log("Response Data:", responseData);

          const user = responseData.user;
          console.log("user:", user);

          dispatch({ type: "LOGIN", payload: user });

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
      <StatusBar color="black" />
      <ArrowBack />
      <Title
        title="Recover password"
        description="Write the code you received"
      />
      <div className="inputs">
        <form className="form" onSubmit={handleSubmit}>
          <Input
            label="Code"
            labelClassName={alert ? "input--error" : "input"}
            borderClassName={alert ? "input__field--error" : "input__field"}
            name={"code"}
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setAlert("");
            }}
            notice={alert ? "Invalid code" : ""}
            autoFocus
          />
          <InputPassword
            label="Password"
            labelClassName={isPasswordValid ? "input" : "input--error"}
            borderClassName={
              isPasswordValid ? "input__field" : "input__field--error"
            }
            name={"password"}
            type="password"
            value={password}
            onChange={handlePasswordChange}
            notice={isPasswordValid ? "" : "Sorry, the password is too simple"}
          />
          <button className="button button-primary" type="submit">
            Restore&nbsp;password
          </button>
          {alert ? <Alert status="yellow" text={alert} /> : null}
        </form>
      </div>
    </Page>
  );
};

export default RecoveryConfirmPage;
