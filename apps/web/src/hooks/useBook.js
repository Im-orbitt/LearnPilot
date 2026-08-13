import { useContext } from "react";
import { BookContext } from "../contexts/BookContext";

export function useBook() {
  return useContext(BookContext);
}
