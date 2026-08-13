import "./UploadSection.css";

import Spinner from "../../../components/ui/Spinner/Spinner";
import FileUpload from "../../../components/ui/FileUpload/FileUpload";

export default function UploadSection({ uploading, success, error, onUpload }) {
  return (
    <section className="upload-card">
      <div className="upload-card-content">
        <p className="upload-eyebrow">Build your study space</p>

        <h2>Upload a textbook chapter</h2>

        <p className="upload-description">
          Drop in a PDF and LearnPilot will turn it into structured topics,
          study notes, and quizzes.
        </p>

        <FileUpload onChange={onUpload} disabled={uploading} />
      </div>

      {uploading && (
        <div className="upload-status">
          <Spinner />
          <p>Generating your chapter...</p>
        </div>
      )}

      {success && (
        <p className="upload-success" role="status">
          {success}
        </p>
      )}

      {error && (
        <p className="upload-error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
