import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Get logged-in user
        const userResponse = await api.get("/auth/me");
        setUser(userResponse.data.user);

        // Get trips belonging to the logged-in user
        const tripsResponse = await api.get("/trips");
        setTrips(tripsResponse.data);
      } catch (err) {
        console.error("Dashboard error:", err);

        // Token invalid or expired
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        setError("Unable to load your trips. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  function formatDate(date) {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <p>Loading your trips...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2>Welcome{user ? `, ${user.name}` : ""}! 🗺️</h2>
          <p>Your TripVault dashboard</p>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="trips-section">
        <div className="trips-section-header">
          <h3>My Trips</h3>

          <button className="create-trip-button">
            + Create Trip
          </button>
        </div>

        {trips.length === 0 ? (
          <div className="empty-state">
            <h3>No trips yet 🌍</h3>
            <p>
              You haven't added any trips yet. Create your first trip to get
              started!
            </p>
          </div>
        ) : (
          <div className="trip-grid">
            {trips.map((trip) => (
              <div className="trip-card" key={trip._id}>
                <h3>{trip.title}</h3>

                <p>
                  <strong>📍 Destination:</strong> {trip.destination}
                </p>

                <p>
                  <strong>📅 Start:</strong> {formatDate(trip.startDate)}
                </p>

                <p>
                  <strong>📅 End:</strong> {formatDate(trip.endDate)}
                </p>

                <p>
                  <strong>⭐ Rating:</strong>{" "}
                  {trip.rating ? `${trip.rating}/5` : "Not rated"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}