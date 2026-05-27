import "./HeroTypographic.scss";

const STATS = [
  { number: "15+", label: "Galleries" },
  { number: "2",   label: "Districts" },
  { number: "6",   label: "Art Forms" },
];

const TICKER_ITEMS = [
  { title: "Gallery",    place: "Victoria Island" },
  { title: "Museum",     place: "Lagos Island"    },
  { title: "Studio",     place: "Yaba"            },
  { title: "Exhibition", place: "Ikoyi"           },
  { title: "Art Fair",   place: "Lekki"           },
];

// Doubled for seamless infinite loop
const TICKER_DOUBLED = [...TICKER_ITEMS, ...TICKER_ITEMS];

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4z"
      fill="currentColor"
    />
    <circle cx="7" cy="5" r="1.5" fill="white" />
  </svg>
);

export default function HeroTypographic() {
  return (
    <section className="hero-typo" aria-label="Lagos Art — Hero">

      <div className="hero-typo__main">

        {/* ── Rail ── */}
        <div className="hero-typo__rail" aria-hidden="true">
          <div className="hero-typo__rail-dot" />
          <span className="hero-typo__rail-text">Lagos Art Guide — 2025</span>
        </div>

        {/* ── Center text ── */}
        <div className="hero-typo__center">
          <span className="hero-typo__number" aria-hidden="true">15</span>

          <h1 className="hero-typo__headline">
            Art galleries.<br />
            One <em>living</em> map<br />
            of Lagos.
          </h1>

          <p className="hero-typo__body">
            From the landmark institutions of Victoria Island to the raw
            creative energy of Yaba — every gallery, studio and exhibition
            space, mapped and ready to explore.
          </p>

          <div className="hero-typo__actions">
            <button className="hero-typo__btn-primary">Open Map</button>
            <button className="hero-typo__btn-outline">Browse Galleries</button>
          </div>

          <div className="hero-typo__stats">
            {STATS.map(({ number, label }) => (
              <div key={label} className="hero-typo__stat">
                <span className="hero-typo__stat-number">{number}</span>
                <span className="hero-typo__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right image ── */}
        <div className="hero-typo__right" aria-hidden="true">
          <img
            src="https://b2128690.smushcdn.com/2128690/wp-content/uploads/2022/10/best-art-galleries-lagos-pyramid-1920x1280.jpg?lossy=2&strip=1&webp=1"
            alt="Lagos gallery"
          />

          <div className="hero-typo__tags">
            <span className="hero-typo__tag">Island</span>
            <span className="hero-typo__tag">Mainland</span>
          </div>

          {/* Animated map pin */}
          <div className="hero-typo__pin-motif">
            <div className="hero-typo__pin-circle">
              <div className="hero-typo__pin-dot" />
            </div>
            <div className="hero-typo__pin-line" />
          </div>

          <p className="hero-typo__right-label">
            <PinIcon /> Lagos, Nigeria · 6.4550° N
          </p>
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
