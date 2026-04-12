import "./LagosMap.scss";

export default function MapSection() {
  // Lagos, Nigeria coordinates
  const lagosLat = 6.5244;
  const lagosLng = 3.3792;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lagosLng - 0.5}%2C${lagosLat - 0.5}%2C${lagosLng + 0.5}%2C${lagosLat + 0.5}&layer=mapnik&marker=${lagosLat}%2C${lagosLng}`;

  return (
    <section className="map-section">
      <div className="container">
        <div className="section-header">
          <h2>
            Geographical <span className="mapspan">Map Locations</span> in Nigeria.
          </h2>
          <p>
            Discover art galleries co-ordinate and address location across
            different region in lagos cities
          </p>
        </div>
      </div>
    </section>
  );
}
