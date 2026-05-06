// galleries.js
// ─── Mock Hours ───────────────────────────────────────────────
const H = new Date().getHours();
const OPEN_NOW   = Array(7).fill({ open: `${H - 1}:00`, close: `${H + 3}:00` });
const CLOSED_NOW = Array(7).fill({ open: "09:00", close: "10:00" });

// ─── Galleries Data ───────────────────────────────────────────
export const GALLERIES = [
  {
    id: 1,
    name: "Lagos Contemporary",
    neighborhood: "Victoria Island",
    artTypes: ["gallery", "exhibition"],
    hours: OPEN_NOW,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=80",
  },
  {
    id: 2,
    name: "Terra Kulture",
    neighborhood: "Victoria Island",
    artTypes: ["gallery", "events"],
    hours: OPEN_NOW,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=600&q=80",
  },
  {
    id: 3,
    name: "Nike Art Gallery",
    neighborhood: "Lekki",
    artTypes: ["gallery", "artists"],
    hours: OPEN_NOW,
    rating: 4.9,
    image:
      "https://d1rgjmn2wmqeif.cloudfront.net/extra/b/HomePageModule-40923-95830.jpg",
  },
  {
    id: 4,
    name: "Rele Gallery",
    neighborhood: "Ikoyi",
    artTypes: ["gallery", "exhibition"],
    hours: CLOSED_NOW,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=600&q=80",
  },
  {
    id: 5,
    name: "Signature Beyond Art",
    neighborhood: "Lekki",
    artTypes: ["exhibition", "events"],
    hours: OPEN_NOW,
    rating: 3.9,
    image:
      "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=80",
  },
  {
    id: 6,
    name: "Omenka Gallery",
    neighborhood: "Ikoyi",
    artTypes: ["gallery", "artists"],
    hours: CLOSED_NOW,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1576773689115-5cd2b4223bd0?w=600&q=80",
  },
  {
    id: 7,
    name: "Mydrim Gallery",
    neighborhood: "Ikoyi",
    artTypes: ["gallery", "exhibition"],
    hours: OPEN_NOW,
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80",
  },
  {
    id: 8,
    name: "WhiteSpace Lagos",
    neighborhood: "Victoria Island",
    artTypes: ["events", "exhibition"],
    hours: OPEN_NOW,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&q=80",
  },
  {
    id: 9,
    name: "African Artists Foundation",
    neighborhood: "Lagos Island",
    artTypes: ["artists", "events"],
    hours: OPEN_NOW,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&q=80",
  },
  {
    id: 10,
    name: "Genesis Art Gallery",
    neighborhood: "Marina",
    artTypes: ["gallery", "artists"],
    hours: CLOSED_NOW,
    rating: 3.8,
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80",
  },
  {
    id: 11,
    name: "Eko Gallery",
    neighborhood: "Apapa",
    artTypes: ["events", "gallery"],
    hours: OPEN_NOW,
    rating: 3.6,
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
  },
  {
    id: 12,
    name: "Retro Frames",
    neighborhood: "Surulere",
    artTypes: ["gallery", "exhibition"],
    hours: CLOSED_NOW,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
  },
];

