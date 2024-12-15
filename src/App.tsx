import { AuthProvider } from "./contexts/AuthContext";
import { AppRouter } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

export function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>
  );
}
