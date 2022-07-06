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

  const quizAnswers = allQuestions.map((answer, index) => {
    return (
      <input
        type="radio"
        value={answer.reply}
        key={`answers_${index}`}
        name={`answers_${id}`}
      />
    );
  });

  return (
    <div className="question">
      <h2>{data.question}</h2>
      {quizAnswers}
    </div>
  );
}
