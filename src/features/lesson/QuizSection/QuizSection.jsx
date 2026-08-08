import QuizSession from "../QuizSession/QuizSession";

export default function QuizSection({ quiz }) {
  return (
    <section className="lesson-section">
      <h2>🧠 Quiz</h2>

      {quiz?.length ? (
        <QuizSession quiz={quiz} />
      ) : (
        <p>No quiz questions available yet.</p>
      )}
    </section>
  );
}
