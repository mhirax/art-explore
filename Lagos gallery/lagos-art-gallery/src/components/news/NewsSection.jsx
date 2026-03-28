import { newsItems } from "../../data/news";
import "./NewsSection.scss";

export default function NewsSection() {
  const getIcon = (type) => {
    if (type === "event") return "📅";
    if (type === "spotlight") return "✨";
    return "📢";
  };

  return (
    <section className="news-section">
      <div className="container">
        <div className="section-header">
          <h2>Lagos Art News</h2>
          <p>Stay updated with the latest happenings in Lagos art scene</p>
        </div>

        <div className="news-grid">
          {newsItems.map((item) => (
            <div key={item.id} className="news-card">
              <div className="news-image">
                <img src={item.image} alt={item.title} />
                <span className="news-type">{getIcon(item.type)}</span>
              </div>
              <div className="news-content">
                <div className="news-date">{item.date}</div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <a href="#" className="read-more">
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
