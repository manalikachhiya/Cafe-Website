import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import "./BookingCart.css";

// Displays a single selected menu item on the My Booking page with quantity controls.
const BookingItemRow = ({ item, onIncrease, onDecrease, onRemove }) => {
  const total = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cv-card cv-booking-item-row p-3 d-flex align-items-center gap-3 flex-wrap">
      <img src={item.image} alt={item.name} className="cv-booking-item-img" />

      <div className="flex-grow-1 cv-booking-item-info">
        <h6 className="mb-1">{item.name}</h6>
        <span className="text-muted small">{item.category}</span>
        <div className="text-primary-custom fw-semibold mt-1">₹{item.price} / item</div>
      </div>

      <div className="cv-qty-control">
        <button onClick={() => onDecrease(item.id)} aria-label="Decrease quantity">
          <FiMinus size={14} />
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onIncrease(item.id)} aria-label="Increase quantity">
          <FiPlus size={14} />
        </button>
      </div>

      <div className="cv-booking-item-total text-end">
        <div className="text-muted small">Total</div>
        <div className="fw-bold fs-6">₹{total}</div>
      </div>

      <button className="cv-icon-btn cv-icon-btn-danger" onClick={() => onRemove(item.id)} aria-label="Remove item">
        <FiTrash2 />
      </button>
    </div>
  );
};

export default BookingItemRow;
