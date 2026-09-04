import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import Spinner from "../ui/Spinner/Spinner";

function PublicOnlyRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}>
        <Spinner size={40} />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicOnlyRoute;
