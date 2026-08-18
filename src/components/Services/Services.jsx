import { FiCoffee, FiWifi, FiShoppingBag, FiTruck, FiSun, FiUsers } from "react-icons/fi";
import "./Services.css";

const SERVICES = [
  { icon: <FiCoffee />, title: "Premium Coffee", desc: "Freshly roasted, ethically sourced beans brewed to perfection." },
  { icon: <FiWifi />, title: "Free WiFi", desc: "Stay connected while you sip, work, or relax." },
  { icon: <FiShoppingBag />, title: "Take Away", desc: "Grab your favorites on the go with our quick takeaway service." },
  { icon: <FiTruck />, title: "Home Delivery", desc: "Enjoy CafeVerse specials delivered right to your doorstep." },
  { icon: <FiSun />, title: "Outdoor Seating", desc: "Soak in the sun with our beautiful garden and patio seating." },
  { icon: <FiUsers />, title: "Private Events", desc: "Host birthdays, meetings, and celebrations in our private space." },
];

const Services = () => {
  return (
    <section className="cv-services">
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow">What We Offer</span>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Everything you need for the perfect cafe experience</p>
        </div>
        <div className="row g-4">
          {SERVICES.map((s, i) => (
            <div className="col-lg-4 col-md-6" key={s.title}>
              <div className="cv-card p-4 d-flex gap-3 align-items-start h-100 fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="cv-service-icon">{s.icon}</div>
                <div>
                  <h5>{s.title}</h5>
                  <p className="text-muted small mb-0">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
