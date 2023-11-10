import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  ChangeEvent,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StatusBar from "../component/status-bar/index";
import ArrowBack from "../component/arrow-back/index";
import Alert from "../component/alert/index";
import Page from "../component/page/index";
import Title from "../component/title/index";
import Input from "../component/input/index";
import { useAuth } from "../container/AuthContext";
import { setUserDataInLocalStorage } from "../component/Utils";
import ArrowBackTitle from "../component/arrow-back-title";
import Notification from "../component/notification";
import TransactionItem from "../component/transaction-item";
import { formatDate } from "../component/Utils";

//Сторінка з детальною інформацією про конкретну транзакцію. В
//сторінці є trainsactionId, який вказує на ідентифікатор
//транзакції, який використовується для отримання та виводи
//інформації про конкретну транзакцію. Перехід на цю сторінку
//здійснюється через натискання на карточку транзакції на
//сторінці  /balance

// type Transaction = {
//   id: number;
//   correspondent: string;
//   timestamp: string;
//   type: string;
//   amount: number;
// };

const TransactionPage: React.FC = () => {
  document.body.classList.add("body-background");

  const { state } = useAuth();
  const userEmail = state.email;
  console.log(userEmail);

  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);

  console.log("transaction:", userEmail, transactionId, transaction);

  useEffect(() => {
    const url = `http://localhost:4000/transaction?email=${userEmail}&id=${transactionId}`;
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
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          console.log("Data fetched:", data);

          console.log(data.transaction);
          //transactions = data.user.transactions;
          setTransaction(data.transaction);
          console.log("45", transaction);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [userEmail]);

  //
  if (!transaction) {
    return <div>Loading...</div>;
  }
  const { id, correspondent, timestamp, type, amount } = transaction;
  console.log(id, correspondent, timestamp, type, amount);

  const date = formatDate(timestamp);

  return (
    <body style={{ backgroundColor: "var(--Grey-BG, #F5F5F7)" }}>
      <Page>
        <StatusBar color="black" />
        <ArrowBackTitle title="Transaction" />
        <div className="transaction-page">
          <div className="transaction-page__amount">+${amount}</div>
          <div className="transaction-page__info">
            <div className="transaction-page__item">
              <div>Date</div>
              <div>{date}</div>
            </div>
            <div className="divider"></div>
            <div className="transaction-page__item">
              <div>Address</div>
              <div>{correspondent}</div>
            </div>
            <div className="divider"></div>
            <div className="transaction-page__item">
              <div>Type</div>
              <div>{type}</div>
            </div>
          </div>
        </div>
      </Page>
    </body>
  );
};

export default TransactionPage;
