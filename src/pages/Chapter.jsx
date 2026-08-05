import { Link } from "react-router-dom";

import { getBook } from "../data/book";
import { setCurrentTopic } from "../data/currentTopic";

function Chapter() {
  const book = getBook();

  if (!book) {
    return <p>No chapter loaded.</p>;
  }

  return (
    <>
      <h1>{book.chapter.title}</h1>

      <ul>
        {book.chapter.topics.map((topic) => (
          <li key={topic}>
            <Link to="/app/lesson" onClick={() => setCurrentTopic(topic)}>
              {topic}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Chapter;
