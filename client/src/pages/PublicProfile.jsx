import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

export default function PublicProfile() {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get(
          `/users/${username}/profile`
        );

        setProfile(response.data);
      } catch (err) {
        console.error("Public profile error:", err);

        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Unable to load profile.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [username]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return (
      <div className="public-profile-page">
        <h2>Profile Not Found</h2>
        <p>{error}</p>

        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  if (!profile) {
    return <p>Profile not found.</p>;
  }

  return (
    <div className="public-profile-page">
      <div className="profile-header">
        <h1>{profile.name}</h1>

        <p className="profile-username">
          @{profile.username}
        </p>

        <Link to="/edit-profile" className="edit-profile-button">
          ✏️ Edit Profile
        </Link>

        {profile.bio && (
          <p className="profile-bio">
            {profile.bio}
          </p>
        )}
      </div>

      <div className="profile-trips">
        <h2>Travel Memories</h2>

        {profile.trips && profile.trips.length > 0 ? (
          <div className="public-trip-grid">
            {profile.trips.map((trip) => (
              <div
                key={trip._id}
                className="public-trip-card"
              >
                {trip.coverImage && (
                  <img
                    src={trip.coverImage}
                    alt={trip.title}
                    className="public-trip-image"
                  />
                )}

                <div className="public-trip-content">
                  <h3>{trip.title}</h3>

                  <p>
                    <strong>Destination:</strong>{" "}
                    {trip.destination}
                  </p>

                  {trip.startDate && (
                    <p>
                      <strong>Start:</strong>{" "}
                      {new Date(
                        trip.startDate
                      ).toLocaleDateString()}
                    </p>
                  )}

                  {trip.endDate && (
                    <p>
                      <strong>End:</strong>{" "}
                      {new Date(
                        trip.endDate
                      ).toLocaleDateString()}
                    </p>
                  )}

                  {trip.rating && (
                    <p>
                      <strong>Rating:</strong>{" "}
                      {trip.rating}/5
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No travel memories yet.</p>
        )}
      </div>
    </div>
  );
}