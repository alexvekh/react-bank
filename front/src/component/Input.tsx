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

const Input: React.FC<InputProps> = ({
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
          type={type}
          value={value}
          onChange={onChange}
        />
        {notice}
      </label>
    </div>
  );
};

export default Input;
