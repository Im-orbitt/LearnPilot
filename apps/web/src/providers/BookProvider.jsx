import { useEffect, useState } from "react";

import { BookContext } from "../contexts/BookContext";
import { useAuth } from "../hooks/useAuth";
import { getBooks } from "../services/api";


const STORAGE_KEY_PREFIX = "learnpilot_progress";


function storageKey(userId, bookId, topicTitle) {
  return `${STORAGE_KEY_PREFIX}:${userId}:${bookId}:${encodeURIComponent(topicTitle)}`;
}


function loadProgress(userId, bookId, topicTitle) {
  try {
    const raw = localStorage.getItem(storageKey(userId, bookId, topicTitle));
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}


function saveProgress(userId, bookId, topicTitle, data) {
  try {
    localStorage.setItem(
      storageKey(userId, bookId, topicTitle),
      JSON.stringify(data),
    );
  } catch {
    // Silently fail if storage is full or unavailable
  }
}


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
  const [booksError, setBooksError] = useState("");

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
      setBooksError("");

      try {
        await refreshBooks();
      } catch (error) {
        console.error("Failed to load books:", error);
        setBooksError("We couldn't load your library. Please refresh to try again.");
        setBooks([]);
        setBookState(null);
        setCurrentBookId(null);
      } finally {
        setBooksLoading(false);
      }
    }

    loadBooks();
  }, [user, authLoading]);

  // Restore persisted progress when the current topic changes
  // The setState calls inside this effect are intentional — they synchronize
  // React state from localStorage when the user navigates to a different topic.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!user || !currentBookId || !book?.topics) {
      return;
    }

    const topic = book.topics[currentTopicIndex];

    if (!topic?.title) {
      return;
    }

    const saved = loadProgress(user.id, currentBookId, topic.title);

    if (saved) {
      setLessonProgress({
        notesCompleted: Boolean(saved.notesCompleted),
        quizCompleted: Boolean(saved.quizCompleted),
      });
      setQuizAnswers(saved.quizAnswers || {});
    } else {
      setLessonProgress({ notesCompleted: false, quizCompleted: false });
      setQuizAnswers({});
    }
  }, [user, currentBookId, currentTopicIndex, book]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Persist progress whenever it changes
  useEffect(() => {
    if (!user || !currentBookId || !book?.topics) {
      return;
    }

    const topic = book.topics[currentTopicIndex];

    if (!topic?.title) {
      return;
    }

    saveProgress(user.id, currentBookId, topic.title, {
      notesCompleted: lessonProgress.notesCompleted,
      quizCompleted: lessonProgress.quizCompleted,
      quizAnswers,
    });
  }, [user, currentBookId, currentTopicIndex, book, lessonProgress, quizAnswers]);

  function setBook(newBook) {
    setBookState(newBook);

    const selectedBook = books.find((item) => item.chapter === newBook);

    setCurrentBookId(selectedBook?.id ?? null);

    setCurrentTopicIndex(0);
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
        booksError,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}