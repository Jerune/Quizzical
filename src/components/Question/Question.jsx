export default function Question({ data }) {
  return (
    <div>
      <h2>{data.question}</h2>
      <ul>
        <li>{data.correct_answer}</li>
      </ul>
    </div>
  );
}
