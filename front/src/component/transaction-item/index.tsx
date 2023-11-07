import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import AmountSplitter from "../AmountSplitter";

type TransactionProps = {
  transaction: {
    id: number;
    correspondent: string;
    timestamp: Date;
    type: string;
    amount: number;
  };
};

const TransactionItem: React.FC<TransactionProps> = ({ transaction }) => {
  const { id, correspondent, timestamp, type, amount } = transaction;
  const { dollars: amountDoll, cents: amountCents } =
    AmountSplitter.splitAmount(amount);
  const stringData = type.toString();

  return (
    <Link className="balance__transaction" to={`/transaction/${id}`}>
      <div className="transaction">
        <div className="transaction__info">
          <img
            className="transaction__img"
            src="./svg/send.svg"
            alt="Agent logo"
          />
          <div className="transaction__data">
            <div className="transaction__agent-name">{correspondent}</div>
            <div className="transaction__details">
              <div className="transaction__time">{stringData}</div>
              <div className="transaction__type">{type}</div>
            </div>
          </div>
        </div>
        <div className="transaction__amount plus">
          {/* <span className="prefix">+$</span> */}
          <span className="doll">{amountDoll}</span>
          <span className="cents">.{amountCents}</span>
        </div>
      </div>
    </Link>
  );
};

export default TransactionItem;
