import "./Topbar.css";

import { useLocation } from "react-router-dom";
import { useBook } from "../../../hooks/useBook";

function Topbar() {
  const { pathname } = useLocation();
  const { book, currentTopic } = useBook();

  const pages = {
    "/app/dashboard": {
      title: "Dashboard",
      subtitle: "Welcome back!",
    },

    "/app/library": {
      title: "Library",
      subtitle: "Upload a chapter and let AI generate notes and quizzes.",
    },

    "/app/progress": {
      title: "Progress",
      subtitle: "Track your learning journey.",
    },

    "/app/settings": {
      title: "Settings",
      subtitle: "Manage your LearnPilot preferences.",
    },

    "/app/parent": {
      title: "Parent Dashboard",
      subtitle: "Monitor your child's learning progress.",
    },
  };

  let title = pages[pathname]?.title ?? "LearnPilot";
  let subtitle = pages[pathname]?.subtitle ?? "";

  if (pathname === "/app/chapter" && book) {
    title = book.chapter.title;
    subtitle = `${book.chapter.topics.length} topics ready to study`;
  }

  if (pathname === "/app/lesson" && currentTopic) {
    title = currentTopic.title;
    subtitle = "Study notes, quiz and AI tutor";
  }

  return (
    <header className="topbar">
      <div className="topbar-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-status">AI Ready</div>
    </header>
  );
}

export default Topbar;
