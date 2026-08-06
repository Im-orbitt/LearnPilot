import { useBook } from "../hooks/useBook";

function Lesson() {
  const { currentTopic: topic, book } = useBook();

  if (!topic || !book) {
    return <p>No lesson selected.</p>;
  }

  return (
    <>
      <h1>{topic.title}</h1>

      <h2>Notes</h2>

      <pre>{topic.notes}</pre>

      <hr />

      <h2>Quiz</h2>

      {topic.quiz.map((question, index) => (
        <div key={index}>
          <h3>
            {index + 1}. {question.question}
          </h3>

          <ul>
            {question.options.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
        </div>
      ))}

      <hr />

      <h2>AI Tutor</h2>

      <p>Coming soon...</p>
    </>
  );
}

export default Lesson;
