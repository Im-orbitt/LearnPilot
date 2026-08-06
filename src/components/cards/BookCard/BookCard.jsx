import "./BookCard.css";
import Button from "../../ui/Button/Button";

function BookCard({ chapter, onOpen }) {
  return (
    <div className="book-card">
      <h2>{chapter.title}</h2>

      <p>{chapter.summary}</p>

      <p>{chapter.topics.length} Topics</p>

      <Button onClick={onOpen}>Open Chapter</Button>
    </div>
  );
}

export default BookCard;
