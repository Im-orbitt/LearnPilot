import "./Lesson.css";

import { useBook } from "../hooks/useBook";
import { useNavigate } from "react-router-dom";

import EmptyState from "../components/feedback/EmptyState/EmptyState";

function Lesson() {
  const { currentTopic } = useBook();
  const navigate = useNavigate();

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
        <p>Choose how you want to study this topic.</p>
      </header>

      <section className="lesson-section">
        <h2>📚 Study Overview</h2>

        <p>
          Review your notes, test your knowledge, or ask the AI Tutor for help
          with this topic.
        </p>

        <div className="lesson-actions">
          <button onClick={() => navigate("/app/lesson/notes")}>
            📚 Study Notes
          </button>

          <button onClick={() => navigate("/app/lesson/quiz")}>
            🧠 Take Quiz
          </button>

          <button onClick={() => navigate("/app/lesson/tutor")}>
            🤖 Ask AI Tutor
          </button>
        </div>
      </section>

      <section className="lesson-section">
        <h2>What you'll learn</h2>

        <p>
          This topic contains {currentTopic.notes?.length || 0} characters of
          generated notes.
        </p>
      </section>
    </div>
  );
}

export default Lesson;
