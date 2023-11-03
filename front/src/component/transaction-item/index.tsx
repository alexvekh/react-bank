import "./index.css";
import React from "react";
import { Link } from "react-router-dom";

type TransactionProps = {
  // status: "yellow" | "red";
  // text: string;
};

const TransactionItem: React.FC<TransactionProps> = () => {
  //let src = "";
  //let color = "";

  return (
    <Link className="balance__transaction" to="/signup">
      <div className="transaction">
        <div className="transaction__info">
          <img
            className="transaction__img"
            src="./svg/send.svg"
            alt="Agent logo"
          />
          <div className="transaction__data">
            <div className="transaction__agent-name">Stripe</div>
            <div className="transaction__details">
              <div className="transaction__time">12:25</div>
              <div className="transaction__type">Receipt</div>
            </div>
          </div>
        </div>
        <div className="transaction__amount plus">
          {/* <span className="prefix">+$</span> */}
          <span className="doll">120</span>
          <span className="cents">.00</span>
        </div>
      </div>
    </Link>
  );
};

export default TransactionItem;
