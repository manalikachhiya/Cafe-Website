import { useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Gallery.css";

// Masonry-style image gallery with a lightbox preview, used on the Gallery page.
const Gallery = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);
  const showPrev = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  };
  const showNext = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i + 1) % images.length);
  };

  return (
    <>
      <div className="cv-masonry">
        {images.map((img, i) => (
          <div className="cv-masonry-item fade-in" key={img.id} onClick={() => openLightbox(i)}>
            <img src={img.image} alt={img.title} loading="lazy" />
            <div className="cv-masonry-overlay">
              <span>{img.title}</span>
              <small>{img.category}</small>
            </div>
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="cv-lightbox-overlay" onClick={closeLightbox}>
          <button className="cv-lightbox-close" onClick={closeLightbox} aria-label="Close preview">
            <FiX />
          </button>
          <button className="cv-lightbox-nav cv-lightbox-prev" onClick={showPrev} aria-label="Previous image">
            <FiChevronLeft />
          </button>
          <img
            src={images[activeIndex].image}
            alt={images[activeIndex].title}
            className="cv-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="cv-lightbox-nav cv-lightbox-next" onClick={showNext} aria-label="Next image">
            <FiChevronRight />
          </button>
          <p className="cv-lightbox-caption">{images[activeIndex].title}</p>
        </div>
      )}
    </>
  );
};

export default Gallery;
