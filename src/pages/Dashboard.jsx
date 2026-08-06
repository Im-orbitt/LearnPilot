import { BookOpen, Layers, Brain } from "lucide-react";

import { useBook } from "../hooks/useBook";

import EmptyState from "../components/feedback/EmptyState/EmptyState";
import StatCard from "../components/cards/StatCard/StatCard";

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
    <>
      <h2>Welcome back!</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <StatCard title="Chapter" value="1" icon={BookOpen} />

        <StatCard
          title="Topics"
          value={book.chapter.topics.length}
          icon={Layers}
        />

        <StatCard title="AI Ready" value="✓" icon={Brain} />
      </div>
    </>
  );
}

export default Dashboard;
