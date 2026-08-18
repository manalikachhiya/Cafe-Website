import { Link } from "react-router-dom";
import { useMenu } from "../../context/MenuContext";
import MenuCard from "../MenuCard/MenuCard";
import FoodDetailsModal from "./FoodDetailsModal";
import { useState } from "react";
import "./MenuSection.css";

// "Popular Menu" preview section shown on the Home page.
const MenuSection = () => {
  const { menu } = useMenu();
  const [activeItem, setActiveItem] = useState(null);
  const popular = [...menu].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <section className="cv-menu-section bg-card">
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow">Handpicked For You</span>
          <h2 className="section-title">Popular Menu</h2>
          <p className="section-subtitle">Our guests' most-loved dishes and drinks</p>
        </div>
        <div className="row g-4">
          {popular.map((item) => (
            <div className="col-lg-4 col-md-6" key={item.id}>
              <MenuCard item={item} onViewDetails={setActiveItem} />
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <Link to="/menu">
            <button className="btn-primary-custom px-4 py-2">View Full Menu</button>
          </Link>
        </div>
      </div>

      {activeItem && <FoodDetailsModal item={activeItem} onClose={() => setActiveItem(null)} />}
    </section>
  );
};

export default MenuSection;
