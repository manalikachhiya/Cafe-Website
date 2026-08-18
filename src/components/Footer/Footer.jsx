import { useState } from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiMapPin, FiPhone, FiMail, FiSend } from "react-icons/fi";
import { subscribeNewsletter } from "../../utils/localStorage";
import { isValidEmail } from "../../utils/validators";
import { useToast } from "../../context/ToastContext";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    subscribeNewsletter(email);
    showToast("Thanks for subscribing to CafeVerse!", "success");
    setEmail("");
  };

  return (
    <footer className="cv-footer">
      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <h4 className="cv-logo mb-3">Cafe<span>Verse</span></h4>
            <p className="text-white-50">
              A modern cafe crafting premium coffee experiences, delicious food, and a cozy
              space to relax, work, and connect.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FiFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FiTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase fw-bold mb-3">Company</h6>
            <ul className="list-unstyled cv-footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/menu">Our Menu</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Careers</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase fw-bold mb-3">Support</h6>
            <ul className="list-unstyled cv-footer-links">
              <li><Link to="/contact">Help Center</Link></li>
              <li><Link to="/contact">FAQ</Link></li>
              <li><Link to="/contact">Privacy Policy</Link></li>
              <li><Link to="/contact">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h6 className="text-uppercase fw-bold mb-3">Stay Updated</h6>
            <p className="text-white-50 small">Subscribe for special offers and new menu launches.</p>
            <form className="cv-footer-newsletter" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button type="submit" aria-label="Subscribe"><FiSend /></button>
            </form>
            <ul className="list-unstyled cv-footer-links mt-3">
              <li className="d-flex align-items-center gap-2"><FiMapPin /> 12 Brew Street, Mumbai, MH 400001</li>
              <li className="d-flex align-items-center gap-2"><FiPhone /> +91 98765 43210</li>
              <li className="d-flex align-items-center gap-2"><FiMail /> hello@cafeverse.com</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="cv-footer-bottom text-center py-3">
        <p className="mb-0 text-white-50">&copy; {year} CafeVerse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
