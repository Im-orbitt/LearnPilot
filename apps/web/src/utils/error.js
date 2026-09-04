/**
 * Error handling utility for LearnPilot.
 *
 * Converts technical API errors into user-friendly messages while logging
 * technical details to the console for debugging.
 */

const ERROR_MESSAGES = {
  // Network / connectivity
  "Failed to fetch":
    "We couldn't connect to LearnPilot. Check your connection and try again.",
  "Network Error":
    "We couldn't connect to LearnPilot. Check your connection and try again.",

  // Auth
  "Invalid email or password":
    "We couldn't find your account. Check your email and password and try again.",
  "User already registered":
    "An account with this email already exists. Try signing in instead.",
  "Failed to check authentication.":
    "We couldn't verify your session. Please try signing in again.",

  // Books / upload
  "Failed to load books.":
    "We couldn't load your books. Please try again in a moment.",
  "Upload failed.":
    "We couldn't process this PDF. Make sure it's a valid textbook PDF and try again.",
  "You've reached the 2-book limit on the Free plan.":
    "You've reached the 2-book limit on the Free plan. Upgrade to upload more books.",

  // Tutor
  "Tutor request failed.":
    "The tutor couldn't respond right now. Please try again in a moment.",
  "Gemini returned no chapter.":
    "We couldn't generate a chapter from this PDF. Make sure it's a valid textbook and try again.",
  "Gemini returned no notes.":
    "We couldn't generate study notes. Please try again in a moment.",
  "Gemini returned no quiz.":
    "We couldn't generate a quiz. Please try again in a moment.",
  "Gemini returned no tutor response.":
    "The tutor couldn't respond right now. Please try again in a moment.",
};

/**
 * Returns a user-friendly error message for the given error.
 * Logs technical details to the console for debugging.
 *
 * @param {Error} error - The error object from an API call
 * @param {object} [options]
 * @param {string} [options.fallback] - Fallback message if no match is found
 * @returns {string} User-friendly error message
 */
export function getErrorMessage(error, options = {}) {
  const { fallback = "Something went wrong. Please try again." } = options;

  if (!error) {
    return fallback;
  }

  const message = error.message || error.toString() || String(error);

  // Log technical details for debugging
  console.error("[LearnPilot Error]", {
    message,
    error,
  });

  // Return friendly message if we have a mapping
  if (ERROR_MESSAGES[message]) {
    return ERROR_MESSAGES[message];
  }

  // Handle generic backend detail messages
  if (message && message.includes("detail")) {
    return "We couldn't complete that request. Please try again.";
  }

  return fallback;
}

export default getErrorMessage;