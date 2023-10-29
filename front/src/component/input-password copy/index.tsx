import "./index.css";
import { type } from "os";
import React, { ChangeEvent } from "react";

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

const togglePassword = (input: HTMLInputElement) => {
  const type = input.getAttribute("type");
  if (type === "password") {
    input.setAttribute("type", "text");
  } else {
    input.setAttribute("type", "password");
  }
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
  return (
    <div className={labelClassName}>
      <label>
        {label}: <br />
        <input
          className={borderClassName}
          name={name}
          type="password"
          value={value}
          onChange={onChange}
        />
        <span
          className="field__icon"
          // onClick={() => togglePassword(type)}
        ></span>
        {notice}
      </label>
    </div>
  );
};

export default InputPassword;
