import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  ChangeEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import StatusBar from "../component/status-bar/index";
import ArrowBack from "../component/arrow-back/index";
import Alert from "../component/alert/index";
import Page from "../component/page/index";
import Title from "../component/title/index";
import Input from "../component/input/index";
import { useAuth } from "../container/AuthContext";
import { setUserDataInLocalStorage } from "../component/Utils";
import ArrowBackTitle from "../component/arrow-back-title";

// Сторінка списку нотифікацій, який створюються при діях: Вхід
//в акаунт Відновлення акаунту Зміна пароля Зміна пошти
// Поповнення Переказ

type Notification = {
  message: string;
  type: string;
  time: string;
};

const NotificationsPage: React.FC = () => {
  document.body.classList.add("body-background");

  const { state } = useAuth();
  const userEmail = state.email;
  console.log(userEmail);

  const [notifications, setNotifications] = useState<Notification[]>([]); // All the time tefreshing back-end
  //let transactions: Transaction[] = [];
  console.log("notifications 3:", notifications);

  useEffect(() => {
    const url = `http://localhost:4000/notifications?email=${userEmail}`;
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

          console.log(data.user.notifications);
          //transactions = data.user.transactions;
          setNotifications(data.user.notifications); // All the time tefreshing back-end
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [userEmail]);

  // const [code, setCode] = useState<string>("");
  // const [alert, setAlert] = useState<string>("");
  // const { state, dispatch } = useAuth();
  //const { state, dispatch } = useContext(AuthContext);

  //const [state, dispatch] = useReducer(authReducer, initialAuthState);

  //const navigate = useNavigate();

  return (
    <body style={{ backgroundColor: "var(--Grey-BG, #F5F5F7)" }}>
      <Page>
        <StatusBar color="black" />
        <ArrowBackTitle title="Notifications" />
        <div className="balance__transactions">
          <ul>
            {/* {notifications.map((notification) => (
              <li key={notification.id}>
                <Notification notification={notification} />
              </li>
            ))} */}

            <li>
              <div style={{ backgroundColor: "white", height: "40px" }}>
                dddd ddddd dddddddd
              </div>
            </li>
          </ul>
        </div>
      </Page>
    </body>
  );
};

export default NotificationsPage;
