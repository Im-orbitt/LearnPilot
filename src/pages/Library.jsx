import { Link } from "react-router-dom";

function Library() {
  return (
    <>
      <h1>Library</h1>

      <button>Upload Book</button>

      <p>No books uploaded.</p>

      <Link to="/app/subject">
        <button>Open Subject</button>
      </Link>
    </>
  );
}

export default Library;
