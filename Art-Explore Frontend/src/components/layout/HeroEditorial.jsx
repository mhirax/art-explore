import "./HeroEditorial.scss";

const STATS = [
  { number: "15+", label: "Galleries" },
  { number: "2",   label: "Districts" },
  { number: "6",   label: "Art Forms" },
];

const TICKER_ITEMS = [
  { title: "Gallery", place: "Victoria Island" },
  { title: "Museum", place: "Lagos Island" },
  { title: "Studio", place: "Yaba" },
  { title: "Exhibition", place: "Ikoyi" },
  { title: "Art Fair", place: "Lekki" },
];

// Doubled for seamless infinite loop
const TICKER_DOUBLED = [...TICKER_ITEMS, ...TICKER_ITEMS];

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M2 7h10M8 3l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HeroEditorial() {
  return (
    <section className="hero-editorial" aria-label="Lagos Art — Hero">
      {/* ── LEFT — text column ── */}
      <div className="hero-editorial__left">
        <p className="hero-editorial__eyebrow">Lagos Art District</p>

        <h1 className="hero-editorial__headline">
          Discover the
          <br />
          <em>galleries</em> of
          <br />
          Lagos Island
        </h1>

        <p className="hero-editorial__body">
          An editorial guide to Lagos's most vital art spaces — from the
          landmark galleries of Victoria Island to the emerging studios
          reshaping Yaba and beyond.
        </p>

        <div className="hero-editorial__actions">
          <button className="hero-editorial__btn-primary">
            Explore the Map
          </button>
          <button className="hero-editorial__btn-ghost">
            View all galleries
            <ArrowIcon />
          </button>
        </div>
      </div>

      {/* ── RIGHT — image column ── */}
      <div className="hero-editorial__right" aria-hidden="true">
        <div className="hero-editorial__grid-overlay" />
        <img
          src="https://b2128690.smushcdn.com/2128690/wp-content/uploads/2022/10/best-art-galleries-lagos-pyramid-1920x1280.jpg?lossy=2&strip=1&webp=1"
          alt="Lagos gallery interior"
        />
        <span className="hero-editorial__caption">
          Pyramid Art Gallery, Lagos Island
        </span>

        <div className="hero-editorial__scroll-hint">
          <div className="hero-editorial__scroll-line" />
          <span>Scroll</span>
        </div>
      </div>

      {/* ── Ticker ── */}
      <div className="hero-typo__ticker" aria-hidden="true">
        <div className="hero-typo__ticker-track">
          {TICKER_DOUBLED.map(({ title, place }, i) => (
            <div key={i} className="hero-typo__ticker-item">
              <strong>{title}</strong>
              <span className="hero-typo__ticker-sep" />
              {place}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
