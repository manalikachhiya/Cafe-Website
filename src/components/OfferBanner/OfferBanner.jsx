import { FiTag, FiClock, FiGift } from "react-icons/fi";
import "./OfferBanner.css";

const OFFERS = [
  { icon: <FiTag />, title: "Weekend Discount", desc: "Flat 20% off on all beverages every Saturday & Sunday.", code: "WEEKEND20" },
  { icon: <FiClock />, title: "Happy Hours", desc: "Buy 1 Get 1 Free on Cold Coffee, 4 PM – 6 PM daily.", code: "HAPPYHOUR" },
  { icon: <FiGift />, title: "Festival Offer", desc: "Special festive combos starting at just ₹249.", code: "FEST249" },
];

// Special offers / coupons section shown on the homepage.
const OfferBanner = () => {
  return (
    <section className="cv-offers">
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow" style={{ color: "#fff" }}>Limited Time</span>
          <h2 className="section-title text-white">Special Offers</h2>
        </div>
        <div className="row g-4 mt-2">
          {OFFERS.map((o) => (
            <div className="col-lg-4" key={o.title}>
              <div className="cv-offer-card">
                <div className="cv-offer-icon">{o.icon}</div>
                <h5>{o.title}</h5>
                <p>{o.desc}</p>
                <span className="cv-offer-code">Use Code: {o.code}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;
