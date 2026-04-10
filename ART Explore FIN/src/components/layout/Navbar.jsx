import { useState } from "react";
import { Menu, X, MapPin, Calendar, Search } from "lucide-react";
import "./Navbar.scss";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <a href="/" className="logo">
          Art<span>Explore</span>
        </a>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>


        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#galleries">Galleries</a>
          </li>
          <li>
            <a href="#map">Map</a>
          </li>
      
        </ul>

      </div>
    </nav>
  );
}
