import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button/Button";
import QuizCard from "../QuizCard/QuizCard";

export default function QuizSession({ quiz, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const navigate = useNavigate();

  if (!quiz?.length) {
    return <p>No quiz questions available.</p>;
  }

  function handleAnswered(isCorrect) {
    setAnswers((previous) => ({
      ...previous,
      [current]: isCorrect,
    }));
  }

  function handleFinish() {
    setFinished(true);
    onComplete();
  }

  const score = Object.values(answers).filter(Boolean).length;

  if (finished) {
    return (
      <div className="quiz-results">
        <h2>Quiz Complete!</h2>

        <p>
          Score: <strong>{score}</strong> / {quiz.length}
        </p>

        <div className="quiz-results-actions">
          <Button onClick={() => navigate("/app/lesson/quiz/answers")}>
            View Correct Answers
          </Button>

          <Button
            onClick={() => {
              setCurrent(0);
              setAnswers({});
              setFinished(false);
            }}
          >
            Retry Quiz
          </Button>

          <Button onClick={() => navigate("/app/lesson")}>
            Back to Lesson
          </Button>
        </div>
      </div>
    );
  }

  const answered = answers[current] !== undefined;
  const isLastQuestion = current === quiz.length - 1;

  return (
    <div className="quiz-session">
      <p>
        Question {current + 1} / {quiz.length}
      </p>

      <QuizCard
        question={quiz[current]}
        index={current}
        onAnswered={handleAnswered}
      />

      <div className="quiz-navigation">
        <Button
          disabled={current === 0}
          onClick={() => setCurrent((value) => value - 1)}
        >
          Previous
        </Button>

        {!isLastQuestion ? (
          <Button
            disabled={!answered}
            onClick={() => setCurrent((value) => value + 1)}
          >
            Next
          </Button>
        ) : (
          <Button disabled={!answered} onClick={handleFinish}>
            Finish Quiz
          </Button>
        )}
      </div>
    </div>
  );
}
