import { useBook } from "../hooks/useBook";
import EmptyState from "../components/feedback/EmptyState/EmptyState";

import QuizSession from "../features/lesson/QuizSession/QuizSession";

function Quiz() {
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
      <h1>{currentTopic.title} — Quiz</h1>

      <section className="lesson-section">
        <QuizSession quiz={currentTopic.quiz} />
      </section>
    </div>
  );
}

export default Quiz;
