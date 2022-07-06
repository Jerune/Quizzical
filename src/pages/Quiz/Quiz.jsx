import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";

export default function Quiz() {
  const [showResults, setShowResults] = useState(false);
  const [dataIsLoading, setDataLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  console.log(score);

  useEffect(() => {
    !showResults && getQuestions();
  }, [showResults]);

  // Functions
  async function getQuestions() {
    setDataLoading(true);
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple"
      );
      const questionsArray = await response.json();
      setQuestions(questionsArray.results);
    } catch (err) {
      console.log(err);
    }
    setScore(0);
    setDataLoading(false);
  }

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
    <button onClick={() => setShowResults(true)}>Check answers</button>
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
            {score < 3
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
