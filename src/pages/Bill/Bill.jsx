import { useParams, Link } from "react-router-dom";
import { FiPrinter, FiDownload, FiArrowLeft } from "react-icons/fi";
import jsPDF from "jspdf";
import { getBookingById } from "../../utils/localStorage";
import InvoiceView from "../../components/BookingCart/InvoiceView";
import "./Bill.css";

// Professional invoice page for a single booking, with print and PDF download actions.
const Bill = () => {
  const { bookingId } = useParams();
  const booking = getBookingById(bookingId);

  const handlePrint = () => window.print();

  const handleDownloadPdf = () => {
    if (!booking) return;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const marginX = 48;
    let y = 60;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(111, 78, 55);
    doc.text("CafeVerse", marginX, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    y += 16;
    doc.text("12 Brew Street, Mumbai, MH 400001", marginX, y);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(30, 30, 30);
    doc.text("INVOICE", 420, 60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Invoice No: ${booking.invoiceNumber}`, 420, 76);
    doc.text(`Booking No: ${booking.bookingId}`, 420, 90);
    doc.text(`Date: ${new Date(booking.createdAt).toLocaleDateString()}`, 420, 104);

    y = 130;
    doc.setDrawColor(230, 220, 210);
    doc.line(marginX, y, 547, y);

    y += 26;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);
    doc.text("Billed To", marginX, y);
    doc.text("Reservation Details", 340, y);

    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(booking.fullName || "-", marginX, y);
    doc.text(`Date: ${booking.date}`, 340, y);

    y += 14;
    doc.text(booking.email || "-", marginX, y);
    doc.text(`Time: ${booking.time}`, 340, y);

    y += 14;
    doc.text(booking.phone || "-", marginX, y);
    doc.text(`Guests: ${booking.guests}`, 340, y);

    y += 30;
    doc.setFillColor(250, 244, 236);
    doc.rect(marginX, y, 499, 20, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(90, 62, 43);
    doc.text("Item", marginX + 8, y + 14);
    doc.text("Qty", 340, y + 14);
    doc.text("Price", 410, y + 14);
    doc.text("Total", 490, y + 14);

    y += 30;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    (booking.items || []).forEach((item) => {
      doc.text(item.name, marginX + 8, y);
      doc.text(String(item.quantity), 340, y);
      doc.text(`Rs.${item.price.toFixed(2)}`, 410, y);
      doc.text(`Rs.${(item.price * item.quantity).toFixed(2)}`, 490, y);
      y += 18;
    });

    y += 12;
    doc.setDrawColor(230, 220, 210);
    doc.line(340, y, 547, y);
    y += 18;

    doc.text("Subtotal", 340, y);
    doc.text(`Rs.${booking.subtotal.toFixed(2)}`, 490, y);
    y += 16;

    doc.text("GST (5%)", 340, y);
    doc.text(`Rs.${booking.gst.toFixed(2)}`, 490, y);
    y += 16;

    if (booking.serviceCharge > 0) {
      doc.text("Service Charge", 340, y);
      doc.text(`Rs.${booking.serviceCharge.toFixed(2)}`, 490, y);
      y += 16;
    }

    doc.setDrawColor(111, 78, 55);
    doc.line(340, y, 547, y);
    y += 16;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(111, 78, 55);
    doc.text("Grand Total", 340, y);
    doc.text(`Rs.${booking.grandTotal.toFixed(2)}`, 490, y);

    y += 50;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(11);
    doc.setTextColor(120, 100, 85);
    doc.text("Thank you for choosing CafeVerse!", marginX, y);

    doc.save(`CafeVerse-Invoice-${booking.invoiceNumber}.pdf`);
  };

  if (!booking) {
    return (
      <section className="cv-bill-page">
        <div className="container text-center py-5">
          <h4>Booking Not Found</h4>
          <p className="text-muted">This invoice doesn't exist or has been deleted.</p>
          <Link to="/booking-history">
            <button className="btn-primary-custom">Back to Booking History</button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cv-bill-page">
      <div className="container">
        <div className="cv-bill-actions d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <Link to="/booking-history" className="d-inline-flex align-items-center gap-2 cv-history-link">
            <FiArrowLeft /> Back to Booking History
          </Link>
          <div className="d-flex gap-2">
            <button className="btn-outline-cafe-custom d-flex align-items-center gap-2" onClick={handlePrint}>
              <FiPrinter /> Print Bill
            </button>
            <button className="btn-primary-custom d-flex align-items-center gap-2" onClick={handleDownloadPdf}>
              <FiDownload /> Download PDF
            </button>
          </div>
        </div>

        <InvoiceView booking={booking} />
      </div>
    </section>
  );
};

export default Bill;
