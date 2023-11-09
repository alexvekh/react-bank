import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import AmountSplitter from "../AmountSplitter";
import { formatTimestamp } from "../Utils";

type NotificationProps = {
  notification: {
    id: number;
    correspondent: string;
    timestamp: string;
    type: string;
    amount: number;
  };
};

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const { id, correspondent, timestamp, type, amount } = notification;
  console.log("timestamp", timestamp);
  const { dollars: amountDoll, cents: amountCents } =
    AmountSplitter.splitAmount(amount);
  const time: string = formatTimestamp(timestamp);

  let logo = "";
  if (correspondent === "Stripe") {
    logo = "./svg/S.svg";
  } else if (correspondent === "Coinbase") {
    logo = "./svg/C.svg";
  } else {
    logo = "./svg/user.svg";
  }

  // const date = new Date(timestamp);
  // const hours = date.getHours().toString().padStart(2, "0");
  // const minutes = date.getMinutes().toString().padStart(2, "0");
  // const date2 = `${hours}:${minutes}`;

  return (
    <Link className="balance__transaction" to={`/transaction/${id}`}>
      <div className="transaction">
        <div className="transaction__info">
          <img className="transaction__img" src={logo} alt="Agent logo" />
          <div className="transaction__data">
            <div className="transaction__agent-name">{correspondent}</div>
            <div className="transaction__details">
              <div className="transaction__time">{time}</div>
              <div className="transaction__type">{type}</div>
            </div>
          </div>
        </div>
        <div
          className={`transaction__amount ${
            type === "Sending" ? "minus" : "plus"
          }`}
        >
          {/* <span className="prefix">+$</span> */}
          <span className="doll">{amountDoll}</span>
          <span className="cents">{amountCents}</span>
        </div>
      </div>
    </Link>
  );
};

export default Notification;
