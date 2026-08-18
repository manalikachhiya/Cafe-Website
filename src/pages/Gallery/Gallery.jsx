import { useState } from "react";
import galleryData from "../../data/gallery.json";
import GalleryComponent from "../../components/Gallery/Gallery";
import "./Gallery.css";

const CATEGORIES = ["All", "Interior", "Exterior", "Food", "Coffee Art", "Chef"];

const GalleryPage = () => {
  const [category, setCategory] = useState("All");

  const filtered =
    category === "All" ? galleryData : galleryData.filter((img) => img.category === category);

  return (
    <section className="cv-gallery-page">
      <div className="container">
        <div className="text-center mb-4">
          <span className="section-eyebrow">Visual Stories</span>
          <h2 className="section-title">Our Gallery</h2>
          <p className="section-subtitle mb-0">A closer look at CafeVerse — our food, our space, our people</p>
        </div>

        <div className="cv-gallery-filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`cv-gallery-filter-btn ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <GalleryComponent images={filtered} />
      </div>
    </section>
  );
};

export default GalleryPage;
