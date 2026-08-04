import { useState } from "react";
import { Link } from "react-router-dom";

import { getBook, setBook as saveBook } from "../data/book";

function Library() {
  const [book, setBook] = useState(getBook());

  async function handleUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log(data);

    setBook(data); // updates this page
    saveBook(data); // saves it globally
  }

  return (
    <>
      <h1>Library</h1>

      <input type="file" accept=".pdf" onChange={handleUpload} />

      <p>No books uploaded.</p>

      {book && (
        <>
          <h2>{book.chapter.title}</h2>

          <p>{book.chapter.summary}</p>

          <h3>Topics</h3>

          <ul>
            {book.chapter.topics.map((topic) => (
              <li key={topic.title}>{topic.title}</li>
            ))}
          </ul>

          <h3>Notes</h3>

          {book.notes.topics.map((topic) => (
            <div key={topic.title}>
              <h4>{topic.title}</h4>
              <pre>{topic.notes}</pre>
            </div>
          ))}
        </>
      )}

      <Link to="/app/chapter">
        <button>Open Chapter</button>
      </Link>
    </>
  );
}

export default Library;
