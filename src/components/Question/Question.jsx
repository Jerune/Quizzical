import { useState } from "react";

export default function Question({ data, id }) {
  const [allQuestions, setAllQuestions] = useState(() => createAnswers());

  function createAnswers() {
    const answersArray = [];
    data.incorrect_answers.map((answer) => {
      return answersArray.push({ reply: answer, isCorrect: false });
    });
    answersArray.push({ reply: data.correct_answer, isCorrect: true });
    const sortedAnswers = answersArray.sort(() => Math.random() - 0.5);

    return sortedAnswers;
  }

  function fixTitle(text) {
    return text.replace(/&quot/g, "").replace(/&#039;/g, "");
  }

  const quizAnswers = allQuestions.map((answer, index) => {
    return (
      <>
        <input
          className="question_answers_input"
          type="radio"
          value={answer.reply}
          key={`answers_question_${id}_${index}`}
          name={`answers_question_${id}`}
          id={`answers_question_${id}_${index}`}
        />
        <label
          className="question_answers_label"
          for={`answers_question_${id}_${index}`}
        >
          {answer.reply}
        </label>
      </>
    );
  });

  return (
    <div className="question">
      <h2>{fixTitle(data.question)}</h2>
      <div className="question_answers">{quizAnswers}</div>
    </div>
  );
}
