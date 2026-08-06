import { Link } from "react-router-dom";

import { useBook } from "../hooks/useBook";

function Chapter() {
  const { book, setCurrentTopic } = useBook();

  if (!book) {
    return <p>No chapter loaded.</p>;
  }

  return (
    <>
      <h1>{book.chapter.title}</h1>

      <ul>
        {book.chapter.topics.map((topic) => (
          <li key={topic.title}>
            <Link to="/app/lesson" onClick={() => setCurrentTopic(topic)}>
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Chapter;
