import { useState } from "react";
import { Bot, Send, User } from "lucide-react";

import "./Tutor.css";

import { useBook } from "../hooks/useBook";
import { askTutor } from "../services/api";
import EmptyState from "../components/feedback/EmptyState/EmptyState";

function Tutor() {
  const { currentBookId, currentTopic } = useBook();

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!currentTopic) {
    return (
      <EmptyState
        title="No topic selected"
        message="Choose a topic from the Chapter page."
      />
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading || !currentBookId) {
      return;
    }

    setError("");

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: trimmedQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const data = await askTutor(currentBookId, trimmedQuestion);

      setMessages((previous) => [
        ...previous,
        {
          role: "tutor",
          content: data.answer,
        },
      ]);
    } catch (requestError) {
      setError(requestError.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lesson-page tutor-page">
      <header className="lesson-header">
        <span className="lesson-eyebrow">STEP 03 · ASK</span>

        <h1>{currentTopic.title}</h1>

        <p>
          Ask questions, explore difficult ideas, and get explanations tailored
          to your learning.
        </p>
      </header>

      <section className="tutor-shell">
        <div className="tutor-header">
          <div className="tutor-header-icon">
            <Bot size={22} />
          </div>

          <div>
            <h2>LearnPilot AI Tutor</h2>
            <p>Personalised help for this topic</p>
          </div>

          <span className="tutor-status">
            <span className="tutor-status-dot" />
            Online
          </span>
        </div>

        <div className="tutor-body">
          {messages.length === 0 ? (
            <div className="tutor-empty-state">
              <div className="tutor-empty-icon">
                <Bot size={24} />
              </div>

              <h3>What would you like to learn?</h3>

              <p>
                Ask me anything about <strong>{currentTopic.title}</strong>. I
                can explain difficult concepts, answer questions, and help you
                understand the material.
              </p>
            </div>
          ) : (
            <div className="tutor-messages">
              {messages.map((message, index) => (
                <div
                  className={`tutor-message tutor-message-${message.role}`}
                  key={`${message.role}-${index}`}
                >
                  <div className="tutor-message-icon">
                    {message.role === "tutor" ? (
                      <Bot size={17} />
                    ) : (
                      <User size={17} />
                    )}
                  </div>

                  <div className="tutor-message-content">
                    <span className="tutor-message-label">
                      {message.role === "tutor" ? "Tutor" : "You"}
                    </span>

                    <p>{message.content}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="tutor-message tutor-message-tutor">
                  <div className="tutor-message-icon">
                    <Bot size={17} />
                  </div>

                  <div className="tutor-message-content">
                    <span className="tutor-message-label">Tutor</span>

                    <p className="tutor-thinking">Thinking...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="tutor-error" role="alert">
            {error}
          </div>
        )}

        <form className="tutor-input" onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask your tutor anything..."
            disabled={loading}
            aria-label="Ask your tutor"
          />

          <button
            type="submit"
            disabled={loading || !question.trim()}
            aria-label="Send question"
          >
            <Send size={18} />
          </button>
        </form>
      </section>
    </div>
  );
}

export default Tutor;
