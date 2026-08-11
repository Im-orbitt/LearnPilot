import "./Library.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBook } from "../hooks/useBook";

import { uploadPdf } from "../services/api";

import EmptyState from "../components/feedback/EmptyState/EmptyState";
import BookCard from "../features/library/BookCard/BookCard";
import UploadSection from "../features/library/UploadSection/UploadSection";

function Library() {
  const { books, setBook, refreshBooks } = useBook();

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

      await refreshBooks();
      setBook(data.book.chapter);

      setSuccess("Chapter generated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="library-page">
      <UploadSection
        uploading={uploading}
        success={success}
        error={error}
        onUpload={handleUpload}
      />

      {books.length === 0 && !uploading && (
        <EmptyState
          title="No books yet"
          message="Upload your first PDF to get started."
        />
      )}

      {books.length > 0 && (
        <div className="library-books">
          {books.map((item) => (
            <BookCard
              key={item.id}
              chapter={item.chapter}
              onOpen={() => {
                setBook(item.chapter);
                navigate("/app/chapter");
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;
