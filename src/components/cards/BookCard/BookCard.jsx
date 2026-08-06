import "./BookCard.css";

function BookCard({ chapter }) {
  return (
    <div className="book-card">
      <h2>{chapter.title}</h2>

      <p>{chapter.summary}</p>

      <div className="book-meta">
        <span>{chapter.topics.length} Topics</span>
      </div>
    </div>
  );
}

export default BookCard;
