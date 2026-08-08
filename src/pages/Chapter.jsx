import "./Chapter.css";

import { BookOpen, Layers } from "lucide-react";
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

  const topics = book.chapter.topics;

  return (
    <div className="chapter-page">
      <section className="chapter-header">
        <div className="chapter-header-icon">
          <BookOpen size={28} />
        </div>

        <div className="chapter-header-content">
          <p className="chapter-eyebrow">Your chapter</p>

          <h1>{book.chapter.title}</h1>

          <p className="chapter-summary">{book.chapter.summary}</p>

          <div className="chapter-meta">
            <span>
              <Layers size={16} />
              {topics.length} topics
            </span>
          </div>
        </div>
      </section>

      <section className="topics-section">
        <div className="topics-heading">
          <div>
            <p className="section-eyebrow">Study plan</p>
            <h2>Topics in this chapter</h2>
          </div>

          <span className="topics-count">
            {topics.length} {topics.length === 1 ? "topic" : "topics"}
          </span>
        </div>

        <div className="topics-grid">
          {topics.map((topic, index) => (
            <TopicCard
              key={topic.title}
              topic={topic}
              index={index}
              onClick={() => openTopic(index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Chapter;
