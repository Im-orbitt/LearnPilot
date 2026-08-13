import "./Tutor.css";

import { Bot, Lock, Send } from "lucide-react";

import { useBook } from "../hooks/useBook";
import EmptyState from "../components/feedback/EmptyState/EmptyState";

function Tutor() {
  const { currentTopic } = useBook();

  if (!currentTopic) {
    return (
      <EmptyState
        title="No topic selected"
        message="Choose a topic from the Chapter page."
      />
    );
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
            Preparing
          </span>
        </div>

        <div className="tutor-body">
          <div className="tutor-empty-state">
            <div className="tutor-empty-icon">
              <Lock size={24} />
            </div>

            <h3>Your AI Tutor is being prepared</h3>

            <p>
              The tutor will be able to answer questions about{" "}
              <strong>{currentTopic.title}</strong>, explain difficult concepts,
              and guide you through problems step by step.
            </p>

            <span className="tutor-note">
              AI tutoring will be available in a future LearnPilot update.
            </span>
          </div>
        </div>

        <form className="tutor-input">
          <input
            type="text"
            placeholder="Ask your tutor anything..."
            disabled
          />

          <button type="button" disabled aria-label="Send question">
            <Send size={18} />
          </button>
        </form>
      </section>
    </div>
  );
}

export default Tutor;
