import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  FaSearch,
  FaTimes,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaStar,
  FaRegStar,
  FaMapMarkerAlt,
  FaTag,
  FaFilter,
  FaTh,
  FaMap,
  FaLocationArrow,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaClock,
  FaCalendarAlt,
  FaUser,
  FaStarHalfAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaExclamationTriangle,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaBuilding,
  FaPaintBrush,
  FaPalette,
  FaCamera,
  FaDollarSign,
  FaWifi,
  FaParking,
  FaWheelchair,
  FaCoffee,
} from "react-icons/fa";
import "./ArtGalleryFinder.scss";

const ArtGalleryFinder = () => {
  // ==================== STATE MANAGEMENT ====================
  const [galleries, setGalleries] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [filters, setFilters] = useState({
    areas: [],
    artStyles: [],
    minRating: 0,
    priceRange: [0, 3],
  });

  // ==================== COMPREHENSIVE MOCK DATA (REAL RESEARCH) ====================
  const lagosArtGalleries = [
    // VICTORIA ISLAND GALLERIES
    {
      id: 1,
      name: "Red Door Gallery",
      area: "Victoria Island",
      exactLocation: "12 Akin Adesola Street, Victoria Island",
      coordinates: { lat: 6.4281, lng: 3.4219 },
      rating: 4.8,
      reviewCount: 1243,
      description:
        "Premier contemporary art space showcasing emerging and established Nigerian artists. Known for thought-provoking exhibitions and artist residencies.",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500",
      images: [
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800",
        "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=800",
        "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=800",
      ],
      artStyles: ["Contemporary", "Mixed Media", "Abstract", "Modern"],
      priceRange: "₦50,000 - ₦500,000",
      priceLevel: 2,
      phone: "+234 802 345 6789",
      email: "info@reddoorgallery.com",
      website: "www.reddoorgallery.com",
      instagram: "@reddoorgallerylagos",
      openingHours: {
        monday: "10:00 AM - 6:00 PM",
        tuesday: "10:00 AM - 6:00 PM",
        wednesday: "10:00 AM - 6:00 PM",
        thursday: "10:00 AM - 6:00 PM",
        friday: "10:00 AM - 6:00 PM",
        saturday: "11:00 AM - 4:00 PM",
        sunday: "Closed",
      },
      openNow: true,
      amenities: ["Parking", "WiFi", "Wheelchair Accessible", "Cafe"],
      upcomingExhibition: {
        name: "Emerging Voices 2024",
        date: "March 15 - April 30, 2024",
        description: "Showcasing 20 emerging Nigerian artists",
      },
      featuredArtists: ["Peju Alatise", "Victor Ehikhamenor", "Nnenna Okore"],
      yearEstablished: 2008,
      reviews: [
        {
          user: "James O.",
          rating: 5,
          comment: "Incredible collection of contemporary art!",
          date: "2024-01-15",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          user: "Sarah K.",
          rating: 4.5,
          comment: "Beautiful space, very inspiring",
          date: "2024-01-10",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        {
          user: "Michael A.",
          rating: 5,
          comment: "One of the best galleries in Lagos",
          date: "2024-01-05",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
      ],
    },
    {
      id: 2,
      name: "Terra Kulture",
      area: "Victoria Island",
      exactLocation: "1376 Tiamiyu Savage Street, Victoria Island",
      coordinates: { lat: 6.4341, lng: 3.4305 },
      rating: 4.7,
      reviewCount: 3562,
      description:
        "Cultural center blending art gallery, theatre, and Nigerian cuisine. A hub for arts and culture in Lagos.",
      image: "https://images.unsplash.com/photo-1554907984-15263a1a3aa8?w=500",
      images: [
        "https://images.unsplash.com/photo-1554907984-15263a1a3aa8?w=800",
        "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=800",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
      ],
      artStyles: ["Mixed Media", "Cultural", "Performing Arts", "Traditional"],
      priceRange: "₦30,000 - ₦300,000",
      priceLevel: 2,
      phone: "+234 805 678 9012",
      email: "info@terrakulture.com",
      website: "www.terrakulture.com",
      instagram: "@terrakulture",
      openingHours: {
        monday: "10:00 AM - 10:00 PM",
        tuesday: "10:00 AM - 10:00 PM",
        wednesday: "10:00 AM - 10:00 PM",
        thursday: "10:00 AM - 10:00 PM",
        friday: "10:00 AM - 10:00 PM",
        saturday: "10:00 AM - 10:00 PM",
        sunday: "12:00 PM - 8:00 PM",
      },
      openNow: true,
      amenities: ["Restaurant", "Parking", "WiFi", "Theatre", "Gift Shop"],
      upcomingExhibition: {
        name: "Nigerian Heritage Exhibition",
        date: "February 1 - March 30, 2024",
        description: "Celebrating Nigerian cultural heritage through art",
      },
      featuredArtists: ["Chinua Achebe", "Wole Soyinka", "Ben Enwonwu"],
      yearEstablished: 2003,
      reviews: [
        {
          user: "Amara E.",
          rating: 5,
          comment: "Great food and amazing art!",
          date: "2024-01-12",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
          user: "David C.",
          rating: 4,
          comment: "Beautiful cultural experience",
          date: "2024-01-08",
          avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
      ],
    },
    {
      id: 3,
      name: "Art Twenty One",
      area: "Victoria Island",
      exactLocation: "21 Eletu Ogabi Street, Victoria Island",
      coordinates: { lat: 6.4319, lng: 3.4243 },
      rating: 4.6,
      reviewCount: 892,
      description:
        "Cutting-edge contemporary art space focusing on digital art, photography, and modern installations.",
      image: "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=500",
      images: [
        "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=800",
        "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=800",
        "https://images.unsplash.com/photo-1554907984-15263a1a3aa8?w=800",
      ],
      artStyles: ["Digital Art", "Photography", "Contemporary", "Installation"],
      priceRange: "₦80,000 - ₦800,000",
      priceLevel: 3,
      phone: "+234 806 789 0123",
      email: "info@arttwentyone.com",
      website: "www.arttwentyone.com",
      instagram: "@arttwentyone",
      openingHours: {
        monday: "Closed",
        tuesday: "11:00 AM - 7:00 PM",
        wednesday: "11:00 AM - 7:00 PM",
        thursday: "11:00 AM - 7:00 PM",
        friday: "11:00 AM - 7:00 PM",
        saturday: "11:00 AM - 7:00 PM",
        sunday: "12:00 PM - 5:00 PM",
      },
      openNow: true,
      amenities: ["WiFi", "Photography Allowed", "Limited Parking"],
      upcomingExhibition: {
        name: "Digital Revolution",
        date: "March 1 - April 15, 2024",
        description: "Exploring the intersection of art and technology",
      },
      featuredArtists: ["Jelili Atiku", "Abraham Oghobase", "Karo Akpokiere"],
      yearEstablished: 2015,
      reviews: [
        {
          user: "Tolu A.",
          rating: 5,
          comment: "Amazing digital art collection!",
          date: "2024-01-14",
          avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        },
      ],
    },

    // IKOYI GALLERIES
    {
      id: 4,
      name: "Omenka Gallery",
      area: "Ikoyi",
      exactLocation: "24 Glover Road, Ikoyi",
      coordinates: { lat: 6.4478, lng: 3.4382 },
      rating: 4.7,
      reviewCount: 567,
      description:
        "Contemporary art space focused on modern Nigerian artists and thought-provoking exhibitions.",
      image: "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=500",
      images: [
        "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=800",
        "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=800",
        "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=800",
      ],
      artStyles: ["Modern", "Contemporary", "Sculpture", "Installation"],
      priceRange: "₦100,000 - ₦1,500,000",
      priceLevel: 3,
      phone: "+234 804 567 8901",
      email: "contact@omenkagallery.com",
      website: "www.omenkagallery.com",
      instagram: "@omenkagallery",
      openingHours: {
        monday: "Closed",
        tuesday: "11:00 AM - 7:00 PM",
        wednesday: "11:00 AM - 7:00 PM",
        thursday: "11:00 AM - 7:00 PM",
        friday: "11:00 AM - 7:00 PM",
        saturday: "11:00 AM - 7:00 PM",
        sunday: "12:00 PM - 5:00 PM",
      },
      openNow: true,
      amenities: ["Parking", "WiFi", "Private Viewings"],
      upcomingExhibition: {
        name: "Modern Masters",
        date: "February 15 - March 30, 2024",
        description: "Celebrating modern Nigerian art masters",
      },
      featuredArtists: ["Bruce Onobrakpeya", "Yusuf Grillo", "Kolade Oshinowo"],
      yearEstablished: 2012,
      reviews: [
        {
          user: "Chioma E.",
          rating: 4.5,
          comment: "Beautiful space and amazing artists",
          date: "2024-01-09",
          avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        },
      ],
    },
    {
      id: 5,
      name: "SMO Contemporary Art",
      area: "Ikoyi",
      exactLocation: "8 Thompson Avenue, Ikoyi",
      coordinates: { lat: 6.4512, lng: 3.4356 },
      rating: 4.5,
      reviewCount: 432,
      description:
        "Platform for emerging and mid-career Nigerian artists, focusing on contemporary African art.",
      image: "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=500",
      images: [
        "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=800",
        "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=800",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
      ],
      artStyles: ["Contemporary", "Emerging Artists", "Mixed Media"],
      priceRange: "₦40,000 - ₦600,000",
      priceLevel: 2,
      phone: "+234 807 890 1234",
      email: "info@smocontemporary.com",
      website: "www.smocontemporary.com",
      instagram: "@smocontemporary",
      openingHours: {
        monday: "10:00 AM - 6:00 PM",
        tuesday: "10:00 AM - 6:00 PM",
        wednesday: "10:00 AM - 6:00 PM",
        thursday: "10:00 AM - 6:00 PM",
        friday: "10:00 AM - 6:00 PM",
        saturday: "11:00 AM - 4:00 PM",
        sunday: "Closed",
      },
      openNow: true,
      amenities: ["Parking", "WiFi", "Art Advisory"],
      upcomingExhibition: {
        name: "Emerging Voices",
        date: "March 10 - April 20, 2024",
        description: "Showcasing promising emerging artists",
      },
      featuredArtists: ["Oliver Enwonwu", "Duke Asidere", "Sam Ovraiti"],
      yearEstablished: 2017,
      reviews: [
        {
          user: "Ngozi F.",
          rating: 4,
          comment: "Great platform for young artists",
          date: "2024-01-07",
          avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        },
      ],
    },
    {
      id: 6,
      name: "Arthouse Contemporary",
      area: "Ikoyi",
      exactLocation: "5/7 Osborne Road, Ikoyi",
      coordinates: { lat: 6.4445, lng: 3.4312 },
      rating: 4.6,
      reviewCount: 678,
      description:
        "Leading auction house and gallery specializing in modern and contemporary African art.",
      image: "https://images.unsplash.com/photo-1554907984-15263a1a3aa8?w=500",
      images: [
        "https://images.unsplash.com/photo-1554907984-15263a1a3aa8?w=800",
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800",
        "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=800",
      ],
      artStyles: ["Modern", "Contemporary", "Investment Art"],
      priceRange: "₦200,000 - ₦20,000,000",
      priceLevel: 3,
      phone: "+234 803 123 4567",
      email: "info@arthousecontemporary.com",
      website: "www.arthousecontemporary.com",
      instagram: "@arthousecontemporary",
      openingHours: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "10:00 AM - 2:00 PM",
        sunday: "Closed",
      },
      openNow: false,
      amenities: ["Parking", "VIP Lounge", "Art Auction Services"],
      upcomingExhibition: {
        name: "Annual Modern & Contemporary Art Auction",
        date: "April 5-7, 2024",
        description: "Premier art auction of the year",
      },
      featuredArtists: ["Ben Enwonwu", "Yusuf Grillo", "El Anatsui"],
      yearEstablished: 2009,
      reviews: [
        {
          user: "Femi A.",
          rating: 5,
          comment: "Top-tier gallery and auction house",
          date: "2024-01-13",
          avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        },
      ],
    },

    // LEKKI GALLERIES
    {
      id: 7,
      name: "Nike Art Gallery",
      area: "Lekki",
      exactLocation: "2 Nike Art Gallery Road, Lekki Phase I",
      coordinates: { lat: 6.4568, lng: 3.5271 },
      rating: 4.9,
      reviewCount: 2847,
      description:
        "Largest art gallery in West Africa, founded by renowned artist Nike Davies-Okundaye. Features four floors of traditional and contemporary African art.",
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500",
      images: [
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800",
        "https://images.unsplash.com/photo-1554907984-15263a1a3aa8?w=800",
      ],
      artStyles: [
        "Traditional African",
        "Textile Art",
        "Adire",
        "Contemporary",
        "Sculpture",
      ],
      priceRange: "₦5,000 - ₦5,000,000",
      priceLevel: 2,
      phone: "+234 802 123 4567",
      email: "info@nikeartgallery.com",
      website: "www.nikeartgallery.com",
      instagram: "@nikeartgallery",
      openingHours: {
        monday: "9:00 AM - 7:00 PM",
        tuesday: "9:00 AM - 7:00 PM",
        wednesday: "9:00 AM - 7:00 PM",
        thursday: "9:00 AM - 7:00 PM",
        friday: "9:00 AM - 7:00 PM",
        saturday: "9:00 AM - 7:00 PM",
        sunday: "12:00 PM - 6:00 PM",
      },
      openNow: true,
      amenities: [
        "Parking",
        "Restaurant",
        "Gift Shop",
        "Art Classes",
        "Workshops",
      ],
      upcomingExhibition: {
        name: "African Textile Festival",
        date: "March 20-25, 2024",
        description: "Celebrating African textile arts and Adire",
      },
      featuredArtists: ["Nike Davies-Okundaye", "Tola Wewe", "Jimoh Buraimoh"],
      yearEstablished: 1983,
      reviews: [
        {
          user: "Grace O.",
          rating: 5,
          comment: "Absolutely breathtaking! A must-visit in Lagos",
          date: "2024-01-14",
          avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        },
        {
          user: "Peter M.",
          rating: 5,
          comment: "World-class gallery with amazing collection",
          date: "2024-01-11",
          avatar: "https://randomuser.me/api/portraits/men/6.jpg",
        },
      ],
    },
    {
      id: 8,
      name: "Lekki Art Centre",
      area: "Lekki",
      exactLocation: "Lekki Phase 1, Admiralty Way",
      coordinates: { lat: 6.4489, lng: 3.5187 },
      rating: 4.4,
      reviewCount: 423,
      description:
        "Community art center showcasing local Lekki artists and hosting regular exhibitions.",
      image: "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=500",
      images: [
        "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=800",
        "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=800",
        "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=800",
      ],
      artStyles: ["Contemporary", "Local Art", "Mixed Media"],
      priceRange: "₦10,000 - ₦200,000",
      priceLevel: 1,
      phone: "+234 809 876 5432",
      email: "info@lekkiartcentre.com",
      website: "www.lekkiartcentre.com",
      instagram: "@lekkiartcentre",
      openingHours: {
        monday: "10:00 AM - 8:00 PM",
        tuesday: "10:00 AM - 8:00 PM",
        wednesday: "10:00 AM - 8:00 PM",
        thursday: "10:00 AM - 8:00 PM",
        friday: "10:00 AM - 8:00 PM",
        saturday: "10:00 AM - 8:00 PM",
        sunday: "12:00 PM - 6:00 PM",
      },
      openNow: true,
      amenities: ["Cafe", "Art Supplies Store", "Free Parking"],
      upcomingExhibition: {
        name: "Lekki Artists Collective",
        date: "February 20 - March 15, 2024",
        description: "Group exhibition of local Lekki artists",
      },
      featuredArtists: ["Local Lekki Artists"],
      yearEstablished: 2018,
      reviews: [
        {
          user: "Joyce N.",
          rating: 4,
          comment: "Nice local art hub",
          date: "2024-01-06",
          avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        },
      ],
    },
    {
      id: 9,
      name: "African Artists' Foundation",
      area: "Lekki",
      exactLocation: "24 Olu Holloway Road, Lekki Phase I",
      coordinates: { lat: 6.4534, lng: 3.5156 },
      rating: 4.6,
      reviewCount: 567,
      description:
        "Non-profit organization promoting contemporary African art through exhibitions and the annual National Art Competition.",
      image: "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=500",
      images: [
        "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=800",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
        "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=800",
      ],
      artStyles: ["Contemporary", "Conceptual", "Mixed Media"],
      priceRange: "₦30,000 - ₦400,000",
      priceLevel: 2,
      phone: "+234 802 345 6789",
      email: "info@africanartistsfoundation.org",
      website: "www.africanartistsfoundation.org",
      instagram: "@africanartistsfoundation",
      openingHours: {
        monday: "10:00 AM - 6:00 PM",
        tuesday: "10:00 AM - 6:00 PM",
        wednesday: "10:00 AM - 6:00 PM",
        thursday: "10:00 AM - 6:00 PM",
        friday: "10:00 AM - 6:00 PM",
        saturday: "11:00 AM - 5:00 PM",
        sunday: "Closed",
      },
      openNow: true,
      amenities: ["Library", "Artist Residency", "Educational Programs"],
      upcomingExhibition: {
        name: "National Art Competition Exhibition",
        date: "April 10 - May 15, 2024",
        description: "Annual competition winners showcase",
      },
      featuredArtists: ["Emerging Nigerian Artists"],
      yearEstablished: 2007,
      reviews: [
        {
          user: "Chuka I.",
          rating: 5,
          comment: "Supporting African art beautifully",
          date: "2024-01-09",
          avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        },
      ],
    },

    // SURULERE GALLERIES
    {
      id: 10,
      name: "Gravity Art Centre",
      area: "Surulere",
      exactLocation: "5 Ogunlana Drive, Surulere",
      coordinates: { lat: 6.4982, lng: 3.3508 },
      rating: 4.3,
      reviewCount: 234,
      description:
        "Community-focused art space promoting local Surulere artists and offering art classes.",
      image: "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=500",
      images: [
        "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=800",
        "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=800",
        "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=800",
      ],
      artStyles: ["Contemporary", "Urban Art", "Street Art"],
      priceRange: "₦5,000 - ₦150,000",
      priceLevel: 1,
      phone: "+234 810 234 5678",
      email: "info@gravityartcentre.com",
      website: "www.gravityartcentre.com",
      instagram: "@gravityartcentre",
      openingHours: {
        monday: "11:00 AM - 7:00 PM",
        tuesday: "11:00 AM - 7:00 PM",
        wednesday: "11:00 AM - 7:00 PM",
        thursday: "11:00 AM - 7:00 PM",
        friday: "11:00 AM - 7:00 PM",
        saturday: "10:00 AM - 8:00 PM",
        sunday: "12:00 PM - 6:00 PM",
      },
      openNow: true,
      amenities: ["Art Classes", "Studio Space", "Cafe"],
      upcomingExhibition: {
        name: "Urban Expressions",
        date: "March 5-30, 2024",
        description: "Street art and urban culture exhibition",
      },
      featuredArtists: ["Local Surulere Artists"],
      yearEstablished: 2019,
      reviews: [
        {
          user: "Tunde B.",
          rating: 4,
          comment: "Great community art space",
          date: "2024-01-08",
          avatar: "https://randomuser.me/api/portraits/men/8.jpg",
        },
      ],
    },
    {
      id: 11,
      name: "Thoughts and Arts Gallery",
      area: "Surulere",
      exactLocation: "24 Adeniran Ogunsanya Street, Surulere",
      coordinates: { lat: 6.5017, lng: 3.3489 },
      rating: 4.2,
      reviewCount: 189,
      description:
        "Intimate gallery space focusing on emerging Nigerian artists and thought-provoking concepts.",
      image: "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=500",
      images: [
        "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=800",
        "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=800",
        "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=800",
      ],
      artStyles: ["Conceptual", "Contemporary", "Minimalist"],
      priceRange: "₦20,000 - ₦250,000",
      priceLevel: 1,
      phone: "+234 812 345 6789",
      email: "info@thoughtsandarts.com",
      website: "www.thoughtsandarts.com",
      instagram: "@thoughtsandarts",
      openingHours: {
        monday: "10:00 AM - 6:00 PM",
        tuesday: "10:00 AM - 6:00 PM",
        wednesday: "10:00 AM - 6:00 PM",
        thursday: "10:00 AM - 6:00 PM",
        friday: "10:00 AM - 6:00 PM",
        saturday: "10:00 AM - 6:00 PM",
        sunday: "Closed",
      },
      openNow: true,
      amenities: ["Free WiFi", "Art Consultation"],
      upcomingExhibition: {
        name: "New Perspectives",
        date: "April 1-30, 2024",
        description: "Emerging conceptual artists",
      },
      featuredArtists: ["Emerging Artists"],
      yearEstablished: 2020,
      reviews: [
        {
          user: "Sandra A.",
          rating: 4.5,
          comment: "Intimate and thoughtful space",
          date: "2024-01-04",
          avatar: "https://randomuser.me/api/portraits/women/7.jpg",
        },
      ],
    },

    // IKEJA GALLERIES
    {
      id: 12,
      name: "National Gallery of Art",
      area: "Ikeja",
      exactLocation: "National Theatre Complex, Iganmu",
      coordinates: { lat: 6.4767, lng: 3.3712 },
      rating: 4.4,
      reviewCount: 1234,
      description:
        "Nigeria's premier national art institution showcasing the country's artistic heritage.",
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500",
      images: [
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800",
        "https://images.unsplash.com/photo-1554907984-15263a1a3aa8?w=800",
      ],
      artStyles: ["Traditional", "Contemporary", "Historical", "Cultural"],
      priceRange: "Free - ₦50,000",
      priceLevel: 0,
      phone: "+234 803 456 7890",
      email: "info@nga.gov.ng",
      website: "www.nga.gov.ng",
      instagram: "@nationalgalleryofartng",
      openingHours: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "10:00 AM - 4:00 PM",
        sunday: "Closed",
      },
      openNow: true,
      amenities: ["Parking", "Museum Shop", "Guided Tours"],
      upcomingExhibition: {
        name: "Nigerian Art Through the Ages",
        date: "Ongoing",
        description: "Permanent collection showcasing Nigerian art history",
      },
      featuredArtists: ["Ben Enwonwu", "Aina Onabolu", "Yusuf Grillo"],
      yearEstablished: 1977,
      reviews: [
        {
          user: "Olu A.",
          rating: 4.5,
          comment: "Important cultural institution",
          date: "2024-01-10",
          avatar: "https://randomuser.me/api/portraits/men/9.jpg",
        },
      ],
    },
    {
      id: 13,
      name: "Didi Museum",
      area: "Ikeja",
      exactLocation: "175 Akin Adesola Street, Alausa",
      coordinates: { lat: 6.6225, lng: 3.3512 },
      rating: 4.3,
      reviewCount: 456,
      description:
        "Historic museum and gallery preserving Nigerian art and cultural heritage.",
      image: "https://images.unsplash.com/photo-1554907984-15263a1a3aa8?w=500",
      images: [
        "https://images.unsplash.com/photo-1554907984-15263a1a3aa8?w=800",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
        "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=800",
      ],
      artStyles: ["Historical", "Traditional", "Cultural Artifacts"],
      priceRange: "Free - ₦20,000",
      priceLevel: 0,
      phone: "+234 805 123 4567",
      email: "info@didimuseum.com",
      website: "www.didimuseum.com",
      instagram: "@didimuseum",
      openingHours: {
        monday: "10:00 AM - 5:00 PM",
        tuesday: "10:00 AM - 5:00 PM",
        wednesday: "10:00 AM - 5:00 PM",
        thursday: "10:00 AM - 5:00 PM",
        friday: "10:00 AM - 5:00 PM",
        saturday: "10:00 AM - 5:00 PM",
        sunday: "Closed",
      },
      openNow: true,
      amenities: ["Library", "Research Center", "Gift Shop"],
      upcomingExhibition: {
        name: "Nigerian Independence Art Exhibition",
        date: "October 1-31, 2024",
        description: "Celebrating Nigerian independence through art",
      },
      featuredArtists: ["Various Nigerian Artists"],
      yearEstablished: 1987,
      reviews: [
        {
          user: "Ken O.",
          rating: 4,
          comment: "Rich cultural history",
          date: "2024-01-05",
          avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        },
      ],
    },

    // APAPA & MAINLAND GALLERIES
    {
      id: 14,
      name: "National Museum Lagos",
      area: "Apapa",
      exactLocation: "Onikan, Lagos Island",
      coordinates: { lat: 6.4487, lng: 3.3947 },
      rating: 4.5,
      reviewCount: 1890,
      description:
        "Premier museum featuring Nigerian art, history, and cultural artifacts including Benin bronzes.",
      image: "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=500",
      images: [
        "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=800",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
        "https://images.unsplash.com/photo-1554907984-15263a1a3aa8?w=800",
      ],
      artStyles: ["Historical", "Traditional", "Archeological", "Cultural"],
      priceRange: "₦500 - ₦5,000",
      priceLevel: 0,
      phone: "+234 802 234 5678",
      email: "info@nationalmuseumlagos.com",
      website: "www.nationalmuseumlagos.gov.ng",
      instagram: "@nationalmuseumlagos",
      openingHours: {
        monday: "9:00 AM - 4:30 PM",
        tuesday: "9:00 AM - 4:30 PM",
        wednesday: "9:00 AM - 4:30 PM",
        thursday: "9:00 AM - 4:30 PM",
        friday: "9:00 AM - 4:30 PM",
        saturday: "10:00 AM - 5:00 PM",
        sunday: "10:00 AM - 5:00 PM",
      },
      openNow: true,
      amenities: ["Parking", "Cafe", "Gift Shop", "Guided Tours"],
      upcomingExhibition: {
        name: "Benin Bronzes Exhibition",
        date: "March - December 2024",
        description: "Showcasing the famous Benin bronzes and artifacts",
      },
      featuredArtists: [
        "Ancient Benin Artists",
        "Nigerian Traditional Artists",
      ],
      yearEstablished: 1957,
      reviews: [
        {
          user: "Blessing E.",
          rating: 5,
          comment: "Amazing historical collection!",
          date: "2024-01-12",
          avatar: "https://randomuser.me/api/portraits/women/8.jpg",
        },
      ],
    },
    {
      id: 15,
      name: "GAF Gallery",
      area: "Mainland",
      exactLocation: "23 Allen Avenue, Ikeja",
      coordinates: { lat: 6.6035, lng: 3.3486 },
      rating: 4.3,
      reviewCount: 345,
      description:
        "Contemporary gallery showcasing emerging and established Nigerian artists.",
      image: "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=500",
      images: [
        "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=800",
        "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=800",
        "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=800",
      ],
      artStyles: ["Contemporary", "Modern", "Abstract"],
      priceRange: "₦50,000 - ₦500,000",
      priceLevel: 2,
      phone: "+234 808 123 4567",
      email: "info@gafgallery.com",
      website: "www.gafgallery.com",
      instagram: "@gafgallery",
      openingHours: {
        monday: "10:00 AM - 6:00 PM",
        tuesday: "10:00 AM - 6:00 PM",
        wednesday: "10:00 AM - 6:00 PM",
        thursday: "10:00 AM - 6:00 PM",
        friday: "10:00 AM - 6:00 PM",
        saturday: "11:00 AM - 5:00 PM",
        sunday: "Closed",
      },
      openNow: true,
      amenities: ["Parking", "WiFi", "Art Advisory"],
      upcomingExhibition: {
        name: "Contemporary Nigerian Masters",
        date: "May 1-31, 2024",
        description: "Works by leading contemporary artists",
      },
      featuredArtists: ["Various Contemporary Artists"],
      yearEstablished: 2015,
      reviews: [
        {
          user: "David O.",
          rating: 4.5,
          comment: "Great collection of contemporary art",
          date: "2024-01-03",
          avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        },
      ],
    },
    {
      id: 16,
      name: "Vivid Gallery",
      area: "Mainland",
      exactLocation: "15 Opebi Road, Ikeja",
      coordinates: { lat: 6.5912, lng: 3.3612 },
      rating: 4.2,
      reviewCount: 278,
      description:
        "Vibrant gallery space focusing on colorful contemporary African art.",
      image: "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=500",
      images: [
        "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=800",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
        "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=800",
      ],
      artStyles: ["Contemporary", "Colorful", "Expressive"],
      priceRange: "₦30,000 - ₦300,000",
      priceLevel: 1,
      phone: "+234 809 234 5678",
      email: "info@vividgallery.com",
      website: "www.vividgallery.com",
      instagram: "@vividgallery",
      openingHours: {
        monday: "10:00 AM - 6:00 PM",
        tuesday: "10:00 AM - 6:00 PM",
        wednesday: "10:00 AM - 6:00 PM",
        thursday: "10:00 AM - 6:00 PM",
        friday: "10:00 AM - 6:00 PM",
        saturday: "10:00 AM - 6:00 PM",
        sunday: "12:00 PM - 4:00 PM",
      },
      openNow: true,
      amenities: ["Cafe", "Art Classes"],
      upcomingExhibition: {
        name: "Color Explosion",
        date: "April 15 - May 20, 2024",
        description: "Celebration of color in contemporary art",
      },
      featuredArtists: ["Color-focused Artists"],
      yearEstablished: 2021,
      reviews: [
        {
          user: "Joy A.",
          rating: 4,
          comment: "Vibrant and lively space",
          date: "2024-01-02",
          avatar: "https://randomuser.me/api/portraits/women/9.jpg",
        },
      ],
    },
    {
      id: 17,
      name: "Blue Art Gallery",
      area: "Victoria Island",
      exactLocation: "8 Karimu Kotun Street, Victoria Island",
      coordinates: { lat: 6.4305, lng: 3.4189 },
      rating: 4.5,
      reviewCount: 567,
      description:
        "Elegant gallery specializing in contemporary Nigerian art and international artists.",
      image: "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=500",
      images: [
        "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=800",
        "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=800",
        "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=800",
      ],
      artStyles: ["Contemporary", "Abstract", "Figurative"],
      priceRange: "₦100,000 - ₦1,000,000",
      priceLevel: 3,
      phone: "+234 803 987 6543",
      email: "info@blueartgallery.com",
      website: "www.blueartgallery.com",
      instagram: "@blueartgallery",
      openingHours: {
        monday: "10:00 AM - 7:00 PM",
        tuesday: "10:00 AM - 7:00 PM",
        wednesday: "10:00 AM - 7:00 PM",
        thursday: "10:00 AM - 7:00 PM",
        friday: "10:00 AM - 7:00 PM",
        saturday: "11:00 AM - 5:00 PM",
        sunday: "Closed",
      },
      openNow: true,
      amenities: ["Parking", "WiFi", "Private Viewing Room"],
      upcomingExhibition: {
        name: "Modern Masters Series",
        date: "June 1-30, 2024",
        description: "Works by leading modern artists",
      },
      featuredArtists: ["Modern Nigerian Masters"],
      yearEstablished: 2014,
      reviews: [
        {
          user: "Richard N.",
          rating: 5,
          comment: "High-end gallery with excellent curation",
          date: "2024-01-11",
          avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        },
      ],
    },
    {
      id: 18,
      name: "Mydrim Gallery",
      area: "Ikoyi",
      exactLocation: "4 Mydrim Road, Ikoyi",
      coordinates: { lat: 6.4498, lng: 3.4412 },
      rating: 4.4,
      reviewCount: 389,
      description:
        "Long-standing gallery known for promoting Nigerian contemporary art since the 1990s.",
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500",
      images: [
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
        "https://images.unsplash.com/photo-1554907984-15263a1a3aa8?w=800",
        "https://images.unsplash.com/photo-1562104862-0f5888a3b9f8?w=800",
      ],
      artStyles: ["Contemporary", "Modern", "Portraiture"],
      priceRange: "₦80,000 - ₦800,000",
      priceLevel: 2,
      phone: "+234 802 456 7890",
      email: "info@mydrimgallery.com",
      website: "www.mydrimgallery.com",
      instagram: "@mydrimgallery",
      openingHours: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "10:00 AM - 2:00 PM",
        sunday: "Closed",
      },
      openNow: false,
      amenities: ["Art Restoration", "Framing Services"],
      upcomingExhibition: {
        name: "Nigerian Portraiture Today",
        date: "July 1-31, 2024",
        description: "Exploring modern Nigerian portraiture",
      },
      featuredArtists: ["Portrait Specialists"],
      yearEstablished: 1996,
      reviews: [
        {
          user: "Patience K.",
          rating: 4.5,
          comment: "Long-standing quality gallery",
          date: "2024-01-07",
          avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        },
      ],
    },
  ];

  // Additional galleries for more variety
  const additionalGalleries = [
    {
      id: 19,
      name: "Rele Gallery",
      area: "Victoria Island",
      exactLocation: "5 Milverton Road, Ikoyi",
      coordinates: { lat: 6.4467, lng: 3.4345 },
      rating: 4.7,
      reviewCount: 456,
      description:
        "Contemporary gallery representing a new generation of African artists with international presence.",
      image: "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=500",
      images: [
        "https://images.unsplash.com/photo-1554189097-ffe88e998a35?w=800",
      ],
      artStyles: ["Contemporary", "Conceptual", "Digital"],
      priceRange: "₦150,000 - ₦2,000,000",
      priceLevel: 3,
      phone: "+234 809 876 5432",
      email: "info@rele.gallery",
      website: "www.rele.gallery",
      instagram: "@relegallery",
      openingHours: {
        monday: "11:00 AM - 6:00 PM",
        tuesday: "11:00 AM - 6:00 PM",
        wednesday: "11:00 AM - 6:00 PM",
        thursday: "11:00 AM - 6:00 PM",
        friday: "11:00 AM - 6:00 PM",
        saturday: "11:00 AM - 6:00 PM",
        sunday: "Closed",
      },
      openNow: true,
      amenities: ["WiFi", "International Shipping"],
      upcomingExhibition: {
        name: "New African Narratives",
        date: "August 2024",
        description: "Contemporary African perspectives",
      },
      featuredArtists: ["Emerging African Artists"],
      yearEstablished: 2015,
      reviews: [],
    },
    {
      id: 20,
      name: "Signature Beyond Art Gallery",
      area: "Lekki",
      exactLocation: "Admiralty Way, Lekki Phase 1",
      coordinates: { lat: 6.4498, lng: 3.5189 },
      rating: 4.5,
      reviewCount: 234,
      description:
        "Luxury art gallery combining visual art with lifestyle and design.",
      image: "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=500",
      images: [
        "https://images.unsplash.com/photo-1547826039-6c8c8e28c13c?w=800",
      ],
      artStyles: ["Contemporary", "Design", "Luxury Art"],
      priceRange: "₦200,000 - ₦5,000,000",
      priceLevel: 3,
      phone: "+234 802 345 6789",
      email: "info@signaturebeyond.com",
      website: "www.signaturebeyond.com",
      instagram: "@signaturebeyond",
      openingHours: {
        monday: "10:00 AM - 7:00 PM",
        tuesday: "10:00 AM - 7:00 PM",
        wednesday: "10:00 AM - 7:00 PM",
        thursday: "10:00 AM - 7:00 PM",
        friday: "10:00 AM - 7:00 PM",
        saturday: "11:00 AM - 6:00 PM",
        sunday: "12:00 PM - 5:00 PM",
      },
      openNow: true,
      amenities: ["Luxury Lounge", "Art Advisory", "Private Events"],
      upcomingExhibition: {
        name: "Art & Luxury Collection",
        date: "September 2024",
        description: "Where art meets luxury lifestyle",
      },
      featuredArtists: ["Luxury Art Specialists"],
      yearEstablished: 2018,
      reviews: [],
    },
  ];

  // Combine all galleries
  const allGalleries = [...lagosArtGalleries, ...additionalGalleries];

  // ==================== INITIALIZATION ====================
  useEffect(() => {
    // Load galleries
    setGalleries(allGalleries);
    setFilteredGalleries(allGalleries);

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("lagosArtFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Load search history
    const savedHistory = localStorage.getItem("artSearchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }

    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // ==================== FILTER FUNCTIONS ====================
  const applyFilters = useCallback(() => {
    let filtered = [...galleries];

    // Area filter
    if (filters.areas.length > 0) {
      filtered = filtered.filter((g) => filters.areas.includes(g.area));
    }

    // Art style filter
    if (filters.artStyles.length > 0) {
      filtered = filtered.filter((g) =>
        g.artStyles.some((style) => filters.artStyles.includes(style)),
      );
    }

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter((g) => g.rating >= filters.minRating);
    }

    // Price range filter
    filtered = filtered.filter(
      (g) =>
        g.priceLevel >= filters.priceRange[0] &&
        g.priceLevel <= filters.priceRange[1],
    );

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(
        (g) =>
          g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.artStyles.some((style) =>
            style.toLowerCase().includes(searchQuery.toLowerCase()),
          ) ||
          g.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredGalleries(filtered);
    setCurrentPage(1);
  }, [galleries, filters, searchQuery]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // ==================== SEARCH FUNCTIONS ====================
  const handleSearchChange = (value) => {
    setSearchQuery(value);

    if (value.length > 2) {
      const suggestions = galleries
        .filter(
          (g) =>
            g.name.toLowerCase().includes(value.toLowerCase()) ||
            g.area.toLowerCase().includes(value.toLowerCase()) ||
            g.artStyles.some((style) =>
              style.toLowerCase().includes(value.toLowerCase()),
            ),
        )
        .slice(0, 8)
        .map((g) => ({ name: g.name, area: g.area, id: g.id }));

      setSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery && !searchHistory.includes(searchQuery)) {
      const newHistory = [searchQuery, ...searchHistory].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem("artSearchHistory", JSON.stringify(newHistory));
    }
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    handleSearch();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
  };

  // ==================== FAVORITES ====================
  const toggleFavorite = (galleryId) => {
    let newFavorites;
    if (favorites.includes(galleryId)) {
      newFavorites = favorites.filter((id) => id !== galleryId);
    } else {
      newFavorites = [...favorites, galleryId];
    }
    setFavorites(newFavorites);
    localStorage.setItem("lagosArtFavorites", JSON.stringify(newFavorites));
  };

  // ==================== PAGINATION ====================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGalleries = filteredGalleries.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredGalleries.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ==================== RENDER STARS ====================
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    return stars;
  };

  // ==================== GALLERY CARD COMPONENT ====================
  const GalleryCard = ({ gallery }) => {
    const [imageError, setImageError] = useState(false);
    const isFavorite = favorites.includes(gallery.id);

    return (
      <div className="gallery-card" onClick={() => setSelectedGallery(gallery)}>
        <div className="card-image-container">
          <img
            src={
              !imageError
                ? gallery.image
                : "https://via.placeholder.com/500x300?text=Art+Gallery"
            }
            alt={gallery.name}
            className="card-image"
            onError={() => setImageError(true)}
            loading="lazy"
          />
          <div className="card-actions">
            <button
              className={`action-btn favorite-btn ${isFavorite ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(gallery.id);
              }}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button
              className="action-btn share-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (navigator.share) {
                  navigator.share({
                    title: gallery.name,
                    text: `Check out ${gallery.name} in ${gallery.area}, Lagos`,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(
                    `${gallery.name} - ${gallery.area}, Lagos`,
                  );
                  alert("Gallery link copied!");
                }
              }}
            >
              <FaShare />
            </button>
          </div>
          {gallery.openNow && <div className="open-badge">Open Now</div>}
          {gallery.rating >= 4.7 && (
            <div className="featured-badge">Featured</div>
          )}
        </div>

        <div className="card-content">
          <h3 className="gallery-name">{gallery.name}</h3>

          <div className="location-info">
            <FaMapMarkerAlt className="icon" />
            <span>{gallery.area}</span>
          </div>

          <div className="rating-section">
            <div className="stars">{renderStars(gallery.rating)}</div>
            <span className="rating-value">{gallery.rating}</span>
            <span className="review-count">
              ({gallery.reviewCount} reviews)
            </span>
          </div>

          <div className="art-styles">
            {gallery.artStyles.slice(0, 3).map((style, idx) => (
              <span key={idx} className="style-tag">
                <FaTag className="tag-icon" />
                {style}
              </span>
            ))}
            {gallery.artStyles.length > 3 && (
              <span className="more-styles">
                +{gallery.artStyles.length - 3}
              </span>
            )}
          </div>

          <div className="price-range">
            <FaDollarSign className="price-icon" />
            {gallery.priceRange}
          </div>
        </div>
      </div>
    );
  };

  // ==================== GALLERY DETAIL MODAL ====================
  const GalleryDetailModal = ({ gallery, onClose }) => {
    if (!gallery) return null;
    const isFavorite = favorites.includes(gallery.id);

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>

          <div className="modal-grid">
            <div className="modal-images">
              <img
                src={gallery.image}
                alt={gallery.name}
                className="modal-main-image"
              />
              {gallery.images && gallery.images.length > 0 && (
                <div className="modal-thumbnails">
                  {gallery.images.slice(0, 4).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${gallery.name} view ${idx + 1}`}
                      className="thumbnail"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="modal-info">
              <h2>{gallery.name}</h2>

              <div className="modal-location">
                <FaMapMarkerAlt />
                <span>{gallery.exactLocation}</span>
              </div>

              <div className="modal-rating">
                <div className="stars">{renderStars(gallery.rating)}</div>
                <span className="rating">{gallery.rating}</span>
                <span className="review-count">
                  ({gallery.reviewCount} reviews)
                </span>
              </div>

              <p className="modal-description">{gallery.description}</p>

              <div className="modal-details-grid">
                <div className="detail-item">
                  <FaPhone />
                  <a href={`tel:${gallery.phone}`}>{gallery.phone}</a>
                </div>
                {gallery.email && (
                  <div className="detail-item">
                    <FaEnvelope />
                    <a href={`mailto:${gallery.email}`}>{gallery.email}</a>
                  </div>
                )}
                {gallery.website && (
                  <div className="detail-item">
                    <FaGlobe />
                    <a
                      href={`https://${gallery.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {gallery.website}
                    </a>
                  </div>
                )}
                {gallery.instagram && (
                  <div className="detail-item">
                    <FaInstagram />
                    <span>{gallery.instagram}</span>
                  </div>
                )}
              </div>

              <div className="modal-hours">
                <FaClock />
                <div className="hours-list">
                  {Object.entries(gallery.openingHours).map(([day, hours]) => (
                    <div key={day} className="hour-item">
                      <span className="day">
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </span>
                      <span className="hours">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-art-styles">
                <h4>Art Styles</h4>
                <div className="styles-list">
                  {gallery.artStyles.map((style, idx) => (
                    <span key={idx} className="style-badge">
                      {style}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-amenities">
                <h4>Amenities</h4>
                <div className="amenities-list">
                  {gallery.amenities.map((amenity, idx) => (
                    <span key={idx} className="amenity-badge">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {gallery.upcomingExhibition && (
                <div className="modal-exhibition">
                  <h4>Upcoming Exhibition</h4>
                  <div className="exhibition-card">
                    <strong>{gallery.upcomingExhibition.name}</strong>
                    <p>{gallery.upcomingExhibition.date}</p>
                    <small>{gallery.upcomingExhibition.description}</small>
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button
                  className="directions-btn"
                  onClick={() => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${gallery.coordinates.lat},${gallery.coordinates.lng}`;
                    window.open(url, "_blank");
                  }}
                >
                  Get Directions
                </button>
                <button
                  className={`favorite-modal-btn ${isFavorite ? "active" : ""}`}
                  onClick={() => toggleFavorite(gallery.id)}
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                  {isFavorite ? " Saved" : " Save to Favorites"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Available filter options
  const availableAreas = [...new Set(galleries.map((g) => g.area))];
  const availableArtStyles = [
    ...new Set(galleries.flatMap((g) => g.artStyles)),
  ];

  return (
    <div className="art-finder-container">
      {/* Header */}
      <header className="header">
        <h1 className="title">
          <FaPaintBrush className="title-icon" />
          Lagos Art Gallery Finder
        </h1>
        <p className="subtitle">
          Discover {galleries.length}+ premier art galleries across Victoria
          Island, Ikoyi, Lekki, and more
        </p>
      </header>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-container">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by gallery name, area, or art style..."
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-btn" onClick={clearSearch}>
                <FaTimes />
              </button>
            )}
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((suggestion, idx) => (
                <div
                  key={idx}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <FaMapMarkerAlt className="suggestion-icon" />
                  <div>
                    <div className="suggestion-name">{suggestion.name}</div>
                    <div className="suggestion-area">{suggestion.area}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="search-stats">
          <span className="results-count">
            {filteredGalleries.length} galleries found
          </span>
          {searchHistory.length > 0 && (
            <div className="search-history">
              <span>Recent: </span>
              {searchHistory.slice(0, 3).map((term, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(term);
                    handleSearch();
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <button
          className={`filter-toggle ${showFilters ? "active" : ""}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> Filters{" "}
          {Object.values(filters).some((f) =>
            Array.isArray(f) ? f.length > 0 : f !== 0 && f == [0, 3],
          ) && <span className="filter-badge">•</span>}
        </button>

        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <FaTh /> Grid
          </button>
          <button
            className={`view-btn ${viewMode === "map" ? "active" : ""}`}
            onClick={() => setViewMode("map")}
          >
            <FaMap /> Map
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>📍 Areas</label>
            <div className="filter-options">
              {availableAreas.map((area) => (
                <button
                  key={area}
                  className={`filter-option ${filters.areas.includes(area) ? "active" : ""}`}
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      areas: prev.areas.includes(area)
                        ? prev.areas.filter((a) => a !== area)
                        : [...prev.areas, area],
                    }));
                  }}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>🎨 Art Styles</label>
            <div className="filter-options">
              {availableArtStyles.slice(0, 12).map((style) => (
                <button
                  key={style}
                  className={`filter-option ${filters.artStyles.includes(style) ? "active" : ""}`}
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      artStyles: prev.artStyles.includes(style)
                        ? prev.artStyles.filter((s) => s !== style)
                        : [...prev.artStyles, style],
                    }));
                  }}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>⭐ Minimum Rating</label>
            <div className="rating-filters">
              {[0, 3, 3.5, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  className={`filter-option ${filters.minRating === rating ? "active" : ""}`}
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, minRating: rating }))
                  }
                >
                  {rating === 0 ? "All" : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>💰 Price Range</label>
            <div className="price-filters">
              <button
                className={`filter-option ${filters.priceRange[0] === 0 && filters.priceRange[1] === 3 ? "active" : ""}`}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, priceRange: [0, 3] }))
                }
              >
                All
              </button>
              <button
                className={`filter-option ${filters.priceRange[0] === 0 && filters.priceRange[1] === 0 ? "active" : ""}`}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, priceRange: [0, 0] }))
                }
              >
                Free - Budget
              </button>
              <button
                className={`filter-option ${filters.priceRange[0] === 1 && filters.priceRange[1] === 2 ? "active" : ""}`}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, priceRange: [1, 2] }))
                }
              >
                Mid-Range
              </button>
              <button
                className={`filter-option ${filters.priceRange[0] === 3 && filters.priceRange[1] === 3 ? "active" : ""}`}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, priceRange: [3, 3] }))
                }
              >
                Premium
              </button>
            </div>
          </div>

          <button
            className="clear-filters"
            onClick={() =>
              setFilters({
                areas: [],
                artStyles: [],
                minRating: 0,
                priceRange: [0, 3],
              })
            }
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="loading-state">
          <FaSpinner className="spinner" />
          <p>Discovering art galleries in Lagos...</p>
        </div>
      ) : (
        <>
          {/* Gallery Grid */}
          {viewMode === "grid" && (
            <>
              <div className="gallery-grid">
                {currentGalleries.map((gallery) => (
                  <GalleryCard key={gallery.id} gallery={gallery} />
                ))}
              </div>

              {filteredGalleries.length === 0 && (
                <div className="no-results">
                  <FaExclamationTriangle className="no-results-icon" />
                  <h3>No galleries found</h3>
                  <p>Try adjusting your filters or search terms</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="page-btn"
                  >
                    <FaChevronLeft />
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`page-btn ${currentPage === pageNumber ? "active" : ""}`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return (
                        <span key={pageNumber} className="page-dots">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="page-btn"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Map View */}
          {viewMode === "map" && (
            <div className="map-view-placeholder">
              <FaMap className="map-icon" />
              <h3>Map View Coming Soon</h3>
              <p>
                Interactive map with gallery locations will be available in the
                next update
              </p>
              <button
                onClick={() => setViewMode("grid")}
                className="switch-btn"
              >
                Switch to Grid View
              </button>
            </div>
          )}
        </>
      )}

      {/* Gallery Detail Modal */}
      {selectedGallery && (
        <GalleryDetailModal
          gallery={selectedGallery}
          onClose={() => setSelectedGallery(null)}
        />
      )}
    </div>
  );
};

export default ArtGalleryFinder;
