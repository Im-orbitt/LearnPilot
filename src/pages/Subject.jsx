import { Link } from "react-router-dom";

function Subject() {
  return (
    <>
      <h1>Physics</h1>

      <p>Chapter 1</p>

      <Link to="/app/chapter">
        <button>Open Chapter</button>
      </Link>
    </>
  );
}

export default Subject;
