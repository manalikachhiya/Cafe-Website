import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateReservationForm } from "../../utils/validators";
import { saveReservation } from "../../utils/localStorage";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import "./ReservationForm.css";

const TABLE_PREFERENCES = ["Indoor", "Outdoor Patio", "Window Side", "Private Room", "Bar Counter"];
const OCCASIONS = ["Casual Visit", "Birthday", "Meeting", "Family Gathering", "Couple / Date Night"];

// Full reservation form with validation and success modal, used on the Reservation page.
const ReservationForm = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    tablePreference: "",
    occasion: "",
    specialRequest: "",
  });
  const [errors, setErrors] = useState({});
  const [successReservation, setSuccessReservation] = useState(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateReservationForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    const reservation = saveReservation(form);
    setSuccessReservation(reservation);
    setForm({
      fullName: user?.name || "",
      email: user?.email || "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      tablePreference: "",
      occasion: "",
      specialRequest: "",
    });
  };

  const closeModal = () => {
    setSuccessReservation(null);
    navigate("/");
  };

  return (
    <div className="cv-card p-4 p-md-5">
      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-4">
          <div className="col-md-6">
            <label>Full Name *</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" />
            {errors.fullName && <span className="cv-error">{errors.fullName}</span>}
          </div>

          <div className="col-md-6">
            <label>Email Address *</label>
            <input name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
            {errors.email && <span className="cv-error">{errors.email}</span>}
          </div>

          <div className="col-md-6">
            <label>Phone Number *</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
            {errors.phone && <span className="cv-error">{errors.phone}</span>}
          </div>

          <div className="col-md-6">
            <label>Number of Guests *</label>
            <input type="number" min="1" max="20" name="guests" value={form.guests} onChange={handleChange} placeholder="e.g. 4" />
            {errors.guests && <span className="cv-error">{errors.guests}</span>}
          </div>

          <div className="col-md-6">
            <label>Reservation Date *</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} />
            {errors.date && <span className="cv-error">{errors.date}</span>}
          </div>

          <div className="col-md-6">
            <label>Reservation Time *</label>
            <input type="time" name="time" value={form.time} onChange={handleChange} />
            {errors.time && <span className="cv-error">{errors.time}</span>}
          </div>

          <div className="col-md-6">
            <label>Table Preference *</label>
            <select name="tablePreference" value={form.tablePreference} onChange={handleChange}>
              <option value="">Choose a preference</option>
              {TABLE_PREFERENCES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.tablePreference && <span className="cv-error">{errors.tablePreference}</span>}
          </div>

          <div className="col-md-6">
            <label>Occasion *</label>
            <select name="occasion" value={form.occasion} onChange={handleChange}>
              <option value="">Select occasion</option>
              {OCCASIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {errors.occasion && <span className="cv-error">{errors.occasion}</span>}
          </div>

          <div className="col-12">
            <label>Special Request</label>
            <textarea
              name="specialRequest"
              value={form.specialRequest}
              onChange={handleChange}
              rows="3"
              placeholder="Any special requirements? (optional)"
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn-primary-custom w-100 py-3 fs-6">
              Confirm Reservation
            </button>
          </div>
        </div>
      </form>

      {successReservation && (
        <div className="cv-modal-overlay">
          <div className="cv-modal cv-card p-4 text-center">
            <div className="cv-success-icon">✓</div>
            <h4 className="mt-3">Table Reserved!</h4>
            <p className="text-muted">
              Your reservation ID is <strong>{successReservation.reservationId}</strong>. We look
              forward to hosting you at CafeVerse!
            </p>
            <button className="btn-primary-custom mt-2" onClick={closeModal}>
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;
