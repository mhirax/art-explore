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
      minZoom: 9,
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

    // ===== NEW: Region color zoning overlays =====
    map.on("load", () => {
      // Island region (Lekki, VI, Ikoyi) - Cool blue tint
      map.addSource("island-region", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.3, 6.4], // Southwest
                [3.55, 6.4], // Southeast
                [3.55, 6.52], // Northeast (covers Lekki)
                [3.3, 6.52], // Northwest
              ],
            ],
          },
        },
      });

      map.addLayer({
        id: "island-overlay",
        type: "fill",
        source: "island-region",
        paint: {
          "fill-color": "#3b82f6", // Cool blue
          "fill-opacity": 0.08,
        },
      });

      // Mainland region (Ikeja, Yaba, Surulere) - Warm earth tint
      map.addSource("mainland-region", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.2, 6.45], // Southwest
                [3.45, 6.45], // Southeast
                [3.45, 6.65], // Northeast (covers Ikeja)
                [3.2, 6.65], // Northwest
              ],
            ],
          },
        },
      });

      map.addLayer({
        id: "mainland-overlay",
        type: "fill",
        source: "mainland-region",
        paint: {
          "fill-color": "#f59e0b", // Warm amber
          "fill-opacity": 0.08,
        },
      });
    });

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
