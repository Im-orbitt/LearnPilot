import "./Navbar.css";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

import Button from "../../ui/Button/Button";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <Brain size={30} />
        <span>LearnPilot</span>
      </Link>

      <nav className="nav-links">
        <a href="#features">Features</a>
        <a href="#how-it-works">How it Works</a>
        <a href="#faq">FAQ</a>
      </nav>

      <Link to="/app/library">
        <Button className="nav-btn">Get Started</Button>
      </Link>
    </header>
  );
}

export default Navbar;
