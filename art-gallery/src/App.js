import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NewsSection from "./components/NewsSection";
import MapSection from "./components/MapSection";
import ArtGallery from "./components/ArtGallery";
import data from "./data/artworks.json";
import "./App.scss";

function App() {
  const { artworks, announcements } = data;

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <NewsSection announcements={announcements} />
      <ArtGallery artworks={artworks} />
      <MapSection />

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 ArtGallery. All rights reserved.</p>
          <small>
            Discover extraordinary art from masters and emerging talents in
            Nigeria and beyond
          </small>
        </div>
      </footer>
    </div>
  );
}

export default App;
