import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatusBar from "../component/status-bar/index";
import ArrowBack from "../component/arrow-back/index";
import Alert from "../component/alert/index";
import Page from "../component/page/index";
import Title from "../component/title/index";
import Input from "../component/input/index";
import { useAuth } from "../container/AuthContext";

// На цій сторінці вводимо код підтвердження реєстрації акаунта
//та після успішного запиту переводимо на сторінку /balance
//Перевіряємо в контексті аутентифікації чи user.confirm. Якщо
//так, то переводимо на сторінку /balance

const SignupConfirmPage: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const { state, dispatch } = useAuth();
  //const { state, dispatch } = useContext(AuthContext);

  //const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //const newCode: number = parseInt((e.target as HTMLInputElement).value, 10);
    const newCode = (e.target as HTMLInputElement).value;
    setCode(newCode);
    //const code: Number = code;
    //const code = (e.target as HTMLInputElement).value;
    //const code = e.target.value;
    const email = state.email;
    console.log("code: ", code, "email:", email);

    if (!code) {
      setAlert("Enter the code you are recived");
    } else {
      const enteredCode: Number = Number(code);
      console.log(enteredCode);
      try {
        const response = await fetch("http://localhost:4000/signup-confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, enteredCode }),
        });

        if (response.status === 409) {
          // 'Invalid code'
          const responseData = await response.json();
          console.error(responseData.error);
          setCode("");
          setAlert(responseData.error);
        }

        if (response.ok) {
          // Code confirmed
          const responseData = await response.json(); // Parse the JSON response
          console.log("Response OK responseData:", responseData);
          const user = responseData.user;

          // Dispatch the "LOGIN" action to update the state
          dispatch({ type: "LOGIN", payload: user });
          navigate("/balance");
        } else {
          // Handle registration errors
          console.error("Cod confirmation failed");
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
          <button className="button button-primary">Confirm</button>
          {alert ? <Alert status="yellow" text={alert} /> : null}
        </form>
      </div>
      <Link to="/signup"></Link>
    </Page>
  );
};

export default SignupConfirmPage;
