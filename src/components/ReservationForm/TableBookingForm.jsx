import { useState } from "react";
import { validateTableBookingForm } from "../../utils/validators";
import { useAuth } from "../../context/AuthContext";
import "./ReservationForm.css";
import "./TableBookingForm.css";

// Modal form shown when the user clicks "Book Table" on the My Booking page.
// Collects customer + reservation details to be combined with the selected food items and bill.
const TableBookingForm = ({ onClose, onConfirm }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequest: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateTableBookingForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onConfirm(form);
  };

  return (
    <div className="cv-modal-overlay" onClick={onClose}>
      <div className="cv-card cv-booking-form-modal p-4 p-md-5" onClick={(e) => e.stopPropagation()}>
        <h4 className="mb-1">Reserve Your Table</h4>
        <p className="text-muted small mb-4">
          Confirm your details below to book a table with your selected items.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
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

            <div className="col-12 d-flex gap-3 mt-2">
              <button type="button" className="btn-outline-cafe-custom flex-fill" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary-custom flex-fill">
                Confirm &amp; Generate Bill
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TableBookingForm;
