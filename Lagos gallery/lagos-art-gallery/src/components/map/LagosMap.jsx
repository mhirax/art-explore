import { useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { galleries } from "../../data/galleries";
import "./LagosMap.scss";

export default function LagosMap() {
  const [selectedGallery, setSelectedGallery] = useState(null);

  const openGoogleMaps = (gallery) => {
    window.open(
      `https://www.google.com/maps/search/${encodeURIComponent(gallery.name + " Lagos")}`,
      "_blank",
    );
  };

  return (
    <section className="map-section">
      <div className="container">
        <div className="section-header">
          <h2>Explore Lagos Art Map</h2>
          <p>Find galleries near you - from Ikoyi to Victoria Island</p>
        </div>

        <div className="map-container">
          <div className="map-placeholder">
            <img
              src="https://images.unsplash.com/photo-1586444248902-2f0ed8dc9d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Lagos Map"
            />
            <div className="map-overlay">
              <p>📍 Interactive Map Coming Soon</p>
              <small>
                Real-time map integration with Google Maps API in development
              </small>
            </div>

            {/* Static Markers for Preview */}
            {galleries.map((gallery) => (
              <div
                key={gallery.id}
                className="map-marker"
                style={{
                  left: `${((gallery.coordinates.lng - 3.35) / 0.2) * 100}%`,
                  top: `${((gallery.coordinates.lat - 6.35) / 0.2) * 100}%`,
                }}
                onClick={() => setSelectedGallery(gallery)}
              >
                <MapPin size={24} className="marker-icon" />
                <span className="marker-label">{gallery.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="neighborhood-chips">
          <h3>Browse by Neighborhood</h3>
          <div className="chips">
            {[
              "Ikoyi",
              "Victoria Island",
              "Lekki",
              "Yaba",
              "Lagos Island",
              "Surulere",
            ].map((hood) => (
              <button key={hood} className="chip">
                {hood}
              </button>
            ))}
          </div>
        </div>

        {selectedGallery && (
          <div className="gallery-preview">
            <button
              className="close-preview"
              onClick={() => setSelectedGallery(null)}
            >
              ×
            </button>
            <div className="preview-content">
              <h4>{selectedGallery.name}</h4>
              <p>{selectedGallery.address}</p>
              <div className="preview-hours">
                <strong>Hours:</strong> {selectedGallery.hours.monday} -{" "}
                {selectedGallery.hours.friday}
              </div>
              <button
                className="btn btn-outline"
                onClick={() => openGoogleMaps(selectedGallery)}
              >
                Get Directions <ExternalLink size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
