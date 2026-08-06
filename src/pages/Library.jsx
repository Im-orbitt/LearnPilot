import { useState } from "react";
import { Link } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import { uploadPdf } from "../services/api";

function Library() {
  const { book, setBook } = useBook();

  const [uploading, setUploading] = useState(false);

  async function handleUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    setUploading(true);

    try {
      const data = await uploadPdf(file);
      setBook(data);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <h1>Library</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        disabled={uploading}
      />

      {uploading && <p>Generating chapter...</p>}

      {!book && <p>No books uploaded.</p>}

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
        </>
      )}

      <Link to="/app/chapter">
        <button disabled={!book}>Open Chapter</button>
      </Link>
    </>
  );
}

export default Library;
