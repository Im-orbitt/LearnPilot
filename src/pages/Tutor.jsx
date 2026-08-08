import { useBook } from "../hooks/useBook";
import EmptyState from "../components/feedback/EmptyState/EmptyState";

function Tutor() {
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
      <h1>{currentTopic.title} — AI Tutor</h1>

      <section className="lesson-section">
        <h2>🤖 AI Tutor</h2>
        <p>Coming soon...</p>
      </section>
    </div>
  );
}

export default Tutor;
