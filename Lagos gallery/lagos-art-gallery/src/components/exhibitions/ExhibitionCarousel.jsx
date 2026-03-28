import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { currentExhibitions } from "../../data/exhibitions";
import "./ExhibitionCarousel.scss";

export default function ExhibitionCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredExhibitions = currentExhibitions.filter((ex) => ex.featured);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredExhibitions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredExhibitions.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredExhibitions.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + featuredExhibitions.length) % featuredExhibitions.length,
    );
  };

  if (featuredExhibitions.length === 0) return null;

  const exhibition = featuredExhibitions[currentIndex];

  return (
    <section className="exhibition-carousel">
      <div className="container">
        <div className="section-header">
          <h2>Current Exhibitions</h2>
          <p>Must-see shows happening now in Lagos</p>
        </div>

        <div className="carousel-container">
          <button className="carousel-btn prev" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>

          <div className="carousel-slide">
            <div className="slide-image">
              <img src={exhibition.image} alt={exhibition.title} />
              <div className="slide-overlay">
                <span className="exhibition-badge">Featured Exhibition</span>
              </div>
            </div>
            <div className="slide-content">
              <h3>{exhibition.title}</h3>
              <p className="gallery-name">{exhibition.gallery}</p>
              <p className="artist-name">By: {exhibition.artist}</p>
              <p className="dates">
                {new Date(exhibition.startDate).toLocaleDateString()} -{" "}
                {new Date(exhibition.endDate).toLocaleDateString()}
              </p>
              <p className="description">{exhibition.description}</p>
              <button className="btn btn-primary">View Details</button>
            </div>
          </div>

          <button className="carousel-btn next" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="carousel-dots">
          {featuredExhibitions.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
