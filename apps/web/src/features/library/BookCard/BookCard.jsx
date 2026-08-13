import "./BookCard.css";

import { BookOpen } from "lucide-react";

import Button from "../../../components/ui/Button/Button";

function BookCard({ chapter, onOpen }) {
  return (
    <article className="book-card">
      <div className="book-card-icon">
        <BookOpen size={24} />
      </div>

      <div className="book-card-content">
        <p className="book-card-eyebrow">Generated chapter</p>

        <h2>{chapter.title}</h2>

        <p className="book-card-summary">{chapter.summary}</p>

        <div className="book-meta">
          <span>{chapter.topics.length} Topics</span>
          <span>AI Generated</span>
        </div>

        <Button onClick={onOpen}>Open Chapter</Button>
      </div>
    </article>
  );
}

export default BookCard;
