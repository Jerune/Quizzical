import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import getQuestions from "../../services/getQuestions";
import React from "react";
import Button from "../../components/Button/Button";

export default function Quiz() {
  const [showResults, setShowResults] = useState(false);
  const [dataIsLoading, setDataLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function updateQuestions() {
      setDataLoading(true);
      let questionsArray = await getQuestions();
      setQuestions(questionsArray);
      setScore(0);
      setDataLoading(false);
    }
    if (!showResults) {
      updateQuestions();
    }
  }, [showResults]);

  if (dataIsLoading) {
    return <h1>Loading your challenge...</h1>;
  }

  const questionElements = questions.map((question, index) => {
    return (
      <Question
        key={index}
        question={question}
        indexId={index}
        showResults={showResults}
        setScore={setScore}
      />
    );
  });

  const buttons = !showResults ? (
    <Button onclick={() => setShowResults(true)} text="Check answers" />
  ) : (
    <Button onclick={() => setShowResults(false)} text="Play again" />
  );

  let resultText = "";
  switch (score) {
    case 0:
      resultText = "You Suck!";
      break;
    case 1:
      resultText = "Not Great Mister!";
      break;
    case 2:
      resultText = "Closer to the bottom that the top!";
      break;
    case 3:
      resultText = "Pretty Good Gumbo!";
      break;
    case 4:
      resultText = "On your way to the top!";
      break;
    case 5:
      resultText = "It's me Superman!";
      break;
    default:
      resultText = "";
  }

  return (
    <div className="quiz">
      <section>
        <h1 className="quiz-title">Quizzical</h1>
        {questionElements}
      </section>
      <footer className="footer">
        {showResults && (
          <p>
            {score} out of {questions.length}: {resultText}
          </p>
        )}
        {buttons}
      </footer>
    </div>
  );
}
