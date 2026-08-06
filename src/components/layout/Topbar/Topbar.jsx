import "./Topbar.css";

import { useBook } from "../../../hooks/useBook";

function Topbar() {
  const { book } = useBook();

  return (
    <header className="topbar">
      <div className="topbar-title">
        <h1>{book ? book.chapter.title : "Dashboard"}</h1>

        <p>
          {book
            ? `${book.chapter.topics.length} topics ready to study`
            : "Upload a textbook to begin"}
        </p>
      </div>

      <div className="topbar-status">AI Ready</div>
    </header>
  );
}

export default Topbar;
