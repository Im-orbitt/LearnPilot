import { useEffect, useState } from "react";

import { BookContext } from "../contexts/BookContext";
import { useAuth } from "../hooks/useAuth";

export function BookProvider({ children }) {
  const { user, loading: authLoading } = useAuth();

  const [books, setBooks] = useState([]);
  const [book, setBookState] = useState(null);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

  const [lessonProgress, setLessonProgress] = useState({
    notesCompleted: false,
    quizCompleted: false,
  });

  const [quizAnswers, setQuizAnswers] = useState({});

  const [loading, setLoading] = useState(true);

  async function refreshBooks() {
    const response = await fetch("http://localhost:8000/books", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to load books.");
    }

    const data = await response.json();

    setBooks(data.books);

    if (data.books.length > 0) {
      setBookState(data.books[0].chapter);
    } else {
      setBookState(null);
    }

    return data.books;
  }

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setBooks([]);
      setBookState(null);
      setLoading(false);
      return;
    }

    async function loadBooks() {
      try {
        await refreshBooks();
      } catch (error) {
        console.error("Failed to load books:", error);
        setBooks([]);
        setBookState(null);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, [user, authLoading]);

  function setBook(newBook) {
    setBookState(newBook);
    setCurrentTopicIndex(0);
    setQuizAnswers({});
    setLessonProgress({
      notesCompleted: false,
      quizCompleted: false,
    });
  }

  const currentTopic = book?.topics?.[currentTopicIndex] ?? null;

  return (
    <BookContext.Provider
      value={{
        book,
        books,
        setBook,
        refreshBooks,
        currentTopic,
        currentTopicIndex,
        setCurrentTopicIndex,
        lessonProgress,
        setLessonProgress,
        quizAnswers,
        setQuizAnswers,
        loading,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
