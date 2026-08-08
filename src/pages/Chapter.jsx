import "./Chapter.css";

import { useNavigate } from "react-router-dom";

import { useBook } from "../hooks/useBook";

import EmptyState from "../components/feedback/EmptyState/EmptyState";
import TopicCard from "../features/chapter/TopicCard/TopicCard";

function Chapter() {
  const { book, setCurrentTopicIndex } = useBook();
  const navigate = useNavigate();

  if (!book) {
    return (
      <EmptyState
        title="No chapter loaded"
        message="Upload a PDF from the Library first."
      />
    );
  }

  function openTopic(index) {
    setCurrentTopicIndex(index);
    navigate("/app/lesson");
  }

  return (
    <div className="chapter-page">
      <div className="chapter-header">
        <h1>{book.chapter.title}</h1>
        <p>{book.chapter.summary}</p>
      </div>

      <div className="topics-grid">
        {book.chapter.topics.map((topic, index) => (
          <TopicCard
            key={topic.title}
            topic={topic}
            onClick={() => openTopic(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Chapter;
