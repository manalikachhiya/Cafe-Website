import "./BookingCart.css";

// Live, auto-calculating bill shown at the bottom of the My Booking page.
const BillSummary = ({ billSummary, includeServiceCharge, setIncludeServiceCharge, onBookTable, disabled }) => {
  const { subtotal, gst, serviceCharge, grandTotal } = billSummary;

  return (
    <div className="cv-card cv-bill-summary p-4">
      <h5 className="mb-3">Your Bill</h5>

      <div className="cv-bill-row">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="cv-bill-row">
        <span>GST (5%)</span>
        <span>₹{gst.toFixed(2)}</span>
      </div>
      <div className="cv-bill-row">
        <label className="d-flex align-items-center gap-2 mb-0">
          <input
            type="checkbox"
            checked={includeServiceCharge}
            onChange={(e) => setIncludeServiceCharge(e.target.checked)}
          />
          Service Charge (5%, optional)
        </label>
        <span>₹{serviceCharge.toFixed(2)}</span>
      </div>

      <hr />

      <div className="cv-bill-row cv-bill-grand-total">
        <span>Grand Total</span>
        <span>₹{grandTotal.toFixed(2)}</span>
      </div>

      <button className="btn-primary-custom w-100 py-3 mt-4" onClick={onBookTable} disabled={disabled}>
        Book Table
      </button>
    </div>
  );
};

export default BillSummary;
