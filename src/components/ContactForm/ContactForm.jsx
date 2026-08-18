import { useState } from "react";
import { validateContactForm } from "../../utils/validators";
import { useToast } from "../../context/ToastContext";
import "../ReservationForm/ReservationForm.css";

const initialForm = { name: "", email: "", subject: "", message: "" };

// Contact page enquiry form with validation.
const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateContactForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      showToast("Please fix the errors in the form", "error");
      return;
    }
    showToast("Your message has been sent! We'll get back to you soon.", "success");
    setForm(initialForm);
  };

  return (
    <div className="cv-card p-4 p-md-5">
      <h4 className="mb-4">Send Us a Message</h4>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label>Name *</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
          {errors.name && <span className="cv-error">{errors.name}</span>}
        </div>
        <div className="mb-3">
          <label>Email *</label>
          <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
          {errors.email && <span className="cv-error">{errors.email}</span>}
        </div>
        <div className="mb-3">
          <label>Subject</label>
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" />
        </div>
        <div className="mb-3">
          <label>Message *</label>
          <textarea name="message" rows="4" value={form.message} onChange={handleChange} placeholder="Your message" />
          {errors.message && <span className="cv-error">{errors.message}</span>}
        </div>
        <button type="submit" className="btn-primary-custom w-100 py-2">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
