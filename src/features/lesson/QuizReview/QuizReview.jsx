import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button/Button";

import "./QuizReview.css";

export default function QuizReview({ quiz, answers }) {
  const [current, setCurrent] = useState(0);

  const navigate = useNavigate();

  if (!quiz?.length) {
    return <p>No quiz answers available.</p>;
  }

  const question = quiz[current];
  const selectedAnswer = answers?.[current]?.selected;

  const isLastQuestion = current === quiz.length - 1;

  return (
    <div className="quiz-review">
      <p className="quiz-review-progress">
        Question {current + 1} / {quiz.length}
      </p>

      <div className="quiz-card">
        <h3>
          {current + 1}. {question.question}
        </h3>

        <div className="quiz-options">
          {question.options.map((option) => {
            const isCorrect = option === question.answer;
            const isWrongSelection = option === selectedAnswer && !isCorrect;

            let className = "quiz-option";

            if (isCorrect) {
              className += " correct";
            } else if (isWrongSelection) {
              className += " wrong";
            }

            return (
              <div key={option} className={className}>
                <span>{option}</span>

                {isCorrect && (
                  <span className="quiz-option-label">Correct</span>
                )}

                {isWrongSelection && (
                  <span className="quiz-option-label">Your answer</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="quiz-navigation">
        <Button
          disabled={current === 0}
          onClick={() => setCurrent((value) => value - 1)}
        >
          Previous
        </Button>

        {!isLastQuestion ? (
          <Button onClick={() => setCurrent((value) => value + 1)}>Next</Button>
        ) : (
          <Button onClick={() => navigate("/app/lesson")}>
            Back to Lesson
          </Button>
        )}
      </div>
    </div>
  );
}
