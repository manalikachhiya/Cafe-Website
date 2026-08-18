import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiHeart, FiStar, FiClock, FiCalendar } from "react-icons/fi";
import { useMenu } from "../../context/MenuContext";
import { useToast } from "../../context/ToastContext";
import { useBookingCart } from "../../context/BookingCartContext";
import { useAuth } from "../../context/AuthContext";
import "./MenuCard.css";

// Card used to display a single menu item, with wishlist and "order now" (UI only) actions.
const MenuCard = ({ item, onViewDetails }) => {
  const { wishlist, handleToggleWishlist } = useMenu();
  const { showToast } = useToast();
  const { addItem } = useBookingCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isWishlisted = wishlist.includes(item.id);

  const handleOrder = () => {
    showToast(`${item.name} added to your order (demo only)`, "success");
  };

  const handleAddToBooking = () => {
    if (!isAuthenticated) {
      showToast("Please login to add items to your booking.", "error");
      navigate("/login", { state: { from: location } });
      return;
    }
    addItem(item);
  };

  return (
    <div className="cv-card menu-card h-100 fade-in-up">
      <div className="zoom-img position-relative" style={{ height: 190 }} onClick={() => onViewDetails?.(item)}>
        <img src={item.image} alt={item.name} loading="lazy" />
        <span className={`menu-badge ${item.availability ? "badge-available" : "badge-unavailable"}`}>
          {item.availability ? "Available" : "Sold Out"}
        </span>
        <button
          className={`menu-wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleToggleWishlist(item.id);
          }}
          aria-label="Toggle wishlist"
        >
          <FiHeart fill={isWishlisted ? "#c53030" : "none"} />
        </button>
      </div>

      <div className="p-3">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <h5 className="mb-0">{item.name}</h5>
          <div className="menu-rating">
            <FiStar fill="#e9c46a" color="#e9c46a" size={13} /> {item.rating}
          </div>
        </div>
        <span className="text-muted small">{item.category}</span>
        <p className="text-muted small mt-2 mb-2 menu-desc">{item.description}</p>

        <div className="d-flex align-items-center gap-3 text-muted small mb-3">
          <span className="d-flex align-items-center gap-1"><FiClock size={13} /> {item.prepTime}</span>
          <span>{item.calories} kcal</span>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold fs-5 text-primary-custom">₹{item.price}</span>
          <div className="d-flex gap-2">
            <button className="btn-outline-cafe-custom" onClick={() => onViewDetails?.(item)}>
              Details
            </button>
            <button className="btn-primary-custom btn-sm-order" onClick={handleOrder} disabled={!item.availability}>
              Order Now
            </button>
          </div>
        </div>

        <button
          className="btn-outline-cafe-custom w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
          onClick={handleAddToBooking}
          disabled={!item.availability}
        >
          <FiCalendar size={14} /> Add to Booking
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
