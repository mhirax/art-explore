// src/components/gallery/GalleryGrid.jsx
import GalleryCard from "./GalleryCard";
import "./GalleryGrid.scss";

export default function GalleryGrid({ galleries, onOpenGallery }) {
  return (
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
              onClick={onOpenGallery}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
