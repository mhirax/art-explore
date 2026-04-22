import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./MapView.scss";
import { galleries } from "../../data/MapViewData";
import FilterBar from "./FilterBar";

const MapView = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [activeRegion, setActiveRegion] = useState("All");

  // Initialize map
  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [3.3792, 6.5244],
      zoom: 12,
      // ===== NEW: Lock viewport to Lagos gallery zone =====
      maxBounds: [
        [3.2, 6.35], // Southwest corner [lng, lat]
        [3.65, 6.65], // Northeast corner [lng, lat]
      ],
    });

    mapRef.current = map;

    // ===== NEW: Create custom marker element =====
    const markerElement = document.createElement("div");
    markerElement.className = "gallery-marker";
    markerElement.innerHTML = `🌴`;

    // Create markers and store them
    const markers = galleries.map((gallery) => {
      // ===== CHANGED: Use custom element with cloneNode =====
      const marker = new maplibregl.Marker({
        element: markerElement.cloneNode(true),
      })
        .setLngLat([gallery.lng, gallery.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25, maxWidth: "280px" }).setHTML(`
    <div class="popup-content">
      <img src="${gallery.image}" alt="${gallery.name}" class="popup-image" />
      <div class="popup-text">
        <h4>${gallery.name}</h4>
        <p>${gallery.address}</p>
      </div>
    </div>
  `),
        )

        .addTo(map);

      return { marker, region: gallery.region };
    });
    markersRef.current = markers;

    //CALL BOUND TO MAKE ALL MARKER VISIBLE AT FIRST GLANCE
    const bounds = new maplibregl.LngLatBounds();
    galleries.forEach((gallery) => bounds.extend([gallery.lng, gallery.lat]));
    map.fitBounds(bounds, { padding: 60, duration: 1000 });

    return () => map.remove();
  }, []);

  // Handle filter changes
  useEffect(() => {
    if (!markersRef.current.length) return;

    markersRef.current.forEach(({ marker, region }) => {
      if (activeRegion === "All" || region === activeRegion) {
        marker.addTo(mapRef.current);
      } else {
        marker.remove();
      }
    });
  }, [activeRegion]);

  return (
    <div className="map-wrapper">
      <FilterBar activeRegion={activeRegion} onFilterChange={setActiveRegion} />
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default MapView;