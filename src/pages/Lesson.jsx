import "./Lesson.css";

import { useBook } from "../hooks/useBook";
import { useNavigate } from "react-router-dom";

import Button from "../components/ui/Button/Button";
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

      <section className="lesson-options">
        <div className="lesson-option">
          <h2>📝 Notes</h2>
          <p>Read through your AI-generated notes and review the key ideas.</p>

          <Button onClick={() => navigate("/app/lesson/notes")}>
            Open Notes
          </Button>
        </div>

        <div className="lesson-option">
          <h2>🧠 Quiz</h2>
          <p>Test your understanding with an interactive quiz.</p>

          <Button onClick={() => navigate("/app/lesson/quiz")}>
            Start Quiz
          </Button>
        </div>

        <div className="lesson-option">
          <h2>🤖 AI Tutor</h2>
          <p>Ask the AI tutor questions about this topic.</p>

          <Button onClick={() => navigate("/app/lesson/tutor")}>
            Open AI Tutor
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Lesson;
