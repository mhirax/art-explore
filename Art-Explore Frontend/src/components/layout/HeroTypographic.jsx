import "./HeroTypographic.scss";

// ── Data ──────────────────────────────────────────────────────
const STATS = [
  { number: "15+", label: "Galleries" },
  { number: "2", label: "Districts" },
  { number: "6", label: "Art Forms" },
];

const TAGS = ["Contemporary", "Photography", "Sculpture"];

const TICKER_ITEMS = [
  { title: "Studio", place: "Yaba" },
  { title: "Exhibition", place: "Ikoyi" },
  { title: "Art Fair", place: "Lekki" },
  { title: "Gallery", place: "Victoria Island" },
  { title: "Museum", place: "Lagos Island" },
  { title: "Workshop", place: "Surulere" },
];

// Doubled for seamless infinite loop
const TICKER_DOUBLED = [...TICKER_ITEMS, ...TICKER_ITEMS];

// ── Icons ─────────────────────────────────────────────────────
const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 7h10M8 3l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MapPinIcon = () => (
  <svg
    width="18"
    height="22"
    viewBox="0 0 18 22"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M9 1C5.13 1 2 4.13 2 8c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      fill="currentColor"
      fillOpacity=".15"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="9" cy="8" r="2.5" fill="currentColor" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────
export default function HeroTypographic() {
  return (
    <section className="ht" aria-label="Lagos Art — Hero">
      {/* ══ TOP SECTION — flex-grow fills above ticker ══ */}
      <div className="ht__top">
        {/* ── Col A: vertical sidebar ── */}
        <aside className="ht__sidebar" aria-hidden="true">
          <span className="ht__sidebar-label">Explore</span>
          <div className="ht__sidebar-dots">
            <span className="ht__dot ht__dot--active" />
            <span className="ht__dot" />
            <span className="ht__dot" />
          </div>
          <span className="ht__sidebar-num">01 / 03</span>
        </aside>

        {/* ── Col B: text content ── */}
        <div className="ht__content">
          <p className="ht__eyebrow">Lagos Art District</p>

          <h1 className="ht__headline">
            Discover the
            <br />
            <em>galleries</em>
            <br />
            of Lagos island.
          </h1>

          <p className="ht__body">
            From the landmark institutions of Victoria Island to the raw
            creative energy of Yaba — every gallery, studio and exhibition
            space, mapped and ready to explore.
          </p>

          <div className="ht__actions">
            <button className="ht__btn-primary">Open Map</button>
            <button className="ht__btn-ghost">
              Browse Galleries <ArrowIcon />
            </button>
          </div>

          <div className="ht__stats">
            {STATS.map(({ number, label }) => (
              <div key={label} className="ht__stat">
                <span className="ht__stat-number">{number}</span>
                <span className="ht__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Col C: image ── */}
        <div className="ht__image-col">
          {/* Frame — decorative offset border */}
          <div className="ht__image-frame" aria-hidden="true" />

          {/* Image wrapper — absolute fill with bottom gap for gradient breathing room */}
          <div className="ht__image-wrap">
            <img
              src="https://b2128690.smushcdn.com/2128690/wp-content/uploads/2022/10/best-art-galleries-lagos-pyramid-1920x1280.jpg?lossy=2&strip=1&webp=1"
              alt="Lagos gallery interior showing artworks on walls"
              className="ht__image"
            />

            {/* Gradient overlay — bottom fade into cream */}
            <div className="ht__image-gradient" aria-hidden="true" />

            {/* Tags — top right */}
            <div className="ht__tags" aria-label="Art categories">
              {TAGS.map((tag) => (
                <span key={tag} className="ht__tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* Animated pin — center */}
            <div className="ht__pin" aria-hidden="true">
              <div className="ht__pin-ring" />
              <div className="ht__pin-ring ht__pin-ring--delay" />
              <MapPinIcon />
            </div>

            {/* Location label — bottom center */}
            <div className="ht__location" aria-label="Location: Lagos, Nigeria">
              <span className="ht__location-dot" aria-hidden="true" />
              <span>Lagos, Nigeria · 6.4550° N</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ BOTTOM SECTION — ticker ══ */}
      <div className="ht__ticker-wrap" aria-hidden="true">
        <div className="ht__ticker-track">
          {TICKER_DOUBLED.map(({ title, place }, i) => (
            <div key={i} className="ht__ticker-item">
              <strong>{title}</strong>
              <span className="ht__ticker-dot" aria-hidden="true" />
              {place}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
