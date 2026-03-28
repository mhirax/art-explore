import "./MapSection.scss";

export default function MapSection() {
  // Lagos, Nigeria coordinates
  const lagosLat = 6.5244;
  const lagosLng = 3.3792;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lagosLng - 0.5}%2C${lagosLat - 0.5}%2C${lagosLng + 0.5}%2C${lagosLat + 0.5}&layer=mapnik&marker=${lagosLat}%2C${lagosLng}`;

  return (
    <section className="map-section">
      <div className="container">
        <div className="section-header">
          <h2>Exhibition Locations in Nigeria</h2>
          <p>Discover art events across Lagos and other Nigerian cities</p>
        </div>

        <div className="map-container">
          <iframe
            title="Nigeria Art Gallery Map"
            src={mapUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>

        <div className="map-info">
          <div className="info-card">
            <h3>📍 Lagos Art Hub</h3>
            <p>Victoria Island, Lagos, Nigeria</p>
            <small>Current Exhibition: "Modern African Masters"</small>
          </div>
          <div className="info-card">
            <h3>📍 Nike Art Gallery</h3>
            <p>Lekki, Lagos, Nigeria</p>
            <small>Current Exhibition: "Traditional Meets Contemporary"</small>
          </div>
          <div className="info-card">
            <h3>📍 Terra Kulture</h3>
            <p>Victoria Island, Lagos, Nigeria</p>
            <small>Coming Soon: "Nigerian Renaissance"</small>
          </div>
        </div>

        <p className="map-note">
          <small>
            📍 Full map integration with zoom and navigation coming soon! This
            is a preview of upcoming art venues in Lagos.
          </small>
        </p>
      </div>
    </section>
  );
}
