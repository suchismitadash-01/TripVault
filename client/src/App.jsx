import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateTrip from "./pages/CreateTrip.jsx";
import EditTrip from "./pages/EditTrip.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-trip"
        element={
        <ProtectedRoute>
          <CreateTrip />
        </ProtectedRoute>
        }
      />
      <Route
        path="/edit-trip/:id"
        element={
          <ProtectedRoute>
            <EditTrip />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
