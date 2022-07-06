import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";

export default function Quiz() {
  const [showResults, setShowResults] = useState(false);
  const [dataIsLoading, setDataLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

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
        />
      );
    });
  }

  return (
    <div className="quiz">
      {questionElements}
      <button>Check answers</button>
    </div>
  );
}
