import "./BookCard.css";

import Card from "../../ui/Card/Card";
import Button from "../../ui/Button/Button";

function BookCard({ book, onOpen }) {
  return (
    <Card className="book-card">
      <h2>{book.filename}</h2>

      <h3>{book.chapter.title}</h3>

      <p>{book.chapter.summary}</p>

      <Button onClick={onOpen}>Open Chapter</Button>
    </Card>
  );
}

export default BookCard;
