import { FiArrowUp, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import useScrollTop from "../../hooks/useScrollTop";

// Floating action buttons: back-to-top, WhatsApp, and call — shown after scrolling.
const ScrollTop = () => {
  const visible = useScrollTop(300);

  return (
    <>
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="cv-floating-btn cv-whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <a href="tel:+919876543210" className="cv-floating-btn cv-call-btn" aria-label="Call us">
        <FiPhone />
      </a>
      {visible && (
        <button
          className="cv-floating-btn cv-scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <FiArrowUp />
        </button>
      )}
    </>
  );
};

export default ScrollTop;
