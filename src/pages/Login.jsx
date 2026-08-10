import "./Login.css";

import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

import Button from "../components/ui/Button/Button";

function Login() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <Brain size={24} />
          </div>

          <span>LearnPilot</span>
        </div>

        <div className="auth-header">
          <h1>Welcome back</h1>
          <p>Continue your learning journey.</p>
        </div>

        <form className="auth-form">
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>

          <label>
            Password
            <input type="password" placeholder="Enter your password" />
          </label>

          <Button type="submit">Sign in</Button>
        </form>

        <p className="auth-footer">
          Don't have an account? <span>Registration coming soon.</span>
        </p>

        <Link className="auth-back" to="/">
          ← Back to LearnPilot
        </Link>
      </section>
    </main>
  );
}

export default Login;
