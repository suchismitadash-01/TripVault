import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTrip() {
      try {
        const response = await api.get(`/trips/${id}`);
        setTrip(response.data);
      } catch (err) {
        console.error("Fetch trip error:", err);

        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Unable to load trip details.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTrip();
  }, [id]);

  if (loading) {
    return <p>Loading trip details...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!trip) {
    return <p>Trip not found.</p>;
  }

  return (
    <div className="trip-details-page">
      <button onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <h1>{trip.title}</h1>

      <p>
        <strong>Destination:</strong> {trip.destination}
      </p>

      {trip.startDate && (
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(trip.startDate).toLocaleDateString()}
        </p>
      )}

      {trip.endDate && (
        <p>
          <strong>End Date:</strong>{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </p>
      )}

      {trip.rating && (
        <p>
          <strong>Rating:</strong> {trip.rating}/5
        </p>
      )}

      {trip.description && (
        <div>
          <h2>Description</h2>
          <p>{trip.description}</p>
        </div>
      )}

      <h2>Trip Photos</h2>

      {trip.photos && trip.photos.length > 0 ? (
        <div className="photo-grid">
          {trip.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`${trip.title} ${index + 1}`}
              className="trip-photo"
            />
          ))}
        </div>
      ) : (
        <p>No photos uploaded for this trip yet.</p>
      )}
    </div>
  );
}