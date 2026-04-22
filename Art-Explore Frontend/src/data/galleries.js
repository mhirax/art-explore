// src/data/galleryData.js

// ART GALLERIES DATA WITH VENUETYPE ADDED
export const galleries = [
  {
    id: 1,
    name: "Nike Art Gallery",
    type: "commercial-gallery",
    venueType: "Gallery", // ADDED for filtering
    neighborhood: "Lekki",
    address: "2, Elegushi Road, Lekki Phase 1, Lagos",
    coordinates: { lat: 6.4345, lng: 3.4683 },
    contact: {
      phone: "+234 802 345 6789",
      email: "info@nikeartgallery.com",
      website: "https://nikeartgallery.com",
      instagram: "@nikeartgallery",
    },
    hours: {
      monday: "10:00 - 18:00",
      tuesday: "10:00 - 18:00",
      wednesday: "10:00 - 18:00",
      thursday: "10:00 - 18:00",
      friday: "10:00 - 18:00",
      saturday: "10:00 - 18:00",
      sunday: "12:00 - 17:00",
    },
    description:
      "One of Nigeria's largest art galleries, founded by renowned artist Nike Davies-Okundaye. Features traditional and contemporary Nigerian art, textiles, and workshops.",
    images: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhy7KJL47g6IHPRHIkkUHXX3VfAXZtTs_88wiamTpmD8661Z5h2TJkQ0698cryU7M-qoecD6Iu96wB-WmOFCYpSHrWQJOow8FCmkfy8eqeM5RH9aU07lkDrIHOVdeSQnkyhSQKkJo-lTg/s1600/The+AfroFusion+Spot+-+Nike+Art+Gallery+lagos+Nigeria+%252810%2529..jpg",
    ],
    featuredImage:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhy7KJL47g6IHPRHIkkUHXX3VfAXZtTs_88wiamTpmD8661Z5h2TJkQ0698cryU7M-qoecD6Iu96wB-WmOFCYpSHrWQJOow8FCmkfy8eqeM5RH9aU07lkDrIHOVdeSQnkyhSQKkJo-lTg/s1600/The+AfroFusion+Spot+-+Nike+Art+Gallery+lagos+Nigeria+%252810%2529..jpg",
    artTypes: ["painting", "textile", "sculpture", "traditional"],
    currentExhibition: {
      title: "Echoes of Heritage",
      artist: "Chief Nike Davies-Okundaye",
      startDate: "2024-06-01",
      endDate: "2024-07-30",
      openingReception: "2024-06-01 17:00",
      description:
        "A retrospective showcasing four decades of textile art and paintings celebrating Yoruba heritage.",
    },
    upcomingExhibition: {
      title: "New Voices: Emerging Nigerian Artists",
      startDate: "2024-08-15",
      description:
        "Featuring 15 emerging artists redefining contemporary Nigerian art.",
    },
    featured: true,
  },
  {
    id: 2,
    name: "Rele Gallery",
    type: "commercial-gallery",
    venueType: "Gallery", // ADDED for filtering
    neighborhood: "Victoria Island",
    address: "7, Military Street, Onikan, Lagos Island",
    coordinates: { lat: 6.4435, lng: 3.4125 },
    contact: {
      phone: "+234 812 345 6789",
      email: "info@relegallery.com",
      website: "https://relegallery.com",
      instagram: "@relegallery",
    },
    hours: {
      monday: "10:00 - 18:00",
      tuesday: "10:00 - 18:00",
      wednesday: "10:00 - 18:00",
      thursday: "10:00 - 18:00",
      friday: "10:00 - 18:00",
      saturday: "11:00 - 17:00",
      sunday: "Closed",
    },
    description:
      "Contemporary art gallery representing some of Africa's most exciting artists. Focuses on pushing boundaries and showcasing innovative contemporary art.",
    images: [
      "https://images.unsplash.com/photo-1562322140-8baeececf3df",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
    ],
    featuredImage:
      "https://sumellist.com/wp-content/uploads/2023/02/2019-03-14.jpg",
    artTypes: ["painting", "sculpture", "photography", "mixed-media"],
    currentExhibition: {
      title: "Fragments of Memory",
      artist: "Temitayo Ogunbiyi",
      startDate: "2024-06-10",
      endDate: "2024-07-25",
      openingReception: "2024-06-10 18:00",
      description:
        "Exploring memory through mixed media installations and sculptures.",
    },
    upcomingExhibition: {
      title: "Lagos Through the Lens",
      startDate: "2024-08-20",
      description: "Photography exhibition capturing the essence of Lagos.",
    },
    featured: true,
  },
  {
    id: 3,
    name: "Omenka Gallery",
    type: "commercial-gallery",
    venueType: "Gallery", // ADDED for filtering
    neighborhood: "Ikoyi",
    address: "24, Alexander Avenue, Ikoyi, Lagos",
    coordinates: { lat: 6.4545, lng: 3.4325 },
    contact: {
      phone: "+234 803 456 7890",
      email: "info@omenkagallery.com",
      website: "https://omenkagallery.com",
      instagram: "@omenkagallery",
    },
    hours: {
      monday: "10:00 - 18:00",
      tuesday: "10:00 - 18:00",
      wednesday: "10:00 - 18:00",
      thursday: "10:00 - 18:00",
      friday: "10:00 - 18:00",
      saturday: "10:00 - 16:00",
      sunday: "Closed",
    },
    description:
      "A premier contemporary art space showcasing both established and emerging Nigerian artists with a focus on provocative and thought-provoking works.",
    images: [
      "https://images.unsplash.com/photo-1536924940840-4c65e17e500c",
      "https://images.unsplash.com/photo-1544967082-d9d25d867d43",
    ],
    featuredImage:
      "https://cimages.timbu.com/guides/2017/08/omenka9-1024x682.jpeg",
    artTypes: ["painting", "sculpture", "digital-art"],
    currentExhibition: {
      title: "Urban Rhythms",
      artist: "Olu Amoda",
      startDate: "2024-06-05",
      endDate: "2024-07-20",
      openingReception: "2024-06-05 18:30",
      description:
        "Metal sculptures exploring urban life and industrial materials.",
    },
    upcomingExhibition: {
      title: "Women in Art",
      startDate: "2024-08-05",
      description:
        "Celebrating female Nigerian artists and their contributions.",
    },
    featured: true,
  },
  {
    id: 4,
    name: "Terra Kulture",
    type: "art-center",
    venueType: "Art center", // ADDED for filtering
    neighborhood: "Victoria Island",
    address: "1376, Tiamiyu Savage Street, Victoria Island, Lagos",
    coordinates: { lat: 6.4345, lng: 3.4285 },
    contact: {
      phone: "+234 908 765 4321",
      email: "info@terrakulture.com",
      website: "https://terrakulture.com",
      instagram: "@terrakulture",
    },
    hours: {
      monday: "09:00 - 20:00",
      tuesday: "09:00 - 20:00",
      wednesday: "09:00 - 20:00",
      thursday: "09:00 - 20:00",
      friday: "09:00 - 20:00",
      saturday: "10:00 - 18:00",
      sunday: "12:00 - 18:00",
    },
    description:
      "A cultural hub combining art gallery, theater, restaurant, and bookshop. Dedicated to promoting Nigerian arts and culture.",
    images: [
      "https://images.unsplash.com/photo-1544967082-d9d25d867d43",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6",
    ],
    featuredImage:
      "https://rexclarkeadventures.com/wp-content/uploads/2024/09/terra-kulture-lagos-1-1024x576-1.jpg",
    artTypes: ["painting", "sculpture", "theater", "literature"],
    currentExhibition: {
      title: "Nigeria @ 64: A Visual Journey",
      artist: "Various Artists",
      startDate: "2024-06-15",
      endDate: "2024-08-15",
      openingReception: "2024-06-15 16:00",
      description:
        "A group exhibition celebrating Nigerian independence through art.",
    },
    upcomingExhibition: {
      title: "Art & Cuisine: A Sensory Experience",
      startDate: "2024-09-01",
      description: "Combining visual art with Nigerian culinary experiences.",
    },
    featured: true,
  },
  {
    id: 5,
    name: "SMO Contemporary Art",
    type: "commercial-gallery",
    venueType: "Gallery", // ADDED for filtering
    neighborhood: "Ikoyi",
    address: "7, Idowu Martins Street, Banana Island, Ikoyi, Lagos",
    coordinates: { lat: 6.4455, lng: 3.4425 },
    contact: {
      phone: "+234 802 567 8901",
      email: "info@smocontemporary.com",
      website: "https://smocontemporary.com",
      instagram: "@smocontemporary",
    },
    hours: {
      monday: "10:00 - 18:00",
      tuesday: "10:00 - 18:00",
      wednesday: "10:00 - 18:00",
      thursday: "10:00 - 18:00",
      friday: "10:00 - 18:00",
      saturday: "11:00 - 16:00",
      sunday: "Closed",
    },
    description:
      "Contemporary art gallery showcasing emerging and mid-career African artists with a focus on conceptual and socially engaged practices.",
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
      "https://images.unsplash.com/photo-1536924940840-4c65e17e500c",
    ],
    featuredImage:
      "https://artlogic-res.cloudinary.com/w_1200,h_630,c_fill,f_auto,fl_lossy,q_auto/ws-smocontemporaryart/usr/library/images/main/pages/1/lai_0644-2.jpg",
    artTypes: ["painting", "mixed-media", "installation", "photography"],
    currentExhibition: {
      title: "Lagos Uncovered",
      artist: "Ade Adekola",
      startDate: "2024-06-20",
      endDate: "2024-08-10",
      openingReception: "2024-06-20 18:00",
      description:
        "Photographic exploration of Lagos street life and architecture.",
    },
    upcomingExhibition: {
      title: "Eco-Conscious Art",
      startDate: "2024-08-25",
      description: "Artists working with recycled and sustainable materials.",
    },
    featured: false,
  },
  {
    id: 6,
    name: "G.A.S. (Guest Artists Space)",
    type: "private-studio",
    venueType: "Studio", // ADDED for filtering
    neighborhood: "Yaba",
    address: "22, Omotayo Ojo Street, Yaba, Lagos",
    coordinates: { lat: 6.5045, lng: 3.3825 },
    contact: {
      phone: "+234 809 876 5432",
      email: "info@gasfoundation.org",
      website: "https://gasfoundation.org",
      instagram: "@gasfoundation",
    },
    hours: {
      monday: "10:00 - 17:00",
      tuesday: "10:00 - 17:00",
      wednesday: "10:00 - 17:00",
      thursday: "10:00 - 17:00",
      friday: "10:00 - 17:00",
      saturday: "By appointment",
      sunday: "Closed",
    },
    description:
      "Artist residency and studio space founded by Yinka Shonibare. Provides workspace and opportunities for Nigerian and international artists.",
    images: [
      "https://images.unsplash.com/photo-1531058020387-3be344556be6",
      "https://images.unsplash.com/photo-1544967082-d9d25d867d43",
    ],
    featuredImage:
      "https://artlogic-res.cloudinary.com/w_1200,h_630,c_fill,f_webp,fl_lossy,q_auto:good/ws-stephenfriedman/usr/images/news/list_image/items/7b/7b0dfe0b990d448289399a5add80376a/cri03068-990000079e04513c.jpg",
    artTypes: ["painting", "sculpture", "installation", "multidisciplinary"],
    currentExhibition: {
      title: "Residency Showcase: Summer 2024",
      artist: "Resident Artists",
      startDate: "2024-07-01",
      endDate: "2024-07-30",
      openingReception: "2024-07-01 17:00",
      description: "New works from international artists-in-residence.",
    },
    upcomingExhibition: {
      title: "Open Studios",
      startDate: "2024-08-10",
      description: "Public access to artist studios and works-in-progress.",
    },
    featured: false,
  },
  {
    id: 7,
    name: "National Museum Lagos",
    type: "museum",
    venueType: "Museum", // ADDED for filtering
    neighborhood: "Lagos Island",
    address: "Onikan, Lagos Island, Lagos",
    coordinates: { lat: 6.4435, lng: 3.4055 },
    contact: {
      phone: "+234 802 123 4567",
      email: "info@nationalmuseumlagos.gov.ng",
      website: "https://nationalmuseum.gov.ng",
      instagram: "@nationalmuseumlagos",
    },
    hours: {
      monday: "09:00 - 17:00",
      tuesday: "09:00 - 17:00",
      wednesday: "09:00 - 17:00",
      thursday: "09:00 - 17:00",
      friday: "09:00 - 17:00",
      saturday: "10:00 - 16:00",
      sunday: "12:00 - 16:00",
    },
    description:
      "Nigeria's premier museum showcasing archaeological and ethnographic collections, including Benin Bronzes and Nok Terracottas.",
    images: [
      "https://images.unsplash.com/photo-1536924940840-4c65e17e500c",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
    ],
    featuredImage:
      "https://news.artnet.com/app/news-upload/2020/02/AS5A3055-1024x683.jpg",
    artTypes: ["historical", "archaeological", "traditional", "sculpture"],
    currentExhibition: {
      title: "Benin Bronzes: Return & Reclaim",
      artist: "Historical",
      startDate: "2024-05-01",
      endDate: "2024-09-30",
      openingReception: null,
      description:
        "Exhibition on the repatriation and significance of Benin Bronzes.",
    },
    upcomingExhibition: {
      title: "Yoruba Art Through the Ages",
      startDate: "2024-10-01",
      description:
        "Comprehensive survey of Yoruba art from ancient to contemporary.",
    },
    featured: false,
  },
  {
    id: 8,
    name: "Art Twenty One",
    type: "commercial-gallery",
    venueType: "Gallery", // ADDED for filtering
    neighborhood: "Victoria Island",
    address: "21, Olosa Street, Victoria Island, Lagos",
    coordinates: { lat: 6.4315, lng: 3.4225 },
    contact: {
      phone: "+234 803 789 0123",
      email: "info@art21lagos.com",
      website: "https://art21lagos.com",
      instagram: "@art21lagos",
    },
    hours: {
      monday: "10:00 - 18:00",
      tuesday: "10:00 - 18:00",
      wednesday: "10:00 - 18:00",
      thursday: "10:00 - 18:00",
      friday: "10:00 - 18:00",
      saturday: "11:00 - 16:00",
      sunday: "Closed",
    },
    description:
      "Contemporary art space focusing on cutting-edge Nigerian and African artists. Known for bold curatorial vision and experimental practices.",
    images: [
      "https://images.unsplash.com/photo-1562322140-8baeececf3df",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6",
    ],
    featuredImage:
      "https://independent.ng/wp-content/uploads/WhatsApp-Image-2023-11-10-at-14.03.31.jpeg",
    artTypes: ["painting", "sculpture", "digital-art", "video-art"],
    currentExhibition: {
      title: "Digital Frontiers",
      artist: "Collective",
      startDate: "2024-06-25",
      endDate: "2024-08-20",
      openingReception: "2024-06-25 19:00",
      description: "Exploring the intersection of art and technology.",
    },
    upcomingExhibition: {
      title: "Material Matters",
      startDate: "2024-09-15",
      description: "Artists working with unconventional materials.",
    },
    featured: true,
  },
];



// Filter options
export const neighborhoods = [
  "All",
  "Ikoyi",
  "Victoria Island",
  "Lekki",
  "Yaba",
  "Lagos Island",
  "Surulere",
];

export const artTypes = ["All", "Gallery", "Studio", "Museum", "Art center"];
