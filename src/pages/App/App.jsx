import { useState } from "react";
import Home from "../Home/Home";
import Quiz from "../Quiz/Quiz";

export default function App() {
  const [isHomescreen, setHomeScreen] = useState(true);

  return (
    <main className="main">
      {isHomescreen ? <Home onHome={setHomeScreen} /> : <Quiz />}
    </main>
  );
}
