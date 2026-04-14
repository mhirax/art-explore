import { useState } from "react";
import { Menu, X, MapPin, Calendar, Search } from "lucide-react";
import "./Navbar.scss";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ============================================================
  // ✅ NEW FUNCTION: Handles smooth scrolling to any section
  // ============================================================
  const scrollToSection = (sectionId) => {
    // 1. Find the element on the page using its ID
    const section = document.getElementById(sectionId);
    
    // 2. If the element exists, scroll to it
    if (section) {
      // Get navbar height to offset the scroll (so content doesn't hide behind navbar)
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 70;
      
      // Calculate where to scroll (element position minus navbar height)
      const sectionPosition = section.offsetTop - navbarHeight;
      
      // Tell browser to scroll smoothly to that position
      window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'  // This creates the smooth animation
      });
      
      // 3. Close mobile menu if it's open (better user experience)
      setIsMenuOpen(false);
    }
  };
  // ============================================================

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo - scrolls to home when clicked */}
        <a 
          href="#home" 
          className="logo"
          onClick={(e) => {
            e.preventDefault();  // ✅ Prevents default jump behavior
            scrollToSection("home");  // ✅ Calls our smooth scroll function
          }}
        >
          Art<span className="explore">Explore</span>
        </a>

        {/* Mobile menu button - unchanged */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links - UPDATED with onClick handlers */}
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {/* About link - scrolls to Hero section */}
          <li>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();     // ✅ Stop default jump
                scrollToSection("home"); // ✅ Smooth scroll to hero
              }}
            >
              About
            </a>
          </li>
          
          {/* Map link - scrolls to MapView component */}
          <li>
            <a
              href="#map"
              onClick={(e) => {
                e.preventDefault();      // ✅ Stop default jump
                scrollToSection("map");   // ✅ Smooth scroll to map
              }}
            >
              Map
            </a>
          </li>
          
          {/* Galleries link - scrolls to GalleryGrid component */}
          <li>
            <a
              href="#galleries"
              onClick={(e) => {
                e.preventDefault();          // ✅ Stop default jump
                scrollToSection("galleries"); // ✅ Smooth scroll to galleries
              }}
            >
              Galleries
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}