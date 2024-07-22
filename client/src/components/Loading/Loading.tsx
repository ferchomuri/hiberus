import React from "react";
import "./Loading.css";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div>
      <div data-testid='loader' className='loader'></div>
    </div>
  );
};

export default Loading;
