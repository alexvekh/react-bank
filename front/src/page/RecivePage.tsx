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
import InputAmount from "../component/input-amount";
import PaymentSystem from "../component/payment-system";

//Сторінка поповнення балансу. Користувач вводить суму, натискає
//на платіжний метод і відправляється запит. Після чого
//створюється нова транзакція та нова нотифікація
type PaySystem = {
  correspondent: string;
  methods: string[];
};

const RecivePage: React.FC = () => {
  const [reciverEmail, setReceiverEmail] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isEmailValid, setEmailIsValid] = useState(true);
  const [isAmountValid, setAmountIsValid] = useState(true);
  const [alert, setAlert] = useState<string>("");
  const { state, dispatch } = useAuth();

  const stripe: PaySystem = {
    correspondent: "Stripe",
    methods: [
      "./../svg/pay-visa.svg",
      "./../svg/pay-thron.svg",
      "./../svg/pay-bitcoin.svg",
      "./../svg/pay-redthron.svg",
      "./../svg/pay-etherium.svg",
      "./../svg/pay-bnb.svg",
    ],
  };

  const coinbase: PaySystem = {
    correspondent: "Coinbase",
    methods: [
      "./../svg/pay-thron.svg",
      "./../svg/pay-visa.svg",
      "./../svg/pay-redthron.svg",
      "./../svg/pay-bitcoin.svg",
      "./../svg/pay-bnb.svg",
      "./../svg/pay-etherium.svg",
    ],
  };

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
    <body style={{ backgroundColor: "var(--Grey-BG, #F5F5F7)" }}>
      <Page>
        <StatusBar color="black" />
        <ArrowBackTitle title="Receive" />

        <div className="inputs">
          <form className="form" onSubmit={handleSubmit}>
            <InputAmount
              label="Receive amount"
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
            <div></div>

            <div>Payment system</div>

            <PaymentSystem paySystem={stripe} />

            <PaymentSystem paySystem={coinbase} />

            {alert ? <Alert status="yellow" text={alert} /> : null}
          </form>
        </div>
      </Page>
    </body>
  );
};

export default RecivePage;
