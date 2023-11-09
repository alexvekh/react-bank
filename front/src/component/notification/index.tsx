import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import { formatTimestamp } from "../Utils";

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

  const timeAgo: string = formatTimestamp(time);

  let logo = "";
  if (type === "Announcement") {
    logo = "./svg/S.svg";
  } else if (type === "Warning") {
    logo = "./svg/C.svg";
  } else {
    logo = "./svg/user.svg";
  }

  //'Announcement' || 'Warning'
  // const date = new Date(timestamp);
  // const hours = date.getHours().toString().padStart(2, "0");
  // const minutes = date.getMinutes().toString().padStart(2, "0");
  // const date2 = `${hours}:${minutes}`;

  return (
    <div className="transaction">
      <div className="transaction__info">
        <img className="transaction__img" src={logo} alt="Agent logo" />
        <div className="transaction__data">
          <div className="transaction__agent-name">{message}</div>
          <div className="transaction__details">
            <div className="transaction__time">{timeAgo}</div>
            <div className="transaction__type">{type}</div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Notification;
