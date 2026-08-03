import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((response) => response.json())
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
