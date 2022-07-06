import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";

export default function Quiz() {
  const [isActive, setActiveState] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [dataIsLoading, setDataLoading] = useState(false);

  console.log(questions);

  useEffect(() => {
    questions.length === 0 && getQuestions();
    !isActive && getQuestions();
  }, [questions, isActive]);

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

  if (dataIsLoading) {
    return <h1>Loading your challenge...</h1>;
  }

  let questionElements = [];
  if (questions.length > 0) {
    questionElements = questions.map((question, index) => {
      return <Question key={index} data={question} />;
    });
  }

  return <div>{questionElements}</div>;
}
