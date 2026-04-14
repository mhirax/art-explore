// src/components/gallery/GalleryGrid.jsx
import { useState } from "react";
import GalleryCard from "./GalleryCard";
import GalleryModal from "./GalleryModal";
import "./GalleryGrid.scss";

export default function GalleryGrid({ galleries }) {
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (gallery) => {
    setSelectedGallery(gallery);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGallery(null);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <section id="galleries" className="gallery-grid-section">
        <div className="container">
          <div className="section-header">
            <h2 className="grid-header">
              All <span className="artspan">Art Galleries</span> in Lagos
            </h2>
            <p>
              Discover {galleries.length} galleries, museums, and art spaces
              across the city
            </p>
          </div>

          <div className="galleries-grid">
            {galleries.map((gallery) => (
              <GalleryCard
                key={gallery.id}
                gallery={gallery}
                onClick={openModal}
              />
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && selectedGallery && (
        <GalleryModal gallery={selectedGallery} onClose={closeModal} />
      )}
    </>
  );
}
