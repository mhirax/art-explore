import Button from "../common/Button";
import "./Hero.scss";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <h1>
          Discover Lagos'
          <br />
          <span>Vibrant Art Scene</span>
        </h1>
        <p>
          Explore galleries, museums, and cultural spaces across Nigeria's art
          capital. From Ikoyi to Victoria Island, find your next art experience.
        </p>
        <div className="hero-buttons">
          <Button variant="primary">Explore Galleries</Button>
          <Button variant="outline">View Map</Button>
        </div>
      </div>
    </section>
  );
}
