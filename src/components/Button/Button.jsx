import React from "react";

function Button({ text, onclick }) {
  return <button onClick={onclick}>{text}</button>;
}

export default Button;
