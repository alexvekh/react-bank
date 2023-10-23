import React from "react";

const Alert: React.FC = () => {
  return (
    <div className="alert">
      <img src="./svg/back.svg" alt="Status bare" className="arrow-back" />A
      user with the same name is already exist
    </div>
  );
};

export default Alert;
