import "./Lesson.css";

import {
  BookOpen,
  Brain,
  //Check,
  //Lock,
  MessageCircleQuestion,
} from "lucide-react";

import { useBook } from "../hooks/useBook";
import { useNavigate } from "react-router-dom";

import EmptyState from "../components/feedback/EmptyState/EmptyState";
import LessonOption from "../features/lesson/LessonOption/LessonOption";

function Lesson() {
  const { currentTopic, lessonProgress } = useBook();
  const navigate = useNavigate();

  if (!currentTopic) {
    return (
      <EmptyState
        title="No topic selected"
        message="Choose a topic from the Chapter page."
      />
    );
  }

  const options = [
    {
      number: "01",
      icon: BookOpen,
      label: "START HERE",
      title: "Review your notes",
      description: "Learn the key ideas before testing what you know.",
      action: "Open Notes",
      completed: lessonProgress.notesCompleted,
      locked: false,
      onClick: () => navigate("/app/lesson/notes"),
    },
    {
      number: "02",
      icon: Brain,
      label: "NEXT STEP",
      title: "Test your understanding",
      description:
        "Take a short quiz to see how well you understood the topic.",
      action: "Start Quiz",
      completed: lessonProgress.quizCompleted,
      locked: !lessonProgress.notesCompleted,
      onClick: () => navigate("/app/lesson/quiz"),
    },
    {
      number: "03",
      icon: MessageCircleQuestion,
      label: "FINAL STEP",
      title: "Ask your AI Tutor",
      description:
        "Have a conversation about anything you still want to understand.",
      action: "Open AI Tutor",
      completed: false,
      locked: !lessonProgress.quizCompleted,
      onClick: () => navigate("/app/lesson/tutor"),
    },
  ];

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <span className="lesson-eyebrow">CURRENT TOPIC</span>

        <h1>{currentTopic.title}</h1>

        <p>Follow the steps below to work through this topic.</p>
      </header>

      <section className="lesson-workflow">
        {options.map((option, index) => (
          <LessonOption
            key={option.number}
            {...option}
            isLast={index === options.length - 1}
          />
        ))}
      </section>
    </div>
  );
}

export default Lesson;
