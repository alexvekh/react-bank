import "./index.css";
import React from "react";

type StatusBarProps = {
  color: "black" | "white";
};

const StatusBar: React.FC<StatusBarProps> = ({ color }) => {
  let src = "";

  if (color === "black") {
    src = "./../svg/status-bar-black.svg"; // Set source based on color prop
  } else if (color === "white") {
    src = "./../svg/status-bar-white.svg"; // Set source based on color prop
  }

  return <img src={src} alt="Status bar" className="status-bar" />;
};

export default StatusBar;
