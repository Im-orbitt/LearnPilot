import "./Lesson.css";

import { useBook } from "../hooks/useBook";

import EmptyState from "../components/feedback/EmptyState/EmptyState";
import QuizSession from "../features/lesson/QuizSession/QuizSession";

function Lesson() {
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
      <header className="lesson-header">
        <h1>{currentTopic.title}</h1>
      </header>

      <section className="lesson-section">
        <h2>📝 Notes</h2>

        <pre>{currentTopic.notes}</pre>
      </section>

      <section className="lesson-section">
        <h2>🧠 Quiz</h2>

        <QuizSession quiz={currentTopic.quiz} />
      </section>

      <section className="lesson-section">
        <h2>🤖 AI Tutor</h2>
        <p>Coming soon...</p>
      </section>
    </div>
  );
}

export default Lesson;
