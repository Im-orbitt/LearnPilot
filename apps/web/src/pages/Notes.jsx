import "./Notes.css";

import { useBook } from "../hooks/useBook";
import { useNavigate } from "react-router-dom";

import EmptyState from "../components/feedback/EmptyState/EmptyState";
import Button from "../components/ui/Button/Button";

import ReactMarkdown from "react-markdown";
import { createMarkdownComponents } from "../utils/markdown";

function Notes() {
  const { currentTopic, setLessonProgress } = useBook();
  const navigate = useNavigate();

  if (!currentTopic) {
    return (
      <EmptyState
        title="No topic selected"
        message="Choose a topic from the Chapter page."
      />
    );
  }

  function handleFinish() {
    setLessonProgress((previous) => ({
      ...previous,
      notesCompleted: true,
    }));

    navigate("/app/lesson");
  }

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <span className="lesson-eyebrow">STEP 01 · REVIEW</span>

        <h1>{currentTopic.title}</h1>

        <p>Read through the notes and learn the key ideas.</p>
      </header>

      <section className="lesson-section">
        <div className="notes-content">
          <ReactMarkdown components={createMarkdownComponents()}>
            {currentTopic.notes}
          </ReactMarkdown>
        </div>
      </section>

      <Button onClick={handleFinish}>Finish Notes</Button>
    </div>
  );
}

export default Notes;
