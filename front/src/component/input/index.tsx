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
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  notice?: string;
  autoFocus?: boolean;
};

const Input: React.FC<InputProps> = ({
  label,
  labelClassName,
  borderClassName,
  name,
  type,
  value,
  onChange,
  notice,
  autoFocus,
}) => {
  return (
    <div className={labelClassName}>
      <label>
        {label}: <br />
        <input
          className={borderClassName}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoFocus
        />
        {notice}
      </label>
    </div>
  );
};

export default Input;
