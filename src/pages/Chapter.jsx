import "./Chapter.css";

import { useNavigate } from "react-router-dom";

import { useBook } from "../hooks/useBook";

import Button from "../components/ui/Button/Button";
import EmptyState from "../components/feedback/EmptyState/EmptyState";

function Chapter() {
  const { book, setCurrentTopic } = useBook();
  const navigate = useNavigate();

  if (!book) {
    return (
      <EmptyState
        title="No chapter loaded"
        message="Upload a PDF from the Library first."
      />
    );
  }

  function openTopic(topic) {
    setCurrentTopic(topic);
    navigate("/app/lesson");
  }

  return (
    <div className="chapter-page">
      <div className="chapter-header">
        <h1>{book.chapter.title}</h1>
        <p>{book.chapter.summary}</p>
      </div>

      <div className="topics-grid">
        {book.chapter.topics.map((topic) => (
          <div className="topic-card" key={topic.title}>
            <h3>{topic.title}</h3>

            <Button onClick={() => openTopic(topic)}>Study Topic</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chapter;
