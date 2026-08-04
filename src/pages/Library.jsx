import { useState } from "react";
import { Link } from "react-router-dom";

function Library() {
  const [book, setBook] = useState(null);

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

    setBook(data);
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
              <li key={topic}>{topic}</li>
            ))}
          </ul>

          <h3>Notes</h3>

          <pre>{book.notes}</pre>
        </>
      )}

      <Link to="/app/subject">
        <button>Open Subject</button>
      </Link>
    </>
  );
}

export default Library;
