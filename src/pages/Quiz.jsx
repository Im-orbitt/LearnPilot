import { useBook } from "../hooks/useBook";

import EmptyState from "../components/feedback/EmptyState/EmptyState";

import QuizSession from "../features/lesson/QuizSession/QuizSession";

function Quiz() {
  const { currentTopic, setLessonProgress } = useBook();

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
      <header className="lesson-header">
        <span className="lesson-eyebrow">STEP 02 · PRACTICE</span>

        <h1>{currentTopic.title}</h1>

        <p>Test your understanding of this topic.</p>
      </header>

      <section className="lesson-section">
        <QuizSession
          quiz={currentTopic.quiz}
          onComplete={() =>
            setLessonProgress((previous) => ({
              ...previous,
              quizCompleted: true,
            }))
          }
        />
      </section>
    </div>
  );
}

export default Quiz;
