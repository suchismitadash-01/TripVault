import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    rating: "",
    photo: null,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [currentPhoto, setCurrentPhoto] = useState("");

  // Load the existing trip
  useEffect(() => {
    async function fetchTrip() {
      try {
        const response = await api.get(`/trips/${id}`);
        const trip = response.data;
        setCurrentPhoto(trip.coverImage || "");

        setFormData({
          title: trip.title || "",
          destination: trip.destination || "",
          startDate: trip.startDate
            ? new Date(trip.startDate).toISOString().split("T")[0]
            : "",
          endDate: trip.endDate
            ? new Date(trip.endDate).toISOString().split("T")[0]
            : "",
          description: trip.description || "",
          rating: trip.rating ? String(trip.rating) : "",
          photo: null,
        });
      } catch (err) {
        console.error("Fetch trip error:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load this trip. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTrip();
  }, [id, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      await api.put(`/trips/${id}`, {
        title: formData.title,
        destination: formData.destination,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        description: formData.description,
        rating: formData.rating ? Number(formData.rating) : undefined,
      });

    if (formData.photo) {
      const photoData = new FormData();
      photoData.append("image", formData.photo);

      await api.post(`/trips/${id}/upload`, photoData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    toast.success(
      formData.photo
        ? "Trip updated and photo uploaded successfully!"
        : "Trip updated successfully!"
    );

    navigate("/dashboard");
  } catch (err) {
    console.error("Update trip error:", err);

    const message =
      err.response?.data?.message ||
      "Unable to update trip. Please try again.";

    setError(message);
    toast.error(message);
  } finally {
    setSaving(false);
  }
}

  if (loading) {
    return (
      <div className="form-container">
        <p>Loading trip...</p>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="form-container">
        <p className="error-message">{error}</p>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Edit Trip ✏️</h2>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="trip-form">
        <label>
          Trip Title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter trip title"
            required
          />
        </label>

        <label>
          Destination
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter destination"
            required
          />
        </label>

        <label>
          Start Date
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </label>

        <label>
          End Date
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your trip"
            rows="4"
          />
        </label>

        <label>
          Rating
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          >
            <option value="">Select rating</option>
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐⭐</option>
            <option value="3">3 ⭐⭐⭐</option>
            <option value="4">4 ⭐⭐⭐⭐</option>
            <option value="5">5 ⭐⭐⭐⭐⭐</option>
          </select>
        </label>

        {currentPhoto && (
          <div className="current-photo-section">
            <p>Current Trip Photo</p>

            <img
            src={currentPhoto}
            alt={formData.title}
            className="edit-trip-photo"
            />
          </div>
        )}

        <label>
          Replace Trip Photo
          <input
            type="file"
            name="photo"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const file = e.target.files[0] || null;

              setFormData({
                ...formData,
                photo: file,
              });
            }}
          />
        </label>

        <button
          type="submit"
          className="submit-trip-button"
          disabled={saving}
        >
          {saving ? "Saving Changes..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}