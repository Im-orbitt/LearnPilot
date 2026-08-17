import { useEffect, useState } from "react";

import { BookContext } from "../contexts/BookContext";
import { useAuth } from "../hooks/useAuth";
import { getBooks } from "../services/api";

export function BookProvider({ children }) {
  const { user, loading: authLoading } = useAuth();

  const [books, setBooks] = useState([]);
  const [book, setBookState] = useState(null);
  const [currentBookId, setCurrentBookId] = useState(null);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

  const [lessonProgress, setLessonProgress] = useState({
    notesCompleted: false,
    quizCompleted: false,
  });

  const [quizAnswers, setQuizAnswers] = useState({});

  const [booksLoading, setBooksLoading] = useState(false);

  async function refreshBooks() {
    const data = await getBooks();

    setBooks(data.books);

    if (data.books.length > 0) {
      setBookState(data.books[0].chapter);
      setCurrentBookId(data.books[0].id);
    } else {
      setBookState(null);
      setCurrentBookId(null);
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
        setCurrentBookId(null);
      } finally {
        setBooksLoading(false);
      }
    }

    loadBooks();
  }, [user, authLoading]);

  function setBook(newBook) {
    setBookState(newBook);

    const selectedBook = books.find((item) => item.chapter === newBook);

    setCurrentBookId(selectedBook?.id ?? null);

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
        currentBookId,
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
