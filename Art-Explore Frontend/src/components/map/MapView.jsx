// For managing component state
import React, { useEffect } from "react";

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
 //why is this is needed: React-Leaflet has trouble loading Leaflet's default marker images.
 // This manually tells it where to find them.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

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
  const map = useMap(); // Gets access to the map instance
  useEffect(() => {
    // This runs when 'center' or 'zoom' changes
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null; // This component doesn't render anything visible
}

//GALLERY DATA
const GALLERIES = [
  {
    id: 1,
    name: "Nike Art Gallery",
    address: "2 Elegushi Rd, Lekki Phase I, Lagos",
    lat: 6.4563,
    lng: 3.4479,
  },
  {
    id: 2,
    name: "Rele Gallery",
    address: "7A Milverton Rd, Ikoyi, Lagos",
    lat: 6.4531,
    lng: 3.4315,
  },
  {
    id: 3,
    name: "Onemka Gallery",
    address: "10 Thompson Ave, Ikoyi, Lagos",
    lat: 6.4492,
    lng: 3.432,
  },
  {
    id: 4,
    name: "Terra Kulture",
    address: "1376 Tiamiyu Savage St, Victoria Island, Lagos",
    lat: 6.4355,
    lng: 3.4224,
  },
  {
    id: 5,
    name: "SMO Contemporary Art",
    address: "4b Wole Olateju Cres, Ikoyi, Lagos",
    lat: 6.4478,
    lng: 3.4389,
  },
  {
    id: 6,
    name: "G.A.S (Guest Artists Space)",
    address: "12 Igbira St, Yaba, Lagos",
    lat: 6.5033,
    lng: 3.3705,
  },
  {
    id: 7,
    name: "National Museum Lagos",
    address: "Onikan, Lagos Island, Lagos",
    lat: 6.4481,
    lng: 3.3997,
  },
  {
    id: 8,
    name: "Art Twenty One",
    address: "21 Eletu Ogabi St, Victoria Island, Lagos",
    lat: 6.435,
    lng: 3.4285,
  },
  {
    id: 9,
    name: "Mydrim Gallery",
    address: "48B Raymond Njoku St, Ikoyi, Lagos",
    lat: 6.4523,
    lng: 3.4367,
  },
  {
    id: 10,
    name: "Nimbus Art Gallery",
    address: "4 Asoye Rd, Victoria Island, Lagos",
    lat: 6.4382,
    lng: 3.4256,
  },
  {
    id: 11,
    name: "African Artists Foundation",
    address: "54 Raymond Njoku St, Ikoyi, Lagos",
    lat: 6.452,
    lng: 3.438,
  },
  {
    id: 12,
    name: "Kalakuta Museum",
    address: "7 Gbemisola St, Ikeja, Lagos",
    lat: 6.5815,
    lng: 3.3498,
  },
  {
    id: 13,
    name: "Quintessence Gallery",
    address: "15a Idowu Martins St, Victoria Island, Lagos",
    lat: 6.437,
    lng: 3.4265,
  },
  {
    id: 14,
    name: "Art Cafe",
    address: "24 Hughes Ave, Surulere, Lagos",
    lat: 6.4985,
    lng: 3.3542,
  },
  {
    id: 15,
    name: "Goethe-Institut Lagos",
    address: "12 Idowu Martins St, Victoria Island, Lagos",
    lat: 6.4378,
    lng: 3.426,
  },
];

const MapComponent = ({ region = "All" }) => {
  const getMapConfig = () => {
    if (region === "Island") {
      return { center: [6.448, 3.42], zoom: 13 };
    } else if (region === "Mainland") {
      return { center: [6.54, 3.36], zoom: 13 };
    }
    return { center: [6.5244, 3.3792], zoom: 12 }; // Default Lagos
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

  return (

    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ height: "500px", width: "100%" }}
    >
      <MapController center={center} zoom={zoom} />
      <ZoomControl position="bottomright" />

      {/* Free OpenStreetMap tiles - no API key needed */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render all gallery markers */}
      {filteredGalleries.map((gallery) => (
        <Marker
          key={gallery.id}
          position={[gallery.lat, gallery.lng]}
          icon={customIcon}
        >
          <Popup>
            <div style={{ minWidth: "200px" }}>
              <h3 style={{ margin: "0 0 8px 0", color: "#1a1a2e" }}>
                {gallery.name}
              </h3>
              <p
                style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#555" }}
              >
                {gallery.address}
              </p>
              <hr style={{ margin: "8px 0" }} />
              <small style={{ color: "#888" }}>📍 Click for directions</small>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
