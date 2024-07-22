import React from "react";
import "./Button.css";

interface ButtonProps {
  text: string;
  size?: "small-button" | "large-button";
  color?: "primary-button" | "secondary-button";
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  text,
  size = "small-button",
  color = "primary-button",
  type = "button",
  onClick = () => {},
}) => {
  const buttonClass = `button ${size} ${color}`;
  const dataTestId = `${size} ${color} ${type}`;

  return (
    <button
      data-testid={dataTestId}
      className={buttonClass}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
