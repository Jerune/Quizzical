import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import getQuestions from "../../components/getQuestions/getQuestions";
import React from "react";

export default function Quiz() {
  const [showResults, setShowResults] = useState(false);
  const [dataHasLoaded, setDataHasLoaded] = useState(false);
  const [dataIsLoading, setDataLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  console.log("score:", score);

  useEffect(() => {
    async function updateQuestions() {
      setDataLoading(true);
      let questionsArray = await getQuestions();
      console.log(questionsArray);
      setQuestions(questionsArray);
      setScore(0);
      setDataLoading(false);
    }
    if (!showResults && !dataHasLoaded) {
      console.log(dataHasLoaded);
      setDataHasLoaded(true);
      updateQuestions();
    }
  }, [dataHasLoaded, showResults]);

  // Conditionals

  if (dataIsLoading) {
    return <h1>Loading your challenge...</h1>;
  }

  let questionElements = [];
  if (questions.length > 0) {
    questionElements = questions.map((question, index) => {
      return (
        <Question
          key={index}
          question={questions[index]}
          indexId={index}
          showResults={showResults}
          setScore={setScore}
        />
      );
    });
  }

  const buttons = !showResults ? (
    <button
      onClick={() => {
        setShowResults(true);
        setDataHasLoaded(false);
      }}
    >
      Check answers
    </button>
  ) : (
    <button onClick={() => setShowResults(false)}>Play again</button>
  );

  return (
    <div className="quiz">
      {questionElements}
      <div className="footer">
        {showResults && (
          <p>
            {score} out of {questions.length}:{" "}
            {score < 4
              ? "You Suck!"
              : score === 4
              ? "Almost There!"
              : "Super Hero!"}
          </p>
        )}
        {buttons}
      </div>
    </div>
  );
}
