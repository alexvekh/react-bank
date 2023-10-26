import React from "react";

type AlertProps = {
  color: string;
};

const Alert: React.FC<AlertProps> = ({ color }) => {
  return (
    <div className="alert" style={{ color }}>
      <img
        src="./svg/alert-yellow.svg"
        alt="Status bare"
        className="arrow-back"
      />
      A user with the same name is already exist
    </div>
  );
};

export default Alert;
