import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.css";
import App from "../src/pages/App/App.js";

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
