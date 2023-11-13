import React, { useState, useReducer, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatusBar from "../component/status-bar/index";
import ArrowBack from "../component/arrow-back/index";
import Alert from "../component/alert/index";
import Page from "../component/page/index";
import Title from "../component/title/index";
import Input from "../component/input/index";
import InputPassword from "../component/input-password/index";
import { useAuth } from "../container/AuthContext";

//Вхід в акаунт. Зберігаємо дані аутентифікації в контекст. Якщо
//user.confirm є false, то перенаправляємо на /signup-confirm

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailValid, setEmailIsValid] = useState(true);
  const [isPasswordValid, setPasswordIsValid] = useState(true);
  const [alert, setAlert] = useState<string>("");
  const { state, dispatch } = useAuth();
  //const [state, dispatch] = useReducer(authReducer, initialAuthState);

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
      setAlert("Minimum 8 symbols, 1 UpperCase, 1 special");
    } else {
      try {
        const response = await fetch("http://localhost:4000/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.status === 409) {
          // Handle the case where the email already exists
          const responseData = await response.json();

          setAlert(responseData.error);
        }

        if (response.ok) {
          // Registration successful, you can navigate to the next page
          const responseData = await response.json(); // Parse the JSON response

          const user = responseData.user;

          // Dispatch the "LOGIN" action to update the state
          dispatch({ type: "LOGIN", payload: user });

          if (user.isConfirmed) {
            navigate("/balance");
          } else {
            navigate("/signup-confirm");
          }
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
      <Title title="Sign in" description="Select login method" />

      <div className="inputs">
        {/* onSubmit={handleSubmit} */}
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
          <div className="notice">
            Forgot your password?{" "}
            <Link className="notice__link" to="/recovery">
              Restore
            </Link>
          </div>
          <button className="button button-primary">Continue</button>
          {alert ? <Alert status="yellow" text={alert} /> : null}
        </form>
      </div>

      {/* <div>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" />
      </div> */}

      <Link to="/signup"></Link>
    </Page>
  );
};

export default SigninPage;
