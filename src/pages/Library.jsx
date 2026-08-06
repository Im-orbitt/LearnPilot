import { Link } from "react-router-dom";
import { useBook } from "../hooks/useBook";

function Library() {
  const { book, setBook } = useBook();

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
  }

  return (
    <>
      <h1>Library</h1>

      <input type="file" accept=".pdf" onChange={handleUpload} />

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
        <button>Open Chapter</button>
      </Link>
    </>
  );
}

export default Library;
