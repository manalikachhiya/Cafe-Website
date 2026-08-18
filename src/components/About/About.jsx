import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import "./About.css";

// Cafe introduction section used on the Home page.
const About = () => {
  return (
    <section id="cv-intro" className="cv-about-intro">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="cv-about-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=900&q=80"
                alt="CafeVerse interior"
                className="rounded-18 shadow-sm"
              />
              <div className="cv-about-badge">
                <h3>7+</h3>
                <p>Years of Craft</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <span className="section-eyebrow">Our Story</span>
            <h2 className="section-title">A Cafe Built On Passion &amp; Flavor</h2>
            <p className="text-muted">
              CafeVerse began with a simple dream — to create a space where great coffee meets
              genuine hospitality. Every bean is carefully sourced, every dish crafted with love,
              and every visit designed to feel like coming home.
            </p>
            <ul className="cv-about-list list-unstyled">
              <li><FiCheckCircle /> 100% Ethically Sourced Coffee Beans</li>
              <li><FiCheckCircle /> Freshly Baked Pastries Daily</li>
              <li><FiCheckCircle /> Cozy, Work-Friendly Ambience</li>
              <li><FiCheckCircle /> Warm & Personalized Service</li>
            </ul>
            <Link to="/about">
              <button className="btn-primary-custom mt-2">Discover Our Story</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
