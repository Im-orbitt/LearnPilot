import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>

      <p>Welcome back!</p>

      <Link to="/app/library">
        <button>Go to Library</button>
      </Link>
    </>
  );
}

export default Dashboard;
