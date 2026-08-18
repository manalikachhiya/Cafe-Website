import "./InvoiceView.css";

// Professional, printable invoice layout. Used on the Bill page.
// Wrapped content uses id="cv-invoice" so it can be targeted for print/PDF export.
const InvoiceView = ({ booking }) => {
  if (!booking) return null;

  const {
    bookingId,
    invoiceNumber,
    fullName,
    email,
    phone,
    date,
    time,
    guests,
    items = [],
    subtotal = 0,
    gst = 0,
    serviceCharge = 0,
    grandTotal = 0,
    createdAt,
  } = booking;

  return (
    <div id="cv-invoice" className="cv-invoice cv-card">
      <div className="cv-invoice-header">
        <div className="cv-invoice-brand">
          <div className="cv-invoice-logo">☕</div>
          <div>
            <h3 className="mb-0">CafeVerse</h3>
            <span className="text-muted small">12 Brew Street, Mumbai, MH 400001</span>
          </div>
        </div>
        <div className="text-end">
          <h5 className="mb-1 text-primary-custom">INVOICE</h5>
          <span className="text-muted small d-block">Invoice No: {invoiceNumber}</span>
          <span className="text-muted small d-block">Booking No: {bookingId}</span>
          <span className="text-muted small d-block">
            Date: {createdAt ? new Date(createdAt).toLocaleDateString() : "-"}
          </span>
        </div>
      </div>

      <hr />

      <div className="row g-3 cv-invoice-meta">
        <div className="col-md-6">
          <h6 className="text-muted small text-uppercase mb-2">Billed To</h6>
          <p className="mb-1 fw-semibold">{fullName}</p>
          <p className="mb-1 text-muted small">{email}</p>
          <p className="mb-0 text-muted small">{phone}</p>
        </div>
        <div className="col-md-6 text-md-end">
          <h6 className="text-muted small text-uppercase mb-2">Reservation Details</h6>
          <p className="mb-1 text-muted small">Date: {date}</p>
          <p className="mb-1 text-muted small">Time: {time}</p>
          <p className="mb-0 text-muted small">Guests: {guests}</p>
        </div>
      </div>

      <div className="table-responsive mt-4">
        <table className="table cv-invoice-table align-middle mb-0">
          <thead>
            <tr>
              <th>Item</th>
              <th className="text-center">Qty</th>
              <th className="text-end">Price</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-end">₹{item.price.toFixed(2)}</td>
                <td className="text-end">₹{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cv-invoice-totals">
        <div className="cv-invoice-totals-row">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="cv-invoice-totals-row">
          <span>GST (5%)</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>
        {serviceCharge > 0 && (
          <div className="cv-invoice-totals-row">
            <span>Service Charge</span>
            <span>₹{serviceCharge.toFixed(2)}</span>
          </div>
        )}
        <div className="cv-invoice-totals-row cv-invoice-grand-total">
          <span>Grand Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="cv-invoice-thankyou text-center">
        <p className="mb-0 fw-semibold">Thank you for choosing CafeVerse! ☕</p>
        <p className="text-muted small mb-0">We look forward to hosting you.</p>
      </div>
    </div>
  );
};

export default InvoiceView;
