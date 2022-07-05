export default function Home({ onHome }) {
  return (
    <main className="main">
      <h1>Quizzical</h1>
      <p>Dare you answer or do you fail?</p>
      <button onClick={() => onHome(false)}>Risk your life</button>
    </main>
  );
}
