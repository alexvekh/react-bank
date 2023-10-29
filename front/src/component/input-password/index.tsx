import "./index.css";
import React, { ChangeEvent, useState } from "react";

type InputProps = {
  label: string;
  labelClassName: string;
  borderClassName: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  notice?: string;
};

const InputPassword: React.FC<InputProps> = ({
  label,
  labelClassName,
  borderClassName,
  name,
  type,
  value,
  onChange,
  notice,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={labelClassName}>
      <label>
        {label}: <br />
        <div className="field__wrapper">
        <input
          className={borderClassName}
          name={name}
          type={isPasswordVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
        />
        <span
          className={
            isPasswordVisible ? "field__icon--show" : "field__icon--hide"
          }
          onClick={togglePasswordVisibility}
        ></span>
        </div>
        {notice}
      </label>
    </div>
  );
};

export default InputPassword;
