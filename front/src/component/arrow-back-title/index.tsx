import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

type TitleProps = {
  title: String;
};

const ArrowBackTitle: React.FC<TitleProps> = ({ title }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1); // Navigates one step back in the history
  };

  return (
    <div className="arrow-title">
      <button onClick={handleNavigate}>
        <img src="./../svg/back.svg" alt="Status bare" className="arrow-back" />
      </button>
      <h1 className="page__title">{title}</h1>
      <div className="arrow-title__space"></div>
    </div>
  );
};

export default ArrowBackTitle;
