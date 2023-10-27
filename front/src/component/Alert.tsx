import React from "react";

type AlertProps = {
  text: string;
  color: string;
  src: string;
};

const Alert: React.FC<AlertProps> = ({ src, text, color }) => {
  return (
    <div className="alert" style={{ color }}>
      <img src={src} alt="Status bare" />
      {text}
    </div>
  );
};

export default Alert;
