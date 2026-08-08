import "./Dashboard.css";

import { BookOpen, Layers, Clock3 } from "lucide-react";

import { useBook } from "../hooks/useBook";

import EmptyState from "../components/feedback/EmptyState/EmptyState";
import StatCard from "../features/dashboard/StatCard/StatCard";

function Dashboard() {
  const { book } = useBook();

  if (!book) {
    return (
      <div className="dashboard-page">
        <EmptyState
          title="Your learning space is empty"
          message="Upload your first textbook to generate notes, quizzes, and a personalized learning experience."
        />
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <section className="dashboard-welcome">
        <p className="dashboard-eyebrow">Your learning space</p>

        <h2>Welcome back!</h2>

        <p>Keep learning, track your progress, and stay curious.</p>
      </section>

      <section className="dashboard-stats">
        <StatCard title="Chapter" value="1" icon={BookOpen} />

        <StatCard
          title="Topics"
          value={book.chapter.topics.length}
          icon={Layers}
        />

        <StatCard title="Study Time" value="42 min" icon={Clock3} />
      </section>
    </div>
  );
}

export default Dashboard;
