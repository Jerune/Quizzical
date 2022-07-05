export default function Home({ onHome }) {
  return (
    <>
      <h1>Quizzical</h1>
      <p>Dare you answer or do you fail?</p>
      <button className="buttonHome" onClick={() => onHome(false)}>
        I'm a Daredevil
      </button>
    </>
  );
}
