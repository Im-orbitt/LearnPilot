import { Link } from "react-router-dom";
import { useBook } from "../hooks/useBook";

import EmptyState from "../components/feedback/EmptyState/EmptyState";
import Button from "../components/ui/Button/Button";

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

      <p>
        Continue learning <strong>{book.chapter.title}</strong>.
      </p>

      <Link to="/app/chapter">
        <Button>Continue Learning</Button>
      </Link>
    </>
  );
}

export default Dashboard;
