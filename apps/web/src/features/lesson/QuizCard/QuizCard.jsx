import { useState } from "react";

import "./QuizCard.css";

export default function QuizCard({ question, index, onAnswered }) {
  const [selected, setSelected] = useState(null);

  function handleSelect(option) {
    setSelected(option);
    onAnswered?.(option);
  }

  return (
    <div className="quiz-card">
      <h3>
        {index + 1}. {question.question}
      </h3>

      <div className="quiz-options">
        {question.options.map((option) => {
          let className = "quiz-option";

          if (selected === option) {
            className += " selected";
          }

          return (
            <button
              key={option}
              type="button"
              className={className}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
