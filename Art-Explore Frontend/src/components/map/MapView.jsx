// For managing component state
import React, { useEffect } from "react";
import "./MapView.scss";

// Map components
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";

// Leaflet core library
import L from "leaflet";

// Map styles
import "leaflet/dist/leaflet.css";

// Leaflet's default markers need this fix to work in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom red marker icon
const customIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// This component controls the map view when filters change
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// GALLERY DATA WITH IMAGES AND DESCRIPTIONS
const GALLERIES = [
  {
    id: 1,
    name: "Nike Art Gallery",
    address: "2 Elegushi Rd, Lekki Phase I, Lagos",
    lat: 6.4563,
    lng: 3.4479,
    image: "https://humbo.com/opengraph/places/ng/nike-art-gallery",
    description:
      "Largest art gallery in West Africa featuring contemporary and traditional Nigerian art",
  },
  {
    id: 2,
    name: "Rele Gallery",
    address: "7A Milverton Rd, Ikoyi, Lagos",
    lat: 6.4531,
    lng: 3.4315,
    image:
      "https://sumellist.com/wp-content/uploads/2023/02/Rele_New_Gallery_Day_1-112.jpg",
    description:
      "Contemporary art gallery showcasing emerging and established African artists",
  },
  {
    id: 3,
    name: "Onemka Gallery",
    address: "10 Thompson Ave, Ikoyi, Lagos",
    lat: 6.4492,
    lng: 3.432,
    image:
      "https://gallery.omenka.net/wp-content/uploads/2022/08/Duke-Asidere-The-Artist-and-His-Muse-2014-copy.png",
    description:
      "Premier destination for contemporary African art and cultural events",
  },
  {
    id: 4,
    name: "Terra Kulture",
    address: "1376 Tiamiyu Savage St, Victoria Island, Lagos",
    lat: 6.4355,
    lng: 3.4224,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.6PadSyPiHIKOItl4T4FDqQHaEt?pid=Api&h=220&P=0",
    description:
      "Arts and culture center featuring gallery, theater, and Nigerian cuisine",
  },
  {
    id: 5,
    name: "SMO Contemporary Art",
    address: "4b Wole Olateju Cres, Ikoyi, Lagos",
    lat: 6.4478,
    lng: 3.4389,
    image:
      "https://d7hftxdivxxvm.cloudfront.net/?height=630&quality=80&resize_to=fill&src=https:%2F%2Fd32dm0rphc51dk.cloudfront.net%2F8d-jRRSTx_q8xwMaKZZXpA%2Flarger.jpg&width=1200",
    description: "Cutting-edge contemporary art from leading African artists",
  },
  {
    id: 6,
    name: "G.A.S (Guest Artists Space)",
    address: "12 Igbira St, Yaba, Lagos",
    lat: 6.5033,
    lng: 3.3705,
    image:
      "https://www.guestartistsspace.com/Portals/0/EasyDNNnews/759/img-GAS-lagos-.png",
    description:
      "Residency program and exhibition space for local and international artists",
  },
  {
    id: 7,
    name: "National Museum Lagos",
    address: "Onikan, Lagos Island, Lagos",
    lat: 6.4481,
    lng: 3.3997,
    image:
      "https://i.pinimg.com/originals/23/2c/2a/232c2aed727e4b3992abfaddc2809d22.jpg",
    description:
      "Historical museum showcasing Nigerian art, culture, and archaeological treasures",
  },
  {
    id: 8,
    name: "Art Twenty One",
    address: "21 Eletu Ogabi St, Victoria Island, Lagos",
    lat: 6.435,
    lng: 3.4285,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.6pVWssXBeLTZUoo_ZgitTwHaE8?pid=Api&h=220&P=0",
    description:
      "Contemporary art space featuring thought-provoking exhibitions",
  },
  {
    id: 9,
    name: "Mydrim Gallery",
    address: "48B Raymond Njoku St, Ikoyi, Lagos",
    lat: 6.4523,
    lng: 3.4367,
    image:
      "https://cdn.businessday.ng/2021/02/Untitled-design-2021-02-10T122135.790.png",
    description:
      "Established gallery promoting Nigerian contemporary art since 1990",
  },
  {
    id: 10,
    name: "Nimbus Art Gallery",
    address: "4 Asoye Rd, Victoria Island, Lagos",
    lat: 6.4382,
    lng: 3.4256,
    image:
      "https://ericotrips.files.wordpress.com/2021/07/bogobiri-house-nimbus-art-gallery-ikoyi.jpg",
    description:
      "Focused on promoting emerging Nigerian artists and contemporary African art",
  },
  {
    id: 11,
    name: "African Artists Foundation",
    address: "54 Raymond Njoku St, Ikoyi, Lagos",
    lat: 6.452,
    lng: 3.438,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.UGEuoh1OBOhMKQHSKvWU-wHaEK?pid=Api&h=220&P=0",
    description:
      "Non-profit supporting African artists through residencies and exhibitions",
  },
  {
    id: 12,
    name: "Kalakuta Museum",
    address: "7 Gbemisola St, Ikeja, Lagos",
    lat: 6.5815,
    lng: 3.3498,
    image:
      "https://travellemming.com/wp-content/uploads/Kalakuta-Republic-Museum-1024x576.jpg",
    description:
      "Former home of Fela Kuti, now a museum celebrating his legacy and Afrobeat",
  },
  {
    id: 13,
    name: "Quintessence Gallery",
    address: "15a Idowu Martins St, Victoria Island, Lagos",
    lat: 6.437,
    lng: 3.4265,
    image:
      "https://tse2.mm.bing.net/th/id/OIP.o1RnGjCH5Yhasjme1o3NPwHaFj?pid=Api&h=220&P=0",
    description:
      "Luxury art gallery featuring high-end African contemporary art",
  },
  {
    id: 14,
    name: "Art Cafe",
    address: "24 Hughes Ave, Surulere, Lagos",
    lat: 6.4985,
    lng: 3.3542,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.EpjCNkOoWNey27LGL_iBjQHaFj?pid=Api&h=220&P=0",
    description: "Cozy cafe and art space showcasing local artists",
  },
  {
    id: 15,
    name: "Goethe-Institut Lagos",
    address: "12 Idowu Martins St, Victoria Island, Lagos",
    lat: 6.4378,
    lng: 3.426,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.qsIDuoQ-evkrZOcLSmM91wHaFN?pid=Api&h=220&P=0",
    description:
      "German cultural institute featuring art exhibitions and film screenings",
  },
];

const MapComponent = ({ region = "All" }) => {
  const getMapConfig = () => {
    if (region === "Island") {
      return { center: [6.448, 3.42], zoom: 13 };
    } else if (region === "Mainland") {
      return { center: [6.54, 3.36], zoom: 13 };
    }
    return { center: [6.5244, 3.3792], zoom: 12 };
  };

  const getFilteredGalleries = () => {
    if (region === "Island") {
      return GALLERIES.filter((g) =>
        ["Lekki", "Victoria Island", "Ikoyi", "Lagos Island"].some((area) =>
          g.address.includes(area),
        ),
      );
    } else if (region === "Mainland") {
      return GALLERIES.filter((g) =>
        ["Yaba", "Ikeja", "Surulere"].some((area) => g.address.includes(area)),
      );
    }
    return GALLERIES;
  };

  const { center, zoom } = getMapConfig();
  const filteredGalleries = getFilteredGalleries();

  // Function to handle directions click
  const getDirections = (lat, lng) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank",
    );
  };

  return (
    <MapContainer
      center={center}
      id="map"
      className="Map-Container"
      zoom={zoom}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ height: "500px", width: "100%", borderRadius: "12px" }}
    >
      <MapController center={center} zoom={zoom} />
      <ZoomControl position="bottomright" />

      {/* Free OpenStreetMap tiles - no API key needed */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render all gallery markers WITH IMAGES */}
      {filteredGalleries.map((gallery) => (
        <Marker
          key={gallery.id}
          position={[gallery.lat, gallery.lng]}
          icon={customIcon}
        >
          <Popup maxWidth={320} minWidth={280}>
            <div className="gallery-popup-content">
              {/* Gallery Image */}
              {gallery.image && (
                <div className="popup-image">
                  <img
                    src={gallery.image}
                    alt={gallery.name}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x250?text=Image+Coming+Soon";
                    }}
                  />
                </div>
              )}

              {/* Gallery Info */}
              <div className="popup-info">
                <h3 className="gallery-name">{gallery.name}</h3>
                <p className="gallery-address">📍 {gallery.address}</p>
                {gallery.description && (
                  <p className="gallery-description">{gallery.description}</p>
                )}
                <button
                  className="directions-btn"
                  onClick={() => getDirections(gallery.lat, gallery.lng)}
                >
                  Click for directions
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
