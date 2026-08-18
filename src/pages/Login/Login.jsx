import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { validateLoginForm } from "../../utils/validators";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const result = login(form.email, form.password, form.remember);
    if (!result.success) {
      showToast(result.message, "error");
      return;
    }
    showToast(`Welcome back, ${result.user.name}!`, "success");
    // Send the user back to the page they were trying to reach (e.g. Reservation,
    // My Booking) if they were redirected here by ProtectedRoute; otherwise go home.
    const redirectTo = location.state?.from?.pathname || "/";
    navigate(redirectTo, { replace: true });
  };

  return (
    <section className="cv-auth-page d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="cv-card p-4 p-md-5">
              <h3 className="text-center mb-1">Welcome Back</h3>
              <p className="text-center text-muted mb-4">Login to manage your reservations</p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label>Email Address</label>
                  <div className="cv-input-icon">
                    <FiMail />
                    <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                  </div>
                  {errors.email && <span className="cv-error">{errors.email}</span>}
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <div className="cv-input-icon">
                    <FiLock />
                    <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
                  </div>
                  {errors.password && <span className="cv-error">{errors.password}</span>}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <label className="d-flex align-items-center gap-2 mb-0 small">
                    <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
                    Remember Me
                  </label>
                  <Link to="/contact" className="small text-primary-custom">Forgot Password?</Link>
                </div>

                <button type="submit" className="btn-primary-custom w-100 py-2 mb-3">Login</button>

                <button type="button" className="btn-google w-100">
                  <FcGoogle size={20} /> Continue with Google
                </button>

                <p className="text-center text-muted mt-4 mb-0 small">
                  Don't have an account? <Link to="/signup" className="text-primary-custom fw-semibold">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
