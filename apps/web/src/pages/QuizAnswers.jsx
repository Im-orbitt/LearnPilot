import { useBook } from "../hooks/useBook";
import EmptyState from "../components/feedback/EmptyState/EmptyState";

import QuizReview from "../features/lesson/QuizReview/QuizReview";

function QuizAnswers() {
  const { currentTopic, quizAnswers } = useBook();

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
      <header className="lesson-header">
        <span className="lesson-eyebrow">QUIZ REVIEW</span>

        <h1>{currentTopic.title}</h1>

        <p>Review the correct answers from your quiz.</p>
      </header>

      <section className="lesson-section">
        <QuizReview quiz={currentTopic.quiz} answers={quizAnswers} />
      </section>
    </div>
  );
}

export default QuizAnswers;
