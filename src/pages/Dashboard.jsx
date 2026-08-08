import "./Dashboard.css";

import { BookOpen, Layers, Brain } from "lucide-react";

import { useBook } from "../hooks/useBook";

import EmptyState from "../components/feedback/EmptyState/EmptyState";
import StatCard from "../features/dashboard/StatCard/StatCard";

function Dashboard() {
  const { book } = useBook();

  if (!book) {
    return (
      <EmptyState
        title="Nothing to learn yet"
        message="Upload your first textbook to get started."
      />
    );
  }

  return (
    <div className="dashboard-page">
      <h2>Welcome back 👋</h2>

      <div className="dashboard-grid">
        <StatCard title="Chapter" value="1" icon={BookOpen} />

        <StatCard
          title="Topics"
          value={book.chapter.topics.length}
          icon={Layers}
        />

        <StatCard title="AI Ready" value="✓" icon={Brain} />
      </div>
    </div>
  );
}

export default Dashboard;
