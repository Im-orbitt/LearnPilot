import { getCurrentTopic } from "../data/currentTopic";

function Lesson() {
  const topic = getCurrentTopic();

  if (!topic) {
    return <p>No lesson selected.</p>;
  }

  return (
    <>
      <h1>{topic.title}</h1>

      <h2>Notes</h2>

      <pre>{topic.notes}</pre>

      <h2>Quiz</h2>

      <p>Coming soon...</p>

      <h2>AI Tutor</h2>

      <p>Coming soon...</p>
    </>
  );
}

export default Lesson;
