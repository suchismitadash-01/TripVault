import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get("/auth/me");

        setFormData({
          username: response.data.username || "",
          bio: response.data.bio || "",
        });
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await api.put("/users/profile", formData);

      setSuccess("Profile updated successfully.");

      setTimeout(() => {
        navigate(`/profile/${formData.username.trim().toLowerCase()}`);
      }, 800);
    } catch (err) {
      console.error("Update profile error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to update profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Edit Profile</h2>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {success && (
        <p className="success-message">
          {success}
        </p>
      )}

      <form className="trip-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Bio
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="5"
            placeholder="Tell something about yourself..."
          />
        </label>

        <button
          type="submit"
          className="submit-trip-button"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}