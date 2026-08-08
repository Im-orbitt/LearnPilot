import "./Lesson.css";

import { useBook } from "../hooks/useBook";

import EmptyState from "../components/feedback/EmptyState/EmptyState";

import NotesViewer from "../features/lesson/NotesViewer/NotesViewer";
import QuizSection from "../features/lesson/QuizSection/QuizSection";
import TutorChat from "../features/lesson/TutorChat/TutorChat";

function Lesson() {
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
      <header className="lesson-header">
        <h1>{currentTopic.title}</h1>
      </header>

      <NotesViewer notes={currentTopic.notes} />

      <QuizSection quiz={currentTopic.quiz} />

      <TutorChat />
    </div>
  );
}

export default Lesson;
