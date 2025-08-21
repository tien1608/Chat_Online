import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { useAuthStore } from "./store/authStore";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// PrivateRoute component
function PrivateRoute({ children }) {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/ForgotPassword" element={<ForgotPasswordPage />} />

      {/* Protected route test */}
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <div className="flex items-center justify-center h-screen">
              <h1 className="text-3xl font-bold">Welcome to Chat App!</h1>
            </div>
          </PrivateRoute>
        }
      />

      {/* Redirect all unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
