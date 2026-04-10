import { useState, useMemo } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import LagosMap from "./components/map/LagosMap";
import GalleryGrid from "./components/gallery/GalleryGrid";
import FilterSidebar from "./components/filter/FilterSidebar";
import { galleries } from "./data/galleries";
import "./App.scss";

function App() {
  const [filteredGalleries, setFilteredGalleries] = useState(galleries);
  const [activeFilters, setActiveFilters] = useState({});

  const handleFilter = (filters) => {
    setActiveFilters(filters);
    let filtered = [...galleries];

    if (filters.neighborhood) {
      filtered = filtered.filter(
        (g) => g.neighborhood === filters.neighborhood,
      );
    }

    if (filters.artType) {
      filtered = filtered.filter((g) =>
        g.artTypes.includes(filters.artType.toLowerCase()),
      );
    }

    setFilteredGalleries(filtered);
  };

  const handleNearMe = (location) => {
    // For MVP, just show a message - in production, calculate distances
    alert(
      `Showing galleries near your location (${location.lat}, ${location.lng})\nFull geolocation feature coming soon!`,
    );
    // Reset to show all galleries
    setFilteredGalleries(galleries);
  };

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <LagosMap />
      <GalleryGrid galleries={filteredGalleries} />
      <FilterSidebar onFilter={handleFilter} onNearMe={handleNearMe} />
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 ArtLagos Directory. All rights reserved.</p>
          <small>
            Discover and explore the vibrant art scene of Lagos, Nigeria
          </small>
        </div>
      </footer>
    </div>
  );
}

export default App;
