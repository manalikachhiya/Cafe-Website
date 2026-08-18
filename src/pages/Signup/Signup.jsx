import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { validateSignupForm } from "../../utils/validators";
import { registerUser } from "../../utils/localStorage";
import { useToast } from "../../context/ToastContext";
import "../Login/Login.css";

const initialForm = { name: "", email: "", phone: "", password: "", confirmPassword: "" };

const Signup = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSignupForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const result = registerUser({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });

    if (!result.success) {
      showToast(result.message, "error");
      return;
    }

    showToast("Account created successfully! Please login.", "success");
    navigate("/login");
  };

  return (
    <section className="cv-auth-page d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="cv-card p-4 p-md-5">
              <h3 className="text-center mb-1">Create Account</h3>
              <p className="text-center text-muted mb-4">Sign up to start reserving tables</p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label>Full Name</label>
                  <div className="cv-input-icon">
                    <FiUser />
                    <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
                  </div>
                  {errors.name && <span className="cv-error">{errors.name}</span>}
                </div>

                <div className="mb-3">
                  <label>Email Address</label>
                  <div className="cv-input-icon">
                    <FiMail />
                    <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                  </div>
                  {errors.email && <span className="cv-error">{errors.email}</span>}
                </div>

                <div className="mb-3">
                  <label>Phone Number</label>
                  <div className="cv-input-icon">
                    <FiPhone />
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                  </div>
                  {errors.phone && <span className="cv-error">{errors.phone}</span>}
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <div className="cv-input-icon">
                    <FiLock />
                    <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
                  </div>
                  {errors.password && <span className="cv-error">{errors.password}</span>}
                </div>

                <div className="mb-4">
                  <label>Confirm Password</label>
                  <div className="cv-input-icon">
                    <FiLock />
                    <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" />
                  </div>
                  {errors.confirmPassword && <span className="cv-error">{errors.confirmPassword}</span>}
                </div>

                <button type="submit" className="btn-primary-custom w-100 py-2 mb-3">Create Account</button>

                <p className="text-center text-muted mb-0 small">
                  Already have an account? <Link to="/login" className="text-primary-custom fw-semibold">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
