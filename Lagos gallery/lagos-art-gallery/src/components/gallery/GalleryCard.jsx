import { MapPin, Clock, Calendar } from "lucide-react";
import "./GalleryGrid.scss";

export default function GalleryCard({ gallery, onClick }) {
  return (
    <div className="gallery-card" onClick={() => onClick(gallery)}>
      <div className="card-image">
        <img src={gallery.featuredImage} alt={gallery.name} />
        <span className={`type-badge ${gallery.type}`}>
          {gallery.type === "commercial-gallery"
            ? "Gallery"
            : gallery.type === "museum"
              ? "Museum"
              : gallery.type === "art-center"
                ? "Art Center"
                : "Studio"}
        </span>
      </div>

      <div className="card-content">
        <h3>{gallery.name}</h3>
        <div className="neighborhood">
          <MapPin size={14} />
          <span>{gallery.neighborhood}</span>
        </div>
        <p className="description">
          {gallery.description.substring(0, 100)}...
        </p>

        <div className="exhibition-info">
          {gallery.currentExhibition && (
            <div className="current-exhibition">
              <Calendar size={12} />
              <span>Current: {gallery.currentExhibition.title}</span>
            </div>
          )}
          <div className="hours">
            <Clock size={12} />
            <span>
              Open {gallery.hours.monday} - {gallery.hours.friday}
            </span>
          </div>
        </div>

        <button className="details-btn">View Details →</button>
      </div>
    </div>
  );
}
