import "./Hero.css";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Bot } from "lucide-react";

function Hero() {
  return (
    <section className="hero" id="hero">
      <span className="eyebrow">AI-Powered Personalized Learning</span>

      <h1>
        Upload a Chapter.
        <br />
        <span className="gradient-text">Master it with AI.</span>
      </h1>

      <p className="subtitle">
        LearnPilot transforms any textbook chapter into AI-generated notes,
        quizzes, and a personal AI tutor—helping students learn faster and
        smarter.
      </p>

      <div className="hero-buttons">
        <Link to="/login">
          <button className="primary-btn">Upload Chapter</button>
        </Link>

        <button className="secondary-btn">Watch Demo</button>
      </div>

      <div className="hero-preview">
        <div className="floating-card card1">
          <BookOpen size={18} />
          <span>Physics</span>
        </div>

        <div className="floating-card card2">
          <FileText size={18} />
          <span>AI Notes</span>
        </div>

        <div className="floating-card card3">
          <Bot size={18} />
          <span>AI Tutor</span>
        </div>

        <div className="dashboard-placeholder">Dashboard Preview</div>
      </div>
    </section>
  );
}

export default Hero;
