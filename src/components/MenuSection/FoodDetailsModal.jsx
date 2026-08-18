import { FiX, FiStar, FiClock, FiHeart } from "react-icons/fi";
import { useMenu } from "../../context/MenuContext";
import { useToast } from "../../context/ToastContext";
import "./FoodDetailsModal.css";
import "./FoodDetailsModal.css";

// Modal shown when a user clicks a menu item's image or "Details" button.
const FoodDetailsModal = ({ item, onClose }) => {
  const { wishlist, handleToggleWishlist } = useMenu();
  const { showToast } = useToast();
  const isWishlisted = wishlist.includes(item.id);

  const handleOrder = () => {
    showToast(`${item.name} added to your order (demo only)`, "success");
    onClose();
  };

  return (
    <div className="cv-modal-overlay" onClick={onClose}>
      <div className="cv-food-modal cv-card" onClick={(e) => e.stopPropagation()}>
        <button className="cv-modal-close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>
        <img src={item.image} alt={item.name} className="cv-food-modal-img" />
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h4 className="mb-0">{item.name}</h4>
              <span className="text-muted small">{item.category}</span>
            </div>
            <button
              className={`menu-wishlist-btn static ${isWishlisted ? "active" : ""}`}
              onClick={() => handleToggleWishlist(item.id)}
              aria-label="Toggle wishlist"
            >
              <FiHeart fill={isWishlisted ? "#c53030" : "none"} />
            </button>
          </div>

          <div className="d-flex align-items-center gap-2 my-2">
            <FiStar fill="#e9c46a" color="#e9c46a" />
            <strong>{item.rating}</strong>
            <span className="text-muted">/ 5.0</span>
          </div>

          <p className="text-muted">{item.description}</p>

          <div className="row g-3 my-3">
            <div className="col-4">
              <div className="cv-food-spec">
                <FiClock />
                <span>{item.prepTime}</span>
              </div>
            </div>
            <div className="col-4">
              <div className="cv-food-spec">
                <span>{item.calories} kcal</span>
              </div>
            </div>
            <div className="col-4">
              <div className="cv-food-spec">
                <span className={item.availability ? "text-success" : "text-danger"}>
                  {item.availability ? "In Stock" : "Sold Out"}
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <span className="fs-3 fw-bold text-primary-custom">₹{item.price}</span>
            <button className="btn-primary-custom px-4" onClick={handleOrder} disabled={!item.availability}>
              {item.availability ? "Order Now" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsModal;
