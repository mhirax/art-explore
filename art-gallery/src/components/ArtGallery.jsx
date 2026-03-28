import { useState } from "react";
import { Calendar, MapPin, Heart, Share2, X } from "lucide-react";
import "./ArtGallery.scss";

export default function ArtGallery({ artworks }) {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArtwork(null);
    document.body.style.overflow = "unset";
  };

  const handleAddToMap = () => {
    alert(`📍 Added "${selectedArtwork.title}" to your map itinerary!`);
  };

  const handleSetReminder = () => {
    alert(
      `⏰ Reminder set for "${selectedArtwork.title}" on ${selectedArtwork.eventDate}`,
    );
  };

  const handleScreenshot = () => {
    alert(
      `📸 Screenshot feature coming soon! You'll be able to capture this artwork.`,
    );
  };

  return (
    <>
      <section className="art-gallery">
        <div className="container">
          <div className="section-header">
            <h2>Featured Artworks</h2>
            <p>Discover our curated selection of extraordinary pieces</p>
          </div>

          <div className="artworks-grid">
            {artworks
              .filter((a) => a.featured)
              .map((artwork) => (
                <div
                  key={artwork.id}
                  className="artwork-card"
                  onClick={() => openModal(artwork)}
                >
                  <div className="card-image">
                    <img src={artwork.coverImage} alt={artwork.title} />
                    <div className="card-overlay">
                      <button className="view-btn">View Details</button>
                    </div>
                  </div>
                  <div className="card-info">
                    <h3>{artwork.title}</h3>
                    <p className="card-artist">{artwork.artist}</p>
                    <p className="card-date">
                      <Calendar size={14} />
                      <span>{artwork.eventDate}</span>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedArtwork && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>

            <div className="modal-content">
              <div className="modal-image">
                <img
                  src={selectedArtwork.coverImage}
                  alt={selectedArtwork.title}
                />
              </div>

              <div className="modal-body">
                <h2 className="modal-title">{selectedArtwork.title}</h2>
                <p className="modal-artist">{selectedArtwork.artist}</p>
                <p className="modal-details">
                  {selectedArtwork.year} · {selectedArtwork.medium}
                </p>

                <div className="modal-actions">
                  <button
                    onClick={handleAddToMap}
                    className="action-btn map-btn"
                  >
                    <MapPin size={18} />
                    Add to Map
                  </button>
                  <button
                    onClick={handleSetReminder}
                    className="action-btn reminder-btn"
                  >
                    <Calendar size={18} />
                    Set Reminder
                  </button>
                  <button
                    onClick={handleScreenshot}
                    className="action-btn screenshot-btn"
                  >
                    <Share2 size={18} />
                    Screenshot
                  </button>
                  <button className="action-btn favorite-btn">
                    <Heart size={18} />
                    Save
                  </button>
                </div>

                <div className="modal-info">
                  <div className="info-item">
                    <Calendar size={20} />
                    <div>
                      <div className="info-label">Exhibition Date</div>
                      <div className="info-text">
                        {selectedArtwork.eventDate}
                      </div>
                    </div>
                  </div>
                  <div className="info-item">
                    <MapPin size={20} />
                    <div>
                      <div className="info-label">Location</div>
                      <div className="info-text">{selectedArtwork.venue}</div>
                    </div>
                  </div>
                </div>

                <div className="modal-section">
                  <h3>About the Artwork</h3>
                  <p>{selectedArtwork.description}</p>
                </div>

                <div className="modal-section">
                  <h3>About the Artist</h3>
                  <p>{selectedArtwork.artistBio}</p>
                </div>

                <div className="modal-footer">
                  <small>
                    📸 Screenshot this artwork to save your favorite pieces
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
