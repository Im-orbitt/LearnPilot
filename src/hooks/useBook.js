import { useContext } from "react";
import { BookContext } from "../providers/BookContext";

export function useBook() {
  return useContext(BookContext);
}