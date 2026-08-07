import "./UploadSection.css";

import Spinner from "../../../components/ui/Spinner/Spinner";
import FileUpload from "../../../components/ui/FileUpload/FileUpload";

export default function UploadSection({ uploading, success, error, onUpload }) {
  return (
    <div className="upload-card">
      <FileUpload onChange={onUpload} disabled={uploading} />

      {uploading && (
        <>
          <Spinner />
          <p>Generating chapter...</p>
        </>
      )}

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
