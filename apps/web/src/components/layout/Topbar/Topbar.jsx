import "./Topbar.css";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBook } from "../../../hooks/useBook";
import NotificationPopover from "../../ui/NotificationPopover/NotificationPopover";

import { ArrowLeft, Bell, Search } from "lucide-react";

function Topbar({ lessonMode = false, lessonType = "" }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { book, currentTopic } = useBook();

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

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

  if (lessonMode) {
    const lessonTitles = {
      notes: "Notes",
      quiz: "Quiz",
      tutor: "AI Tutor",
    };

    const title = lessonTitles[lessonType] ?? "Lesson";

    function handleBack() {
      const confirmed = window.confirm(
        "Are you sure you want to leave this lesson?",
      );

      if (confirmed) {
        navigate("/app/lesson");
      }
    }

    return (
      <header className="topbar topbar-lesson">
        <button
          className="topbar-back"
          type="button"
          onClick={handleBack}
          aria-label="Back to lesson"
        >
          <ArrowLeft size={19} />
          <span>Back to Lesson</span>
        </button>

        <div className="topbar-lesson-title">
          <h1>{title}</h1>
          {currentTopic && <p>{currentTopic.title}</p>}
        </div>
      </header>
    );
  }

  let title = pages[pathname]?.title ?? "LearnPilot";
  let subtitle = pages[pathname]?.subtitle ?? "";

  if (pathname === "/app/chapter" && book) {
    title = book.title;
    subtitle = `${book.topics.length} topics ready to study`;
  }

  if (pathname === "/app/lesson" && currentTopic) {
    title = currentTopic.title;
    subtitle = "Choose how you want to study";
  }

  function handleSearch(event) {
    event.preventDefault();

    const query = search.trim().toLowerCase();

    if (!query) return;

    const matches = [
      {
        keywords: ["dashboard", "home"],
        path: "/app/dashboard",
      },
      {
        keywords: ["library", "books", "upload"],
        path: "/app/library",
      },
      {
        keywords: ["chapter", "topics"],
        path: "/app/chapter",
      },
      {
        keywords: ["progress"],
        path: "/app/progress",
      },
      {
        keywords: ["settings"],
        path: "/app/settings",
      },
      {
        keywords: ["parent"],
        path: "/app/parent",
      },
    ];

    const match = matches.find((item) =>
      item.keywords.some((keyword) => query.includes(keyword)),
    );

    if (match) {
      navigate(match.path);
      setSearch("");
    }
  }

  return (
    <header className="topbar">
      <div className="topbar-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-actions">
        <form className="topbar-search" onSubmit={handleSearch}>
          <Search className="search-icon" size={18} />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search LearnPilot..."
            aria-label="Search LearnPilot"
          />
        </form>

        <div className="notification-wrapper">
          <button
            className="topbar-icon-button"
            type="button"
            onClick={() => setShowNotifications((value) => !value)}
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <Bell size={19} />
          </button>

          {showNotifications && <NotificationPopover />}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
