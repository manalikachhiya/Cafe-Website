import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import ContactForm from "../../components/ContactForm/ContactForm";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="cv-contact-page">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-eyebrow">We'd Love To Hear From You</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-3 col-6">
            <div className="cv-card p-4 text-center h-100">
              <FiMapPin size={24} className="text-primary-custom mb-2" />
              <h6>Address</h6>
              <p className="text-muted small mb-0">12 Brew Street, Mumbai, MH 400001</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="cv-card p-4 text-center h-100">
              <FiPhone size={24} className="text-primary-custom mb-2" />
              <h6>Phone</h6>
              <p className="text-muted small mb-0">+91 98765 43210</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="cv-card p-4 text-center h-100">
              <FiMail size={24} className="text-primary-custom mb-2" />
              <h6>Email</h6>
              <p className="text-muted small mb-0">hello@cafeverse.com</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="cv-card p-4 text-center h-100">
              <FiClock size={24} className="text-primary-custom mb-2" />
              <h6>Working Hours</h6>
              <p className="text-muted small mb-0">Mon–Sun: 8 AM – 11 PM</p>
            </div>
          </div>
        </div>

        <div className="row g-5">
          <div className="col-lg-6">
            <ContactForm />
          </div>
          <div className="col-lg-6">
            <div className="cv-map-placeholder cv-card d-flex align-items-center justify-content-center h-100">
              <div className="text-center text-muted">
                <FiMapPin size={40} className="mb-2" />
                <p className="mb-0">Google Map Placeholder</p>
                <small>12 Brew Street, Mumbai</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
