import "./HeroEditorial.scss";

const STATS = [
  { number: "15+", label: "Galleries" },
  { number: "2", label: "Districts" },
  { number: "6", label: "Art Forms" },
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

export default function HeroEditorial() {
  return (
    <section className="hero-editorial" aria-label="Lagos Art — Hero">
    

        


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
