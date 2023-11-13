import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatusBar from "../component/status-bar";
import TransactionItem from "../component/transaction-item";
import { useAuth } from "../container/AuthContext";
import AmountSplitter from "../component/AmountSplitter";

//На цій сторінці ми створюємо верстку та розміщуємо дві
//кнопки-посилання на сторінку /signup та сторінку /signin

type Transaction = {
  id: number;
  correspondent: string;
  timestamp: string;
  type: string;
  amount: number;
};

const BalancePage: React.FC = () => {
  const { state, dispatch } = useAuth();
  const userEmail = state.email;
  console.log(userEmail);

  const [balance, setBalance] = useState<number>(0);
  const { dollars: balanceDoll, cents: balanceCents } =
    AmountSplitter.splitAmount(balance);

  const [transactions, setTransactions] = useState<Transaction[]>([]); // All the time tefreshing back-end

  useEffect(() => {
    const url = `http://localhost:4000/balance?email=${userEmail}`;
    try {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); // Parse the JSON response
          } else {
            dispatch({ type: "LOGOUT" });
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          console.log("Data fetched:", data);
          setBalance(data.user.balance);
          setTransactions(data.user.transactions);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [userEmail]);

  return (
    <div className="balance-page">
      <div className="balance-control">
        <StatusBar color="white" />
        <div className="balance__settings">
          <div className="balance__nav-button">
            <Link to="/settings">
              <img src="./svg/settings.svg" alt="settings-button" />
            </Link>
          </div>
          <h1 className="balance__title">Main wallet</h1>
          <div className="balance__nav-button">
            <Link to="/notifications">
              <img src="./svg/bell.svg" alt="notifications button" />
            </Link>
          </div>
        </div>
        <div className="balance__count">
          <span>$</span>
          <span>{balanceDoll}</span>
          <span className="balance-cents">{balanceCents}</span>
        </div>
        <div className="balance__actions">
          <Link className="balance-link" to="/recive">
            <div className="balance__button">
              <div className="balance__button-icon">
                <img src="./svg/recive.svg" alt="receive-button" />
              </div>
              <p className="balance__button-text">Receive</p>
            </div>
          </Link>

          <Link className="balance-link" to="/send">
            <div className="balance__button">
              <div className="balance__button-icon">
                <img src="./svg/send.svg" alt="send button" />
              </div>
              <p className="balance__button-text">Send</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="balance__transactions">
        <ul>
          {transactions.reverse().map((transaction) => (
            <li key={transaction.id}>
              <TransactionItem transaction={transaction} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BalancePage;
