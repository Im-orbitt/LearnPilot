import { useEffect, useState } from "react";

import { BookContext } from "../contexts/BookContext";

export function BookProvider({ children }) {
  const [book, setBookState] = useState(() => {
    const saved = localStorage.getItem("learnpilot-book");

    if (!saved) return null;

    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem("learnpilot-book");
      return null;
    }
  });

  const [currentTopicIndex, setCurrentTopicIndex] = useState(() => {
    const saved = localStorage.getItem("learnpilot-current-topic");

    if (saved === null) return 0;

    const index = Number(saved);

    return Number.isInteger(index) && index >= 0 ? index : 0;
  });

  function setBook(newBook) {
    setBookState(newBook);
    setCurrentTopicIndex(0);
  }

  useEffect(() => {
    if (book) {
      localStorage.setItem("learnpilot-book", JSON.stringify(book));
    } else {
      localStorage.removeItem("learnpilot-book");
    }
  }, [book]);

  useEffect(() => {
    localStorage.setItem("learnpilot-current-topic", String(currentTopicIndex));
  }, [currentTopicIndex]);

  const currentTopic = book?.chapter?.topics?.[currentTopicIndex] ?? null;

  return (
    <BookContext.Provider
      value={{
        book,
        setBook,
        currentTopic,
        currentTopicIndex,
        setCurrentTopicIndex,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
