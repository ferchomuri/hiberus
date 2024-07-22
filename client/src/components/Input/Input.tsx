import React from "react";
import "./Input.css";

interface InputProps {
  placeholder: string;
  type: string;
  width?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: Function;
  validation?: object;
  name?: string;
  error?: any;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  width = "800px",
  value,
  onChange,
  register = () => {},
  validation,
  name,
  error,
}) => {
  const inputClass = `input ${error ? "error-input" : ""}`;
  const inputStyle = { width };

  return (
    <>
      <input
        name={name}
        className={inputClass}
        style={inputStyle}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        {...register(name, validation)}
      />
      {error && <span className='error-message'>{`Error en ${name}`}</span>}
    </>
  );
};

export default Input;
