import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatusBar from "../component/status-bar/index";
import ArrowBack from "../component/arrow-back/index";
import Alert from "../component/alert/index";
import Page from "../component/page/index";

import { useAuth } from "../container/AuthContext";
import ArrowBackTitle from "../component/arrow-back-title";
import NotificationItem from "../component/notification";

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
  console.log("notifications 3:", notifications);

  useEffect(() => {
    // Back-end log is running witout useEffect
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
          setNotifications(data.user.notifications); // All the time tefreshing back-end
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [userEmail]);

  return (
    <body style={{ backgroundColor: "var(--Grey-BG, #F5F5F7)" }}>
      <Page>
        <StatusBar color="black" />
        <ArrowBackTitle title="Notifications" />
        <div className="notifications">
          <ul>
            {notifications.reverse().map((notification, index) => (
              <li key={index}>
                <NotificationItem notification={notification} />
              </li>
            ))}
          </ul>
        </div>
      </Page>
    </body>
  );
};

export default NotificationsPage;
