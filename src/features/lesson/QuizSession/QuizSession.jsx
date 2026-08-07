import { useState } from "react";

import QuizCard from "../QuizCard/QuizCard";

export default function QuizSession({ quiz }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState({});
  const [finished, setFinished] = useState(false);

  function handleAnswered(correct) {
    if (answered[current]) return;

    setAnswered((prev) => ({
      ...prev,
      [current]: true,
    }));

    if (correct) {
      setScore((s) => s + 1);
    }
  }

  if (finished) {
    return (
      <div className="lesson-section">
        <h2>🎉 Quiz Complete!</h2>

        <p>
          You scored <strong>{score}</strong> / {quiz.length}
        </p>

        <button
          onClick={() => {
            setCurrent(0);
            setScore(0);
            setAnswered({});
            setFinished(false);
          }}
        >
          Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <>
      <p>
        Question {current + 1} of {quiz.length}
      </p>

      <QuizCard
        question={quiz[current]}
        index={current}
        onAnswered={handleAnswered}
      />

      <div className="lesson-nav">
        <button
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
        >
          Previous
        </button>

        {current === quiz.length - 1 ? (
          <button onClick={() => setFinished(true)}>Finish Quiz</button>
        ) : (
          <button onClick={() => setCurrent((c) => c + 1)}>Next</button>
        )}
      </div>
    </>
  );
}
