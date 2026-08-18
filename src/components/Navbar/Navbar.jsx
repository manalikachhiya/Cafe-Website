import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiShoppingBag } from "react-icons/fi";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { useAuth } from "../../context/AuthContext";
import { useBookingCart } from "../../context/BookingCartContext";
import "./Navbar.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reservation", label: "Reservation" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useBookingCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={`cv-navbar ${scrolled ? "cv-navbar-scrolled" : ""}`}>
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="cv-logo" onClick={() => setOpen(false)}>
          Cafe<span>Verse</span>
        </Link>

        <div className={`cv-nav-links ${open ? "cv-nav-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `cv-nav-link ${isActive ? "active" : ""}`}
              onClick={() => setOpen(false)}
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}

          <NavLink
            to="/my-booking"
            className={({ isActive }) => `cv-nav-link cv-nav-link-booking ${isActive ? "active" : ""}`}
            onClick={() => setOpen(false)}
          >
            <FiShoppingBag size={15} className="me-1" />
            My Booking
            {itemCount > 0 && <span className="cv-nav-badge">{itemCount}</span>}
          </NavLink>

          <div className="cv-nav-auth">
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span className="cv-user-chip">
                  <FiUser size={14} className="me-1" />
                  {user.name?.split(" ")[0]}
                </span>
                <button className="btn-outline-custom btn-sm-custom" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink to="/login" className="cv-nav-link" onClick={() => setOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/signup" onClick={() => setOpen(false)}>
                  <button className="btn-primary-custom btn-sm-custom">Signup</button>
                </NavLink>
              </>
            )}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <DarkModeToggle />
          <button className="cv-hamburger" onClick={() => setOpen((o) => !o)} aria-label="Toggle navigation menu">
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
