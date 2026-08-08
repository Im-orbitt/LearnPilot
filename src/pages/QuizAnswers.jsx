import { useBook } from "../hooks/useBook";

import EmptyState from "../components/feedback/EmptyState/EmptyState";

function QuizAnswers() {
  const { currentTopic } = useBook();

  if (!currentTopic) {
    return (
      <EmptyState
        title="No topic selected"
        message="Choose a topic from the Chapter page."
      />
    );
  }

  return (
    <div className="lesson-page">
      <h1>{currentTopic.title} — Correct Answers</h1>

      <section className="lesson-section">
        {currentTopic.quiz.map((question, index) => (
          <div key={index}>
            <h3>
              {index + 1}. {question.question}
            </h3>

            <p>
              <strong>{question.answer}</strong>
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default QuizAnswers;
