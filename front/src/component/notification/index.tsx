import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../Utils";

type NotificationProps = {
  notification: {
    message: string;
    type: string;
    time: string;
  };
};

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const { message, type, time } = notification;
  console.log("time", time);

  const timeAgo: string = formatTimeAgo(time);

  let logo = "";
  if (type === "Announcement") {
    logo = "./svg/bell-black.svg";
  } else if (type === "Warning") {
    logo = "./svg/alert-red.svg";
  } else {
    logo = "./svg/user.svg";
  }

  //'Announcement' || 'Warning'
  // const date = new Date(timestamp);
  // const hours = date.getHours().toString().padStart(2, "0");
  // const minutes = date.getMinutes().toString().padStart(2, "0");
  // const date2 = `${hours}:${minutes}`;

  return (
    <div className="notification">
      <div className="notification__info">
        <img className="notification__img" src={logo} alt="Agent logo" />
        <div className="notification__data">
          <div className="notification__name">{message}</div>
          <div className="notification__details">
            <div className="notification__time">{timeAgo}</div>
            <div className="notification__divider">
              <img src="./svg/point.svg" alt="." />
            </div>
            <div className="notification__type">{type}</div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Notification;
