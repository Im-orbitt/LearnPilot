import { useEffect, useState } from "react";

import { BookContext } from "../contexts/BookContext";
import { useAuth } from "../hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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

  const [booksLoading, setBooksLoading] = useState(false);

  async function refreshBooks() {
    const response = await fetch(`${API_URL}/books`, {
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
    if (authLoading || !user) {
      return;
    }

    async function loadBooks() {
      setBooksLoading(true);

      try {
        await refreshBooks();
      } catch (error) {
        console.error("Failed to load books:", error);
        setBooks([]);
        setBookState(null);
      } finally {
        setBooksLoading(false);
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

  const loading = authLoading || (Boolean(user) && booksLoading);

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
