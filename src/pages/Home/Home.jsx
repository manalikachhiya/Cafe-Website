import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import OfferBanner from "../../components/OfferBanner/OfferBanner";
import MenuSection from "../../components/MenuSection/MenuSection";
import Services from "../../components/Services/Services";
import Testimonials from "../../components/Testimonials/Testimonials";
import Newsletter from "../../components/Newsletter/Newsletter";
import galleryData from "../../data/gallery.json";
import { FiInstagram } from "react-icons/fi";
import "./Home.css";

const Home = () => {
  const galleryPreview = galleryData.slice(0, 6);

  return (
    <>
      <Hero />
      <About />
      <OfferBanner />
      <MenuSection />
      <Services />

      {/* Why Choose Us / Statistics */}
      <section className="cv-stats-banner">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <h2>40+</h2>
              <p>Menu Items</p>
            </div>
            <div className="col-6 col-md-3">
              <h2>10,000+</h2>
              <p>Happy Guests</p>
            </div>
            <div className="col-6 col-md-3">
              <h2>7+</h2>
              <p>Years of Service</p>
            </div>
            <div className="col-6 col-md-3">
              <h2>4.8/5</h2>
              <p>Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section>
        <div className="container">
          <div className="text-center">
            <span className="section-eyebrow">A Glimpse Inside</span>
            <h2 className="section-title">Our Gallery</h2>
            <p className="section-subtitle">Moments captured across our cafe</p>
          </div>
          <div className="row g-3">
            {galleryPreview.map((img) => (
              <div className="col-lg-2 col-md-4 col-6" key={img.id}>
                <div className="cv-gallery-preview-item zoom-img rounded-18">
                  <img src={img.image} alt={img.title} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/gallery">
              <button className="btn-outline-cafe-custom-lg">View Full Gallery</button>
            </Link>
          </div>
        </div>
      </section>

      <Testimonials limit={3} />

      {/* Instagram Feed UI */}
      <section className="bg-card">
        <div className="container text-center">
          <span className="section-eyebrow">Follow Along</span>
          <h2 className="section-title mb-4">@cafeverse.official</h2>
          <div className="row g-3">
            {galleryData.slice(6, 12).map((img) => (
              <div className="col-lg-2 col-md-4 col-6" key={img.id}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="cv-insta-item">
                  <img src={img.image} alt={img.title} loading="lazy" />
                  <div className="cv-insta-overlay">
                    <FiInstagram size={22} />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default Home;
