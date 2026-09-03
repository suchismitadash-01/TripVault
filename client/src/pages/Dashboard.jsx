import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        // Token invalid or expired - clear it and bounce to login
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
    fetchMe();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="dashboard-container">
      <h2>Welcome{user ? `, ${user.name}` : ""}! 🗺️</h2>
      <p>You're logged in to TripVault.</p>
      {user && <p>Email: {user.email}</p>}
      <button className="logout-button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}
