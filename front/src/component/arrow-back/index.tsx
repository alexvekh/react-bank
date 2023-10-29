import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ArrowBack: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1); // Navigates one step back in the history
  };

  return (
    <div className="arrow">
      <button onClick={handleNavigate}>
        <img src="./svg/back.svg" alt="Status bare" className="arrow-back" />
      </button>
    </div>
  );
};

export default ArrowBack;
