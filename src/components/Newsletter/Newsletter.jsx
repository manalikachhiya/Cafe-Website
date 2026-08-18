import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useToast } from "../../context/ToastContext";
import { isValidEmail } from "../../utils/validators";
import { subscribeNewsletter } from "../../utils/localStorage";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    subscribeNewsletter(email);
    showToast("You're subscribed! Look out for our special offers.", "success");
    setEmail("");
  };

  return (
    <section className="cv-newsletter">
      <div className="container">
        <div className="cv-newsletter-box cv-card p-5 text-center">
          <span className="section-eyebrow">Stay In The Loop</span>
          <h2 className="section-title">Get Exclusive Cafe Updates</h2>
          <p className="section-subtitle mb-4">
            Subscribe for special offers, new menu launches, and cafe events.
          </p>
          <form className="cv-newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button type="submit" className="btn-primary-custom d-flex align-items-center gap-2">
              Subscribe <FiSend size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
