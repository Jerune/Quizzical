import { useState } from "react";
import Home from "../Home/Home";
import Quiz from "../Quiz/Quiz";
import bulbTop from "../../assets/yellow-balloon.png";
import bulbBottom from "../../assets/blue-balloon.png";
import React from "react";

export default function App() {
  const [isHomescreen, setHomeScreen] = useState(true);

  return (
    <main className="main">
      {isHomescreen ? <Home onHome={setHomeScreen} /> : <Quiz />}
      <img src={bulbTop} className="bulb top" alt="design-balloon-top" />
      <img
        src={bulbBottom}
        className="bulb bottom"
        alt="design-balloon-bottom"
      />
    </main>
  );
}
