import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import AmountSplitter from "../AmountSplitter";
import { formatTimestamp } from "../Utils";

type PaymentSystemProps = {
  paymentSystem: {
    system: string;
    methods: string[];
  };
};

const PaymentSystem: React.FC<PaymentSystemProps> = ({ paymentSystem }) => {
  const { system, methods } = paymentSystem;
  console.log("system, methods", system, methods);

  let logo = "";
  if (system === "Stripe") {
    logo = "./svg/S.svg";
  } else if (system === "Coinbase") {
    logo = "./svg/C.svg";
  } else {
    logo = "./svg/user.svg";
  }

  return (
    <div className="payment-system">
      <div className="payment__info">
        <img className="transaction__img" src={logo} alt="Agent logo" />
        <div className="transaction__agent"> {system} </div>
      </div>
      <ul className="pay-methods">
        {methods.map((method, index) => (
          <li key={index}>
            <img src={method} />
          </li>
        ))}
      </ul>
    </div>
    // </Link>
  );
};

export default PaymentSystem;
