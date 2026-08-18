import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import "./Hero.css";

// Large hero banner shown at the top of the homepage.
const Hero = () => {
  return (
    <section className="cv-hero d-flex align-items-center">
      <div className="container">
        <div className="cv-hero-content fade-in-up">
          <span className="cv-hero-badge">Est. 2018 — Handcrafted Coffee Culture</span>
          <h1 className="cv-hero-title">
            Where Every Cup Tells a <span>Story</span>
          </h1>
          <p className="cv-hero-subtitle">
            Freshly roasted coffee, artisan food, and a warm space to slow down — welcome to
            CafeVerse.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <Link to="/reservation">
              <button className="btn-accent-custom">Reserve a Table</button>
            </Link>
            <Link to="/menu">
              <button className="btn-outline-custom">Explore Menu</button>
            </Link>
          </div>
        </div>
      </div>

      <a href="#cv-intro" className="cv-scroll-indicator" aria-label="Scroll down">
        <FiChevronDown size={26} />
      </a>
    </section>
  );
};

export default Hero;
