import { useState } from "react";
import { FiTrash2, FiClock } from "react-icons/fi";
import ReservationForm from "../../components/ReservationForm/ReservationForm";
import { getReservations, deleteReservation } from "../../utils/localStorage";
import { useToast } from "../../context/ToastContext";
import "./Reservation.css";

const Reservation = () => {
  const [history, setHistory] = useState(getReservations());
  const { showToast } = useToast();

  const handleDelete = (id) => {
    const updated = deleteReservation(id);
    setHistory(updated);
    showToast("Reservation cancelled", "info");
  };

  return (
    <section className="cv-reservation-page">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-eyebrow">Book Your Table</span>
          <h2 className="section-title">Reserve a Table</h2>
          <p className="section-subtitle mb-0">Secure your spot at CafeVerse in just a few clicks</p>
        </div>

        <div className="row justify-content-center g-5">
          <div className="col-lg-8">
            <ReservationForm />
          </div>
        </div>

        {history.length > 0 && (
          <div className="row justify-content-center mt-5 pt-4">
            <div className="col-lg-8">
              <h4 className="mb-4 d-flex align-items-center gap-2">
                <FiClock /> Your Reservation History
              </h4>
              <div className="d-flex flex-column gap-3">
                {history.map((r) => (
                  <div className="cv-card p-3 d-flex justify-content-between align-items-center flex-wrap gap-2" key={r.reservationId}>
                    <div>
                      <strong>{r.reservationId}</strong>
                      <p className="mb-0 text-muted small">
                        {r.fullName} &bull; {r.date} at {r.time} &bull; {r.guests} guests &bull; {r.tablePreference}
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className="badge-available">{r.status}</span>
                      <button className="cv-icon-btn cv-icon-btn-danger" onClick={() => handleDelete(r.reservationId)} aria-label="Cancel reservation">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reservation;
