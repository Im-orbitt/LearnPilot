import { Link } from "react-router-dom";

function Chapter() {
  return (
    <>
      <h1>Chapter</h1>

      <p>Topic 1</p>

      <Link to="/app/lesson">
        <button>Start Lesson</button>
      </Link>
    </>
  );
}

export default Chapter;
