import FileUpload from "../../../components/ui/FileUpload/FileUpload";
import Spinner from "../../../components/ui/Spinner/Spinner";

import "./UploadSection.css";

export default function UploadSection({ uploading, success, error, onUpload }) {
  return (
    <div className="upload-card">
      <FileUpload onChange={onUpload} disabled={uploading} />

      {uploading && (
        <div className="upload-status">
          <Spinner />
          <p>Generating chapter...</p>
        </div>
      )}

      {success && <p className="upload-success">{success}</p>}
      {error && <p className="upload-error">{error}</p>}
    </div>
  );
}
