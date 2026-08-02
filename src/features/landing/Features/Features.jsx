import "./Features.css";
import { BookOpen, Brain, BarChart3 } from "lucide-react";

function Features() {
  return (
    <section className="features" id="features">
      <h2>Everything you need to learn smarter</h2>

      <div className="feature-grid">
        <div className="feature-card">
          <BookOpen />
          <h3>Smart Notes</h3>
          <p>Generate concise notes from any chapter.</p>
        </div>

        <div className="feature-card">
          <Brain />
          <h3>AI Tutor</h3>
          <p>Ask questions and learn with your personal AI tutor.</p>
        </div>

        <div className="feature-card">
          <BarChart3 />
          <h3>Progress Tracking</h3>
          <p>Track your learning journey with detailed insights.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
