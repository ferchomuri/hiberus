import React from "react";
import "./Rating.css";

interface RatingProps {
  value: number;
  onClick?: Function;
}

const Rating: React.FC<RatingProps> = ({ value, onClick }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;
    return (
      <span
        key={i + "start"}
        className={starValue <= value ? "star active" : "star"}
        onClick={onClick ? () => onClick(starValue) : undefined}
      >
        ★
      </span>
    );
  });

  return <div className='rating'>{stars}</div>;
};

export default Rating;
