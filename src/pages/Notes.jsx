import { useBook } from "../hooks/useBook";
import EmptyState from "../components/feedback/EmptyState/EmptyState";

import ReactMarkdown from "react-markdown";

function Notes() {
  const { currentTopic } = useBook();

  if (!currentTopic) {
    return (
      <EmptyState
        title="No topic selected"
        message="Choose a topic from the Chapter page."
      />
    );
  }

  return (
    <div className="lesson-page">
      <h1>{currentTopic.title} — Notes</h1>

      <section className="lesson-section">
        <h2>📝 Notes</h2>
        <ReactMarkdown>{currentTopic.notes}</ReactMarkdown>
      </section>
    </div>
  );
}

export default Notes;
