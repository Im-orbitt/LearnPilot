import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <h1>Login</h1>

      <Link to="/app/dashboard">
        <button>Continue</button>
      </Link>
    </>
  );
}

export default Login;
