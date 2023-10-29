import "./index.css";
import React from "react";

type AlertProps = {
  status: "yellow" | "red";
  text: string;
};

const Alert: React.FC<AlertProps> = ({ status, text }) => {
  let src = "";
  let color = "";

  if (status === "yellow") {
    src = "./svg/alert-yellow.svg";
    color = "orange";
  } else if (status === "red") {
    src = "./svg/alert-red.svg";
    color = "red";
  }

  return (
    <div className="alert" style={{ color }}>
      <img src={src} alt="Alert bare" />
      {text}
    </div>
  );
};

export default Alert;
