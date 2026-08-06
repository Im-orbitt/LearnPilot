import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBook } from "../hooks/useBook";

import { uploadPdf } from "../services/api";

import Spinner from "../components/ui/Spinner/Spinner";
import EmptyState from "../components/feedback/EmptyState/EmptyState";
import BookCard from "../components/cards/BookCard/BookCard";

function Library() {
  const { book, setBook } = useBook();

  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    setError("");
    setSuccess("");
    setUploading(true);

    try {
      const data = await uploadPdf(file);

      setBook(data);
      setSuccess("Chapter generated successfully!");
    } catch (err) {
      setError(err.message);
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

      {uploading && (
        <>
          <Spinner />
          <p>Generating chapter...</p>
        </>
      )}

      {success && <p>{success}</p>}

      {error && <p>{error}</p>}

      {!book && !uploading && (
        <EmptyState
          title="No books yet"
          message="Upload a PDF to generate notes, quizzes and AI lessons."
        />
      )}

      {book && <BookCard book={book} onOpen={() => navigate("/app/chapter")} />}
    </>
  );
}

export default Library;
