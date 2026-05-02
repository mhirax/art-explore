import { useState, useEffect, useRef } from "react";
import { Search, Shuffle, MapPin } from "lucide-react";
import "./Hero.scss";

const CATEGORIES = ["All", "Gallery", "Museum", "Studio", "Art center"];

export default function Hero({ galleries = [], onSearch, onSurprise, onCategoryFilter }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const intervalRef = useRef(null);

  const slides = galleries.map((g) => ({
    image: g.featuredImage,
    name: g.name,
    neighborhood: g.neighborhood,
  }));

  useEffect(() => {
    if (slides.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [slides.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch?.(searchQuery);
    document.getElementById("galleries")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchInput = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch?.(val);
  };

  const handleSurprise = () => {
    if (!galleries.length) return;
    const random = galleries[Math.floor(Math.random() * galleries.length)];
    onSurprise?.(random);
  };

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    onCategoryFilter?.(cat === "All" ? null : cat);
    document.getElementById("galleries")?.scrollIntoView({ behavior: "smooth" });
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="hero">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`hero-slide ${i === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1>
          Discover Lagos'
          <br />
          <span>Vibrant Art Scene</span>
        </h1>
        <p>Explore galleries, museums, and cultural spaces across Nigeria's art capital.</p>

        <form className="hero-search" onSubmit={handleSearch}>
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search galleries, exhibitions, neighborhoods..."
            value={searchQuery}
            onChange={handleSearchInput}
          />
          <button type="submit">Search</button>
        </form>

        <button className="surprise-btn" onClick={handleSurprise}>
          <Shuffle size={16} />
          Surprise me
        </button>

        <div className="hero-categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-chip ${activeCategory === cat ? "active" : ""}`}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {currentSlide && (
        <div className="hero-caption">
          <MapPin size={14} />
          <span>
            {currentSlide.name} &bull; {currentSlide.neighborhood}
          </span>
        </div>
      )}

      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
