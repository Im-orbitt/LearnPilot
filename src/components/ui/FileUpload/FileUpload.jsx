import "./FileUpload.css";

function FileUpload({ onChange, disabled }) {
  return (
    <label className="file-upload">
      <input
        type="file"
        accept=".pdf"
        onChange={onChange}
        disabled={disabled}
      />

      <div className="file-upload-content">
        <h3>📚 Upload your textbook</h3>

        <p>Click here to choose a PDF</p>

        <span>PDF only</span>
      </div>
    </label>
  );
}

export default FileUpload;
