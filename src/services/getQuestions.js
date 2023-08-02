export default async function getQuestions() {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple"
    );
    const questionsArray = await response.json();
    return questionsArray.results;
  } catch (err) {
    console.log(err);
  }
}
