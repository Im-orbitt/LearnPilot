import "./CTA.css";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="cta">
      <h2>Ready to transform the way you learn?</h2>
      <p>Upload your first chapter and let AI do the rest.</p>

      <Link to="/app/library">
        <button className="cta-btn">Get Started</button>
      </Link>
    </section>
  );
}

export default CTA;
