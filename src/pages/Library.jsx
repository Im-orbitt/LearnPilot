import "./Library.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBook } from "../hooks/useBook";

import { uploadPdf } from "../services/api";

import Spinner from "../components/ui/Spinner/Spinner";
import EmptyState from "../components/feedback/EmptyState/EmptyState";
import BookCard from "../components/cards/BookCard/BookCard";
import FileUpload from "../components/ui/FileUpload/FileUpload";

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
    <div className="library-page">
      <div className="upload-card">
        <FileUpload onChange={handleUpload} disabled={uploading} />

        {uploading && (
          <>
            <Spinner />
            <p>Generating chapter...</p>
          </>
        )}

        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
      </div>

      {!book && !uploading && (
        <EmptyState
          title="No books yet"
          message="Upload your first PDF to get started."
        />
      )}

      {book && (
        <>
          <BookCard
            chapter={book.chapter}
            onOpen={() => navigate("/app/chapter")}
          />
        </>
      )}
    </div>
  );
}

export default Library;
