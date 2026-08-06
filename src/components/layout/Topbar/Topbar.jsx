import { useBook } from "../../../hooks/useBook";

function Topbar() {
  const { book } = useBook();

  return (
    <header>
      <h1>LearnPilot</h1>

      {book && <p>{book.filename}</p>}
    </header>
  );
}

export default Topbar;
