import { useState, useCallback } from "react";
import "./Carousel.scss";

const items = [
  {
    id: 0,
    tag: "Exhibition Space",
    title: "Gallery",
    desc: "Where light meets canvas. The gallery presents rotating exhibitions from emerging voices and established masters of contemporary art.",
    image:
      "https://b2128690.smushcdn.com/2128690/wp-content/uploads/2022/10/best-art-galleries-lagos-pyramid-1920x1280.jpg?lossy=2&strip=1&webp=1",
  },
  {
    id: 1,
    tag: "Cultural Space",
    title: "Museum",
    desc: "Wander through centuries of human history. Our museum houses artefacts, relics and wonders gathered across continents and time.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.bBYnRNqJAZblw4BUARbZ0QHaFj?pid=Api&h=220&P=0",
  },
  {
    id: 2,
    tag: "Creative Space",
    title: "Art",
    desc: "Art is the pulse of the collection. Discover paintings, installations and mixed-media works that provoke, delight and endure.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.sBnd05lcXSM_N1qLs14zUQHaEK?pid=Api&h=220&P=0",
  },
  {
    id: 3,
    tag: "Workshop Space",
    title: "Studio",
    desc: "A living, working studio open to artists in residence. Witness creation in progress — raw, unfinished and utterly honest.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.9QiwdIv6GuA9hp_tBgfgiwHaE7?pid=Api&h=220&P=0",
  },
];

function Card({ item, isActive, onActivate }) {
  return (
    <article
      className={`card ${isActive ? "card--active" : ""}`}
      tabIndex={0}
      aria-label={`${item.title}${isActive ? ", expanded" : ""}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      <img src={item.image} alt={item.title} loading="lazy" />

      {/* Collapsed state — vertical title */}
      <div className="card__base">
        <h3 className="card__base-title">{item.title}</h3>
      </div>

      {/* Expanded state — full detail */}
      <div className="card__detail" aria-hidden={!isActive}>
        <span className="card__detail-tag">{item.tag}</span>
        <h3 className="card__detail-title">{item.title}</h3>
        <p className="card__detail-desc">{item.desc}</p>
        <button
          className="card__detail-btn"
          aria-label={`Explore ${item.title}`}
          tabIndex={isActive ? 0 : -1}
        >
          Explore
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2.5 6.5h8M7 3l3.5 3.5L7 10"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default function Carousel() {
  const [activeId, setActiveId] = useState(0);

  const handleActivate = useCallback((id) => {
    setActiveId(id);
  }, []);

  return (
    <section
      className="carousel"
      role="region"
      aria-label="Art spaces collection"
    >
      <header className="carousel__header">
        <p className="carousel__eyebrow">Explore art galleries in lagos</p>
        <h2 className="carousel__title">journey through the Collection</h2>
      </header>

      <div className="carousel__stage" role="list">
        {items.map((item) => (
          <Card
            key={item.id}
            item={item}
            isActive={item.id === activeId}
            onActivate={() => handleActivate(item.id)}
          />
        ))}
      </div>
    </section>
  );
}
