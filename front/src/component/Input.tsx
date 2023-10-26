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
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  label,
  labelClassName,
  borderClassName,
  name,
  type,
  value,
  onChange,
  onBlur,
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
          onBlur={onBlur}
        />
      </label>
    </div>
  );
};

export default Input;
