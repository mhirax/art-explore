// src/App.jsx
import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import ArtGalleryApp from "./components/gallery/ArtGalleryApp.jsx";
import Mapheader from "./components/Map/LagosMap.jsx";
import MapView from "./components/Map/MapView";

import { GALLERIES } from "./components/data/galleries.js";
import "./App.scss";
import { galleries } from "./data/MapViewData.js";

function App() {
  const [filteredGalleries, setFilteredGalleries] = useState(galleries);
  const [activeFilters, setActiveFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGallery, setSelectedGallery] = useState(null);

  useEffect(() => {
    let filtered = [...galleries];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.neighborhood.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.artTypes.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (activeFilters.neighborhood) {
      filtered = filtered.filter(
        (g) => g.neighborhood === activeFilters.neighborhood
      );
    }

    if (activeFilters.artType) {
      filtered = filtered.filter((g) => g.venueType === activeFilters.artType);
    }

    setFilteredGalleries(filtered);
  }, [activeFilters, searchQuery]);

  const handleFilter = (filters) => {
    setActiveFilters(filters);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (venueType) => {
    setActiveFilters((prev) => ({
      ...prev,
      artType: venueType || undefined,
    }));
  };

  const handleNearMe = (location) => {
    alert(
      `Showing galleries near your location (${location.lat}, ${location.lng})\nFull geolocation feature coming soon!`
    );
    setActiveFilters({});
    setSearchQuery("");
    setFilteredGalleries(galleries);
  };

  const openGallery = (gallery) => {
    setSelectedGallery(gallery);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setSelectedGallery(null);
    document.body.style.overflow = "unset";
  };

  return (
    <div className="app">
      <Navbar />
      <Hero
        galleries={galleries}
        onSearch={handleSearch}
        onSurprise={openGallery}
        onCategoryFilter={handleCategoryFilter}
      />
      <Mapheader />

      <MapView />
      <ArtGalleryApp />
      <div className="main-content">
        <div className="container">
         
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

      {selectedGallery && (
        <GalleryModal gallery={selectedGallery} onClose={closeGallery} />
      )}
    </div>
  );
}

export default App;
