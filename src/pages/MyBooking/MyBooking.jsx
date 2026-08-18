import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiClock } from "react-icons/fi";
import { useBookingCart } from "../../context/BookingCartContext";
import { useToast } from "../../context/ToastContext";
import BookingItemRow from "../../components/BookingCart/BookingItemRow";
import BillSummary from "../../components/BookingCart/BillSummary";
import TableBookingForm from "../../components/ReservationForm/TableBookingForm";
import { saveBookingHistory } from "../../utils/localStorage";
import "./MyBooking.css";

// Shows all menu items the user has selected via "Add to Booking", lets them adjust
// quantities, view a live bill, and proceed to reserve a table with those items.
const MyBooking = () => {
  const { cartItems, increaseQty, decreaseQty, removeItem, clearCart, includeServiceCharge, setIncludeServiceCharge, billSummary } =
    useBookingCart();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleConfirmBooking = (customerDetails) => {
    const booking = saveBookingHistory({
      ...customerDetails,
      items: cartItems,
      subtotal: billSummary.subtotal,
      gst: billSummary.gst,
      serviceCharge: billSummary.serviceCharge,
      grandTotal: billSummary.grandTotal,
    });

    clearCart();
    setShowBookingForm(false);
    showToast("Table reserved successfully! Here is your bill.", "success");
    navigate(`/bill/${booking.bookingId}`);
  };

  return (
    <section className="cv-my-booking-page">
      <div className="container">
        <div className="text-center mb-4">
          <span className="section-eyebrow">Your Selection</span>
          <h2 className="section-title">My Booking</h2>
          <p className="section-subtitle mb-0">
            Review your selected food items before reserving your table
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="cv-empty-booking cv-card">
            <FiShoppingBag size={48} className="text-primary-custom mb-3" />
            <h5>No items selected yet</h5>
            <p className="text-muted mb-4">
              Browse our menu and click "Add to Booking" on any dish to reserve it with your table.
            </p>
            <Link to="/menu">
              <button className="btn-primary-custom">Browse Menu</button>
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="d-flex flex-column gap-3">
                {cartItems.map((item) => (
                  <BookingItemRow
                    key={item.id}
                    item={item}
                    onIncrease={increaseQty}
                    onDecrease={decreaseQty}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>

            <div className="col-lg-5">
              <BillSummary
                billSummary={billSummary}
                includeServiceCharge={includeServiceCharge}
                setIncludeServiceCharge={setIncludeServiceCharge}
                onBookTable={() => setShowBookingForm(true)}
                disabled={cartItems.length === 0}
              />
            </div>
          </div>
        )}

        <div className="text-center mt-5">
          <Link to="/booking-history" className="d-inline-flex align-items-center gap-2 cv-history-link">
            <FiClock /> View Your Booking History
          </Link>
        </div>
      </div>

      {showBookingForm && (
        <TableBookingForm onClose={() => setShowBookingForm(false)} onConfirm={handleConfirmBooking} />
      )}
    </section>
  );
};

export default MyBooking;
