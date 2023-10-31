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

// На цій сторінці вводимо код підтвердження реєстрації акаунта
//та після успішного запиту переводимо на сторінку /balance
//Перевіряємо в контексті аутентифікації чи user.confirm. Якщо
//так, то переводимо на сторінку /balance

const SigninPage: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const { state, dispatch } = useAuth();
  //const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    //const code: string = e.target.value;
    const code: string = e.target.value;
    e.preventDefault();

    if (!code) {
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
          console.log("dispatch:", user);

          // Dispatch the "LOGIN" action to update the state
          dispatch({
            type: "LOGIN",
            isLogged: user.isLogged,
            isConfirmed: user.isConfirmed,
            token: user.token,
            email: user.email,
          });

          console.log("after dispatch:", user);
          //dispatch({ type: "LOGIN", payload: user })

          // LocalStorage
          localStorage.setItem("bankUserIsLogged", user.isLogged);
          localStorage.setItem("bankUserIsConfirmed", user.isConfirmed);
          localStorage.setItem("bankUserToken", user.token);
          localStorage.setItem("bankUserEmail", user.email);
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
      <Title
        title="Confirm account"
        description="Write the code you received"
      />

      <div className="inputs">
        {/* onSubmit={handleSubmit} */}
        <form className="form" onSubmit={handleSubmit}>
          <Input
            label="Code"
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
