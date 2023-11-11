import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import AmountSplitter from "../AmountSplitter";
import { formatTimestamp } from "../Utils";

type PaymentSystemProps = {
  paySystem: {
    correspondent: string;
    methods: string[];
  };
};

const PaymentSystem: React.FC<PaymentSystemProps> = ({ paySystem }) => {
  const { correspondent, methods } = paySystem;
  console.log("correspondent, methods", correspondent, methods);

  let logo = "";
  if (correspondent === "Stripe") {
    logo = "./svg/S.svg";
  } else if (correspondent === "Coinbase") {
    logo = "./svg/C.svg";
  } else {
    logo = "./svg/user.svg";
  }

  return (
    <Link className="payment-link" to={`/recive/${correspondent}`}>
      <div className="payment-system">
        <div className="payment__info">
          <img className="transaction__img" src={logo} alt="Agent logo" />
          <div className="transaction__agent"> {correspondent} </div>
        </div>
        <ul className="pay-methods">
          {methods.map((method, index) => (
            <li key={index}>
              <img src={method} />
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default PaymentSystem;
