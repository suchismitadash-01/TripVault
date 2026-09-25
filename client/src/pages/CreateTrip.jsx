import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";

export default function CreateTrip() {
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
  setLoading(true);

  try {
    // Create the trip first
    const response = await api.post("/trips", {
      title: formData.title,
      destination: formData.destination,
      startDate: formData.startDate || undefined,
      endDate: formData.endDate || undefined,
      description: formData.description,
      rating: formData.rating ? Number(formData.rating) : undefined,
    });

    const createdTrip = response.data;

    // Upload photo if one was selected
    if (formData.photo) {
      const uploadData = new FormData();
      uploadData.append("image", formData.photo);

      await api.post(`/trips/${createdTrip._id}/upload`, uploadData);
    }

    // Show success message
    toast.success(
      formData.photo
        ? "Trip created and photo uploaded successfully!"
        : "Trip created successfully!"
    );
    // Return to dashboard after successful creation
    navigate("/dashboard");
  } catch (err) {
  console.error("Create trip error:", err);

  const message =
    err.response?.data?.message ||
    "Unable to create trip. Please try again.";

  setError(message);
  toast.error(message);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Create New Trip 🌍</h2>
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

        <label>
          Trip Photo
          <input
            type="file"
            name="photo"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) =>
              setFormData({
                ...formData,
                photo: e.target.files[0],
              })
            }
          />
        </label> 

        <button type="submit" className="submit-trip-button" disabled={loading}>
          {loading ? "Creating Trip..." : "Create Trip"}
        </button>
      </form>
    </div>
  );
}