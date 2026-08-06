import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBackendStatus } from "../services/api";

function Dashboard() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    getBackendStatus()
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Backend offline"));
  }, []);

  return (
    <>
      <h1>Dashboard</h1>

      <p>{message}</p>

      <Link to="/app/library">
        <button>Go to Library</button>
      </Link>
    </>
  );
}

export default Dashboard;
