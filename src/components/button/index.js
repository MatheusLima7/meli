import React from "react";

const Button = ({ children, handlerButton = () => {} }) => {
  return <button onClick={handlerButton}>{children}</button>;
};

export default Button;
