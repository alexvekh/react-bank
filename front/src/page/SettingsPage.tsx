import React, { useState, ChangeEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import StatusBar from "../component/status-bar/index";
import ArrowBackTitle from "../component/arrow-back-title/index";
import Alert from "../component/alert/index";
import Page from "../component/page/index";
import Input from "../component/input/index";
import InputPassword from "../component/input-password/index";
import { useAuth } from "../container/AuthContext";
import { validateEmail } from "../component/Utils";
import { validatePassword } from "../component/Utils";

//Сторінка налаштувань, на якій можна: Змінити пароль Змінити
//пошту Вийти з акаунту Кожна дія повинна в кінці оновлювати
//контекст аутентифікації

const SettingsPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isEmailValid, setEmailIsValid] = useState(true);
  const [isPasswordValid, setPasswordIsValid] = useState(true);
  const [isOldPasswordValid, setOldPasswordIsValid] = useState(true);
  const [isNewPasswordValid, setNewPasswordIsValid] = useState(true);
  const [alertEmailChange, setAlertEmailChange] = useState<string>("");
  const [alertPasswordChange, setAlertPasswordChange] = useState<string>("");
  const { state, dispatch } = useAuth();

  const userEmail = state.email;

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newEmail: string = e.target.value;
    setEmail(newEmail);
    setEmailIsValid(validateEmail(newEmail));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const passwordNew: string = e.target.value;
    setPassword(passwordNew);
    setPasswordIsValid(validatePassword(passwordNew));
  };

  const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const oldPasswordNew: string = e.target.value;
    setOldPassword(oldPasswordNew);
    setOldPasswordIsValid(validatePassword(oldPasswordNew));
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPasswordNew: string = e.target.value;
    setNewPassword(newPasswordNew);
    setNewPasswordIsValid(validatePassword(newPasswordNew));
  };

  const navigate = useNavigate();

  const handleSubmitEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailIsValid(validateEmail(email));
    setPasswordIsValid(validatePassword(password));

    try {
      const response = await fetch("http://localhost:4000/change-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, newEmail: email, password }),
      });

      if (response.status === 409) {
        const responseData = await response.json();
        console.log(responseData.error);
        console.error(responseData.error);
        setAlertEmailChange(responseData.error);
      }

      if (response.ok) {
        const responseData = await response.json(); // Parse the JSON response
        console.log("Response Data:", responseData);
        const user = responseData.user;
        console.log("user:", user);
        dispatch({ type: "LOGIN", payload: user });
        dispatch({ type: "LOGOUT" });

        // LocalStorage
        // setUserDataInLocalStorage(user);

        navigate("/signup-confirm");
      } else {
        // Handle registration errors
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSubmitPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setOldPasswordIsValid(validatePassword(oldPassword));
    setNewPasswordIsValid(validatePassword(newPassword));
    try {
      const response = await fetch("http://localhost:4000/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, oldPassword, newPassword }),
      });

      if (response.status === 409) {
        // Handle the case where the email already exists
        const responseData = await response.json();
        console.log(responseData.error);
        console.error(responseData.error);
        setAlertPasswordChange(responseData.error);
      }

      if (response.ok) {
        // Registration successful, you can navigate to the next page
        const responseData = await response.json(); // Parse the JSON response
        console.log("Response Data:", responseData);

        const user = responseData.user;
        console.log("user:", user);

        dispatch({ type: "LOGIN", payload: user });
        dispatch({ type: "LOGOUT" });

        // LocalStorage
        // setUserDataInLocalStorage(user);

        navigate("/signup-confirm");
      } else {
        // Handle registration errors
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/signin");
  };

  return (
    <Page>
      <StatusBar color="black" />
      <ArrowBackTitle title="Settings" />

      <div className="inputs">
        <form className="form2" onSubmit={handleSubmitEmailChange}>
          <h2 className="input-title">Change email</h2>
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
          <InputPassword
            label="Old Password"
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

          <button className="button button-secondary" type="submit">
            Save&nbsp;Email
          </button>
          {alertEmailChange ? (
            <Alert status="yellow" text={alertEmailChange} />
          ) : null}
        </form>
        <div className="divider"></div>

        <form className="form2" onSubmit={handleSubmitPasswordChange}>
          <h2 className="input-title">Change password</h2>
          <InputPassword
            label="Old Password"
            labelClassName={isOldPasswordValid ? "input" : "input--error"}
            borderClassName={
              isOldPasswordValid ? "input__field" : "input__field--error"
            }
            name={"password"}
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            notice={
              isOldPasswordValid ? "" : "Sorry, the password is too simple"
            }
          />
          <InputPassword
            label="New Password"
            labelClassName={isNewPasswordValid ? "input" : "input--error"}
            borderClassName={
              isNewPasswordValid ? "input__field" : "input__field--error"
            }
            name={"password"}
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            notice={
              isNewPasswordValid ? "" : "Sorry, the password is too simple"
            }
          />

          <button className="button button-secondary" type="submit">
            Save&nbsp;Password
          </button>
          {alertPasswordChange ? (
            <Alert status="yellow" text={alertPasswordChange} />
          ) : null}
        </form>
        <div className="divider"></div>

        <button className="button button-secondary--red" onClick={handleLogout}>
          Log&nbsp;out
        </button>
      </div>
    </Page>
  );
};

export default SettingsPage;
