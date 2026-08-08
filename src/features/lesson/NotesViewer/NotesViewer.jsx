import "./NotesViewer.css";

export default function NotesViewer({ notes }) {
  return (
    <section className="lesson-section notes-viewer">
      <h2>📝 Notes</h2>
      <pre>{notes}</pre>
    </section>
  );
}
