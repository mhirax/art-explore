import {
  X,
  MapPin,
  Clock,
  Calendar,
  Phone,
  Mail,
  Globe,
  
  CalendarDays,
} from "lucide-react";
import { useEffect } from "react";

export default function GalleryModal({ gallery, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleAddToMap = () => {
    alert(`📍 Added "${gallery.name}" to your map itinerary!`);
  };

  const handleSetReminder = () => {
    alert(`⏰ Reminder set for ${gallery.name}`);
  };

  const handleScreenshot = () => {
    alert(`📸 Screenshot saved! Check your downloads.`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-content">
          <div className="modal-image">
            <img src={gallery.featuredImage} alt={gallery.name} />
          </div>

          <div className="modal-body">
            <h2>{gallery.name}</h2>
            <div className="modal-neighborhood">
              <MapPin size={18} />
              <span>
                {gallery.neighborhood} • {gallery.address}
              </span>
            </div>

            <div className="modal-actions">
              <button onClick={handleAddToMap} className="action-btn map-btn">
                <MapPin size={18} />
                Add to Map
              </button>
              <button
                onClick={handleSetReminder}
                className="action-btn reminder-btn"
              >
                <CalendarDays size={18} />
                Set Reminder
              </button>
              <button
                onClick={handleScreenshot}
                className="action-btn screenshot-btn"
              >
                📸 Screenshot
              </button>
            </div>

            <div className="modal-info-grid">
              <div className="info-item">
                <Clock size={18} />
                <div>
                  <strong>Opening Hours</strong>
                  <p>Mon-Fri: {gallery.hours.monday}</p>
                  <p>Sat: {gallery.hours.saturday}</p>
                  <p>Sun: {gallery.hours.sunday}</p>
                </div>
              </div>

              <div className="info-item">
                <Phone size={18} />
                <div>
                  <strong>Contact</strong>
                  <p>{gallery.contact.phone}</p>
                  <p>{gallery.contact.email}</p>
                </div>
              </div>

              <div className="info-item">
                <Globe size={18} />
                <div>
                  <strong>Online</strong>
                  <a
                    href={gallery.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {gallery.contact.website}
                  </a>
                  <a
                    href={`https://instagram.com/${gallery.contact.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {gallery.contact.instagram}
                  </a>
                </div>
              </div>
            </div>

            <div className="modal-description">
              <h3>About</h3>
              <p>{gallery.description}</p>
            </div>

            {gallery.currentExhibition && (
              <div className="modal-exhibition">
                <h3>Current Exhibition</h3>
                <div className="exhibition-detail">
                  <strong>{gallery.currentExhibition.title}</strong>
                  <p>By: {gallery.currentExhibition.artist}</p>
                  <p className="exhibition-dates">
                    <Calendar size={14} />
                    {new Date(
                      gallery.currentExhibition.startDate,
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(
                      gallery.currentExhibition.endDate,
                    ).toLocaleDateString()}
                  </p>
                  <p>{gallery.currentExhibition.description}</p>
                </div>
              </div>
            )}

            {gallery.upcomingExhibition && (
              <div className="modal-exhibition">
                <h3>Upcoming Exhibition</h3>
                <div className="exhibition-detail">
                  <strong>{gallery.upcomingExhibition.title}</strong>
                  <p>
                    Starts:{" "}
                    {new Date(
                      gallery.upcomingExhibition.startDate,
                    ).toLocaleDateString()}
                  </p>
                  <p>{gallery.upcomingExhibition.description}</p>
                </div>
              </div>
            )}

            <div className="modal-footer">
              <p>
                Art Types:{" "}
                {gallery.artTypes
                  .map((type) => type.charAt(0).toUpperCase() + type.slice(1))
                  .join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
