import { FiStar } from "react-icons/fi";
import reviews from "../../data/reviews.json";
import "./Testimonials.css";

// Displays customer reviews sourced from reviews.json.
const Testimonials = ({ limit }) => {
  const list = limit ? reviews.slice(0, limit) : reviews;

  return (
    <section className="cv-testimonials">
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow">Testimonials</span>
          <h2 className="section-title">What Our Guests Say</h2>
          <p className="section-subtitle">Real stories from our CafeVerse community</p>
        </div>
        <div className="row g-4">
          {list.map((t) => (
            <div className="col-lg-4 col-md-6" key={t.id}>
              <div className="cv-card p-4 h-100 fade-in-up">
                <div className="d-flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar key={i} size={14} fill={i < t.rating ? "#e9c46a" : "none"} color="#e9c46a" />
                  ))}
                </div>
                <p className="text-muted">&ldquo;{t.comment}&rdquo;</p>
                <div className="d-flex align-items-center gap-3 mt-3">
                  <img src={t.photo} alt={t.name} className="cv-avatar" />
                  <h6 className="mb-0">{t.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
