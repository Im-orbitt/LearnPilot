import AppRoutes from "./routes/AppRoutes";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <AppRoutes />
      <Analytics />
    </>
  );
}

export default App;
