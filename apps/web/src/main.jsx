import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import App from "./App.jsx";

import { BookProvider } from "./providers/BookProvider";
import { AuthProvider } from "./providers/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BookProvider>
        <App />
      </BookProvider>
    </AuthProvider>
    <Analytics />
  </StrictMode>,
);
