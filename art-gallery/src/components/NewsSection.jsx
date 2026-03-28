import "./NewsSection.scss";

export default function NewsSection({ announcements }) {
  const getIcon = (type) => {
    if (type === "event") return "📅";
    if (type === "spotlight") return "✨";
    return "📢";
  };

  return (
    <section className="news-section">
      <div className="container">
        <div className="section-header">
          <h2>Latest News & Events</h2>
          <p>
            Stay updated with our latest exhibitions and gallery announcements
          </p>
        </div>

        <div className="news-grid">
          {announcements.map((item) => (
            <div key={item.id} className="news-card">
              <div className="news-icon">
                <span>{getIcon(item.type)}</span>
              </div>
              <div className="news-date">{item.date}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href="#" className="read-more">
                Read more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
