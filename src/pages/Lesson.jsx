import "./Lesson.css";

import { useBook } from "../hooks/useBook";

import EmptyState from "../components/feedback/EmptyState/EmptyState";
import QuizCard from "../features/lesson/QuizCard/QuizCard";

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

        {currentTopic.quiz.map((question, index) => (
          <QuizCard key={index} question={question} index={index} />
        ))}
      </section>

      <section className="lesson-section">
        <h2>🤖 AI Tutor</h2>
        <p>Coming soon...</p>
      </section>
    </div>
  );
}

export default Lesson;
