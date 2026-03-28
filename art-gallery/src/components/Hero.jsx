import "./Hero.scss";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <h1>
          Where Art <span>Comes Alive</span>
        </h1>
        <p>
          Discover extraordinary artworks from renowned masters and emerging
          talents
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary">Explore Gallery</button>
          <button className="btn btn-outline">Current Exhibitions</button>
        </div>
      </div>
    </section>
  );
}
