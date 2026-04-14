// src/components/map/GalleryMarker.jsx
import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Create a custom red marker icon
const customIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// This component creates the popup content with image
const GalleryPopupContent = ({ gallery }) => {
  return (
    <div className="gallery-popup-content">
      {/* Gallery Image */}
      {gallery.image && (
        <div className="popup-image">
          <img
            src={gallery.image}
            alt={gallery.name}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x200?text=No+Image+Available";
            }}
          />
        </div>
      )}

      {/* Gallery Info */}
      <div className="popup-info">
        <h3 className="gallery-name">{gallery.name}</h3>
        <p className="gallery-address">📍 {gallery.address}</p>
        {gallery.description && (
          <p className="gallery-description">{gallery.description}</p>
        )}
        <button
          className="directions-btn"
          onClick={() =>
            window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${gallery.lat},${gallery.lng}`,
              "_blank",
            )
          }
        >
          🗺️ Get Directions
        </button>
      </div>
    </div>
  );
};

// Main component that renders the marker
const GalleryMarker = ({ gallery }) => {
  return (
    <Marker position={[gallery.lat, gallery.lng]} icon={customIcon}>
      <Popup maxWidth={320} minWidth={280} className="gallery-popup">
        <GalleryPopupContent gallery={gallery} />
      </Popup>
    </Marker>
  );
};

export default GalleryMarker;
