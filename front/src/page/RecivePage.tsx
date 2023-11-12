import React, { useState, ChangeEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import StatusBar from "../component/status-bar/index";
import Alert from "../component/alert/index";
import Page from "../component/page/index";
import { useAuth } from "../container/AuthContext";
import ArrowBackTitle from "../component/arrow-back-title";
import { validateMoneyAmount } from "../component/Utils";
import InputAmount from "../component/input-amount";
import PaymentSystem from "../component/payment-system";

//Сторінка поповнення балансу. Користувач вводить суму, натискає
//на платіжний метод і відправляється запит. Після чого
//створюється нова транзакція та нова нотифікація
type PaymentSystem = {
  system: string;
  methods: string[];
};

const RecivePage: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [paySystem, setPaySystem] = useState("");
  const [isAmountValid, setAmountIsValid] = useState(true);
  const [alert, setAlert] = useState<string>("");
  const { state, dispatch } = useAuth();

  const stripe: PaymentSystem = {
    system: "Stripe",
    methods: [
      "./../svg/pay-visa.svg",
      "./../svg/pay-thron.svg",
      "./../svg/pay-bitcoin.svg",
      "./../svg/pay-redthron.svg",
      "./../svg/pay-etherium.svg",
      "./../svg/pay-bnb.svg",
    ],
  };
  const coinbase: PaymentSystem = {
    system: "Coinbase",
    methods: [
      "./../svg/pay-thron.svg",
      "./../svg/pay-visa.svg",
      "./../svg/pay-redthron.svg",
      "./../svg/pay-bitcoin.svg",
      "./../svg/pay-bnb.svg",
      "./../svg/pay-etherium.svg",
    ],
  };

  const receiverEmail = state.email;

  const handleMoneyAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newAmount: string = e.target.value;
    setAmount(newAmount);
    setAmountIsValid(validateMoneyAmount(newAmount) || newAmount === "");
  };

  const navigate = useNavigate();

  const handleStripeClick = () => {
    setPaySystem("Stripe");
  };

  const handleCoinbaseClick = () => {
    setPaySystem("Coinbase");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount) {
      setAlert("Enter amount!");
    } else if (!paySystem) {
      setAlert("Choise payment method!");
    } else if (!isAmountValid) {
      setAlert("Enter a valid amount");
    } else {
      try {
        const response = await fetch("http://localhost:4000/recive", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paySystem, receiverEmail, amount }),
        });

        if (response.status === 409) {
          const responseData = await response.json();
          setAlert(responseData.error);
        }

        if (response.ok) {
          // Registration successful, you can navigate to the next page
          const responseData = await response.json(); // Parse the JSON response
          console.log("Response Data:", responseData);
          setAlert(responseData.message);
          navigate("/balance");
        } else {
          // Handle registration errors
          console.error("Receiving failed");
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
            <button id="stripe" type="submit" onClick={handleStripeClick}>
              {" "}
              <PaymentSystem paymentSystem={stripe} />
            </button>
            <button id="coinbase" type="submit" onClick={handleCoinbaseClick}>
              <PaymentSystem paymentSystem={coinbase} />{" "}
            </button>

            {alert ? <Alert status="yellow" text={alert} /> : null}
          </form>
        </div>
      </Page>
    </body>
  );
};

export default RecivePage;
