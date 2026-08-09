import "./Lesson.css";

import { BookOpen, Brain, MessageCircleQuestion } from "lucide-react";
import { useBook } from "../hooks/useBook";
import { useNavigate } from "react-router-dom";

import EmptyState from "../components/feedback/EmptyState/EmptyState";
import LessonOption from "../features/lesson/LessonOption/LessonOption";

function Lesson() {
  const { currentTopic } = useBook();
  const navigate = useNavigate();

  if (!currentTopic) {
    return (
      <EmptyState
        title="No topic selected"
        message="Choose a topic from the Chapter page."
      />
    );
  }

  const lessonOptions = [
    {
      icon: BookOpen,
      label: "Review",
      title: "Notes",
      description:
        "Read through your AI-generated notes and review the key ideas.",
      action: "Open Notes",
      onClick: () => navigate("/app/lesson/notes"),
    },
    {
      icon: Brain,
      label: "Practice",
      title: "Quiz",
      description: "Test your understanding with an interactive quiz.",
      action: "Start Quiz",
      onClick: () => navigate("/app/lesson/quiz"),
    },
    {
      icon: MessageCircleQuestion,
      label: "Ask",
      title: "AI Tutor",
      description: "Ask questions and get help understanding this topic.",
      action: "Open AI Tutor",
      onClick: () => navigate("/app/lesson/tutor"),
    },
  ];

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <span className="lesson-eyebrow">CURRENT TOPIC</span>

        <h1>{currentTopic.title}</h1>

        <p>Choose how you want to study this topic.</p>
      </header>

      <section className="lesson-options">
        {lessonOptions.map((option) => (
          <LessonOption key={option.title} {...option} />
        ))}
      </section>
    </div>
  );
}

export default Lesson;
