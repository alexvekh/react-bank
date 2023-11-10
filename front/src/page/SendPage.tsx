import React, { useState, ChangeEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import StatusBar from "../component/status-bar/index";
import ArrowBack from "../component/arrow-back/index";
import Alert from "../component/alert/index";
import Page from "../component/page/index";
import Title from "../component/title/index";
import Input from "../component/input/index";
import InputPassword from "../component/input-password/index";
import { useAuth } from "../container/AuthContext";
import ArrowBackTitle from "../component/arrow-back-title";
import { validateEmail, validateMoneyAmount } from "../component/Utils";

// {/* /Користувач вводить пошту та суму.
//Після чого у користувача, який відправив суму,
//створюється транзакція на списання грошей на нотифікацію,
//а у користувача, який отримав гроші,
//створюється транзакція на отримання грошей та нотифікацію */}

const SendPage: React.FC = () => {
  const [reciverEmail, setReceiverEmail] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isEmailValid, setEmailIsValid] = useState(true);
  const [isAmountValid, setAmountIsValid] = useState(true);
  const [alert, setAlert] = useState<string>("");
  const { state, dispatch } = useAuth();

  const senderEmail = state.email;

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newEmail: string = e.target.value;
    setReceiverEmail(newEmail);
    setEmailIsValid(validateEmail(newEmail));
  };

  const handleMoneyAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newAmount: string = e.target.value;
    //const amountAsNumber: number = parseFloat(newAmount);
    setAmount(newAmount);
    setAmountIsValid(validateMoneyAmount(newAmount));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailIsValid(validateEmail(reciverEmail));

    if (!reciverEmail && !amount) {
      setAlert("Enter email and amount!");
    } else if (!reciverEmail) {
      setAlert("Enter email!");
    } else if (!amount) {
      setAlert("Enter amount!");
    } else if (!isEmailValid) {
      setAlert("Enter e valid email!");
    } else if (!isAmountValid) {
      setAlert("Enter a valid amount");
    } else {
      try {
        const response = await fetch("http://localhost:4000/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ senderEmail, reciverEmail, amount }),
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

          //console.log("user:", user);

          //dispatch({ type: "LOGIN", payload: user });

          // LocalStorage
          // setUserDataInLocalStorage(user);

          navigate("/balance");
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
      <ArrowBackTitle title="Send" />

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
            value={reciverEmail}
            onChange={handleEmailChange}
            notice={isEmailValid ? "" : "Amount is not valid"}
          />
          <Input
            label="Sum"
            labelClassName={isAmountValid ? "input" : "input--error"}
            borderClassName={
              isAmountValid ? "input__field" : "input__field--error"
            }
            name={"amount"}
            type="number"
            value={amount}
            onChange={handleMoneyAmountChange}
            notice={isAmountValid ? "" : "Amount is not valid"}
          />

          <button className="button button-primary" type="submit">
            Send
          </button>
          {alert ? <Alert status="yellow" text={alert} /> : null}
        </form>
      </div>
    </Page>
  );
};

export default SendPage;