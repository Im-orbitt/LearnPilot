import { useState } from "react";
import { Link } from "react-router-dom";

function Library() {
  const [text, setText] = useState("");

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

    setText(data.text);
  }

  return (
    <>
      <h1>Library</h1>

      <input type="file" accept=".pdf" onChange={handleUpload} />

      <p>No books uploaded.</p>

      <pre>{text}</pre>

      <Link to="/app/subject">
        <button>Open Subject</button>
      </Link>
    </>
  );
}

export default Library;
