import "./FileUpload.css";
import { UploadCloud, FileText } from "lucide-react";

function FileUpload({ onChange, disabled }) {
  return (
    <label className={`file-upload ${disabled ? "disabled" : ""}`}>
      <input
        type="file"
        accept=".pdf"
        onChange={onChange}
        disabled={disabled}
      />

      <UploadCloud size={52} className="upload-icon" />

      <h3>Upload your textbook</h3>

      <p>Choose an NCERT or any study PDF.</p>

      <div className="upload-badge">
        <FileText size={16} />
        <span>PDF only</span>
      </div>
    </label>
  );
}

export default FileUpload;
