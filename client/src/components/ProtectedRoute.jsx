import { Navigate } from "react-router-dom";

// Wrap any route that requires the user to be logged in.
// Redirects to /login if there's no token in localStorage.
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
