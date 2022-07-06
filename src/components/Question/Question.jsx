// @ts-nocheck
import { nanoid } from "nanoid";
import { useState } from "react";

export default function Question({ question, indexId, showResults }) {
  const [quizData, setQuizData] = useState([]);

  console.log(quizData);

  if (quizData.length === 0) {
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
  }

  function fixText(text) {
    return text
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&");
  }

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
