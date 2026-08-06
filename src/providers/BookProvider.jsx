import { useState } from "react";
import { BookContext } from "./BookContext";

export function BookProvider({ children }) {
  const [book, setBook] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);

  return (
    <BookContext.Provider
      value={{
        book,
        setBook,
        currentTopic,
        setCurrentTopic,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
