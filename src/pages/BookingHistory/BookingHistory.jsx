import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { getBookingHistory, deleteBookingHistory } from "../../utils/localStorage";
import { useToast } from "../../context/ToastContext";
import "./BookingHistory.css";

// Shows all confirmed table bookings (reservation + selected food items + bill).
const BookingHistory = () => {
  const [history, setHistory] = useState(getBookingHistory());
  const { showToast } = useToast();

  const handleDelete = (bookingId) => {
    const updated = deleteBookingHistory(bookingId);
    setHistory(updated);
    showToast("Booking deleted", "info");
  };

  return (
    <section className="cv-booking-history-page">
      <div className="container">
        <div className="text-center mb-4">
          <span className="section-eyebrow">Past Reservations</span>
          <h2 className="section-title">Booking History</h2>
          <p className="section-subtitle mb-0">All table bookings made with selected food items</p>
        </div>

        {history.length === 0 ? (
          <div className="cv-empty-booking cv-card">
            <FiShoppingBag size={48} className="text-primary-custom mb-3" />
            <h5>No bookings yet</h5>
            <p className="text-muted mb-4">
              Once you reserve a table with selected menu items, it will appear here.
            </p>
            <Link to="/menu">
              <button className="btn-primary-custom">Browse Menu</button>
            </Link>
          </div>
        ) : (
          <div className="table-responsive cv-card p-3">
            <table className="table cv-booking-history-table align-middle mb-0">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Food Items</th>
                  <th>Bill Amount</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.map((b) => (
                  <tr key={b.bookingId}>
                    <td className="fw-semibold">{b.bookingId}</td>
                    <td>{b.fullName}</td>
                    <td>{b.date}</td>
                    <td>
                      {b.items?.length || 0} item{b.items?.length === 1 ? "" : "s"}
                    </td>
                    <td>₹{b.grandTotal?.toFixed(2)}</td>
                    <td>
                      <span className="badge-available">{b.status}</span>
                    </td>
                    <td className="text-end">
                      <Link to={`/bill/${b.bookingId}`} className="cv-icon-btn" aria-label="View bill">
                        <FiEye />
                      </Link>
                      <button
                        className="cv-icon-btn cv-icon-btn-danger ms-2"
                        onClick={() => handleDelete(b.bookingId)}
                        aria-label="Delete booking"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingHistory;
