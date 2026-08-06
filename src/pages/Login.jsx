import { Link } from "react-router-dom";

import Button from "../components/ui/Button/Button";

function Login() {
  return (
    <>
      <h1>Login</h1>

      <Link to="/app/dashboard">
        <Button>Continue</Button>
      </Link>
    </>
  );
}

export default Login;
