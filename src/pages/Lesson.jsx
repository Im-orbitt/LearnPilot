import { getCurrentTopic } from "../data/currentTopic";
import { getBook } from "../data/book";

function Lesson() {
  const topic = getCurrentTopic();
  const book = getBook();

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

      {book.quiz.questions.map((question, index) => (
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
