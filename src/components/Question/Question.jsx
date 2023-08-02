// @ts-nocheck
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import fixText from "../../utils/fixText";

export default function Question({ question, indexId, showResults, setScore }) {
  const [quizData, setQuizData] = useState([]);
  const [validAnswer, setValidAnswer] = useState(false);

  useEffect(() => {
    const answersArray = [];
    question.incorrect_answers.map((answer) => {
      return answersArray.push({
        reply: answer,
        isCorrect: false,
        id: nanoid(),
      });
    });
    answersArray.push({
      reply: question.correct_answer,
      isCorrect: true,
      id: nanoid(),
    });
    const sortedArray = answersArray.sort(() => Math.random() - 0.5);
    setQuizData(sortedArray);
  }, [question]);

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    quizData.map((answer) => {
      if (answer.isChosen && answer.isCorrect && !validAnswer) {
        setScore((prevState) => prevState + 1);
        setValidAnswer(true);
      } else if (answer.isChosen && !answer.isCorrect && validAnswer) {
        setScore((prevState) => prevState - 1);
        setValidAnswer(false);
      }
    });
  }, [quizData, setScore, validAnswer]);

  function handleChange(id) {
    setQuizData((prevState) =>
      prevState.map((answer) =>
        answer.id === id
          ? { ...answer, isChosen: true }
          : { ...answer, isChosen: false }
      )
    );
  }

  const quizAnswers = quizData.map((answer, index) => {
    let styles = "";
    if (showResults) {
      styles = answer.isCorrect
        ? "correct"
        : answer.isChosen && !answer.isCorrect
        ? "incorrect"
        : null;
    }
    return (
      <div
        className={`answer ${
          showResults && !answer.isCorrect ? "lighten" : ""
        }`}
        key={`answers_question_${indexId}_${index}`}
      >
        <input
          className="question_answers_input"
          type="radio"
          value={answer.reply}
          name={`answers_question_${indexId}`}
          id={`answers_id_${answer.id}`}
          onChange={() => handleChange(answer.id)}
          disabled={showResults ? true : false}
        />
        <label
          className={`question_answers_label ${styles}`}
          htmlFor={`answers_id_${answer.id}`}
        >
          {fixText(answer.reply)}
        </label>
      </div>
    );
  });

  return (
    <div className="question">
      <h2>{fixText(question.question)}</h2>
      <div className="question_answers">{quizAnswers}</div>
    </div>
  );
}
