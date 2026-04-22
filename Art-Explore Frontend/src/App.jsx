// src/App.jsx
import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import Mapheader from "./components/Map/LagosMap.jsx";
import GalleryGrid from "./components/gallery/GalleryGrid";
import FilterSidebar from "./components/filter/FilterSidebar";
import { galleries } from "./data/galleries";
import "./App.scss";
import { Import } from "lucide-react";

function App() {
  const [filteredGalleries, setFilteredGalleries] = useState(galleries);
  const [activeFilters, setActiveFilters] = useState({});

  // Apply filters whenever activeFilters changes
  useEffect(() => {
    let filtered = [...galleries];

    // Filter by neighborhood/location
    if (activeFilters.neighborhood) {
      filtered = filtered.filter(
        (gallery) => gallery.neighborhood === activeFilters.neighborhood,
      );
    }

    // Filter by venue type (Gallery, Studio, Museum, Art center)
    if (activeFilters.artType) {
      filtered = filtered.filter(
        (gallery) => gallery.venueType === activeFilters.artType,
      );
    }

    setFilteredGalleries(filtered);
  }, [activeFilters]);

  const handleFilter = (filters) => {
    setActiveFilters(filters);
  };

  const handleNearMe = (location) => {
    alert(
      `Showing galleries near your location (${location.lat}, ${location.lng})\nFull geolocation feature coming soon!`,
    );
    // Reset filters when using "Near Me"
    setActiveFilters({});
    setFilteredGalleries(galleries);
  };

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Mapheader />
     
      <div className="main-content">
        <mapheader />
        <div className="container">
          <FilterSidebar onFilter={handleFilter} onNearMe={handleNearMe} />
          <GalleryGrid galleries={filteredGalleries} />
        </div>
      </div>

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
