import { useState } from "react";

import "./QuizCard.css";

export default function QuizCard({ question, index }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const correct = selected === question.answer;

  return (
    <div className="quiz-card">
      <h3>
        {index + 1}. {question.question}
      </h3>

      <div className="quiz-options">
        {question.options.map((option) => {
          let className = "quiz-option";

          if (submitted) {
            if (option === question.answer) className += " correct";
            else if (option === selected) className += " wrong";
          }

          return (
            <button
              key={option}
              className={className}
              disabled={submitted}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          className="submit-btn"
          disabled={selected === null}
          onClick={() => setSubmitted(true)}
        >
          Check Answer
        </button>
      ) : (
        <p className={correct ? "correct-text" : "wrong-text"}>
          {correct ? "✅ Correct!" : `❌ Correct answer: ${question.answer}`}
        </p>
      )}
    </div>
  );
}
