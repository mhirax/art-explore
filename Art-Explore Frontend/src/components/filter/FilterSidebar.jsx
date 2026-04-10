import { useState } from "react";
import { Filter, X, MapPin, Calendar } from "lucide-react";
import { neighborhoods, artTypes } from "../../data/galleries";
import "./FilterSidebar.scss";

export default function FilterSidebar({ onFilter, onNearMe }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All");
  const [selectedArtType, setSelectedArtType] = useState("All");
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleApplyFilters = () => {
    onFilter({
      neighborhood:
        selectedNeighborhood !== "All" ? selectedNeighborhood : null,
      artType: selectedArtType !== "All" ? selectedArtType : null,
    });
    setIsOpen(false);
  };

  const handleNearMe = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onNearMe({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsGettingLocation(false);
          setIsOpen(false);
        },
        (error) => {
          alert(
            "Unable to get your location. Please check your browser settings.",
          );
          setIsGettingLocation(false);
        },
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsGettingLocation(false);
    }
  };

  return (
    <>
      <button className="filter-toggle" onClick={() => setIsOpen(true)}>
        <Filter size={20} />
        Filter Galleries
      </button>

      {isOpen && (
        <div className="filter-sidebar">
          <div className="filter-header">
            <h3>Filter Galleries</h3>
            <button className="close-filter" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="filter-content">
            <div className="filter-group">
              <label>📍 Location</label>
              <div className="filter-chips">
                {neighborhoods.map((hood) => (
                  <button
                    key={hood}
                    className={`chip ${selectedNeighborhood === hood ? "active" : ""}`}
                    onClick={() => setSelectedNeighborhood(hood)}
                  >
                    {hood}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>🎨 Art Type</label>
              <div className="filter-chips">
                {artTypes.map((type) => (
                  <button
                    key={type}
                    className={`chip ${selectedArtType === type ? "active" : ""}`}
                    onClick={() => setSelectedArtType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-actions">
              <button className="btn btn-primary" onClick={handleApplyFilters}>
                Apply Filters
              </button>
              <button
                className="btn-nearme"
                onClick={handleNearMe}
                disabled={isGettingLocation}
              >
                <MapPin size={16} />
                {isGettingLocation ? "Getting Location..." : "Near Me"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
