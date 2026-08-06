import { useBook } from "../../../hooks/useBook";

function Topbar() {
  const { book } = useBook();

  return (
    <header>
      <h1>{book ? book.chapter.title : "LearnPilot"}</h1>
    </header>
  );
}

export default Topbar;
