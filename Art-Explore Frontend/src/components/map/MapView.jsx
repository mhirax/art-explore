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

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/base-v4/style.json?key=eBsT19HyOExrdi0WUD3x",
      center: [3.3792, 6.5244],
      zoom: 7,
      maxBounds: [
        [3.15, 6.3],
        [3.7, 6.7],
      ],
      minZoom: 8.5,
    });

    mapRef.current = map;

    // Plain red pin marker element
    const markerElement = document.createElement("div");
    markerElement.className = "gallery-marker";
    markerElement.innerHTML = `
      <svg viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="#e63946"/>
        <circle cx="12" cy="11" r="4.5" fill="white"/>
      </svg>
    `;

    // Create all markers
    const markers = galleries.map((gallery) => {
      const marker = new maplibregl.Marker({
        element: markerElement.cloneNode(true),
        anchor: "bottom",
      })
        .setLngLat([gallery.lng, gallery.lat])
        .setPopup(
          new maplibregl.Popup({
            offset: [0, -35],
            maxWidth: "280px",
            closeButton: true,
          }).setHTML(`
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

    // Calculate bounds from all galleries
    const bounds = new maplibregl.LngLatBounds();
    galleries.forEach((gallery) => bounds.extend([gallery.lng, gallery.lat]));

    // Calculate center of all markers
    const centerLng = (bounds.getWest() + bounds.getEast()) / 2;
    const centerLat = (bounds.getSouth() + bounds.getNorth()) / 2;

    // Fit map to show all markers
    map.fitBounds(bounds, {
      padding: {
        top: 80,
        bottom: 80,
        left: 60,
        right: 60,
      },
      maxZoom: 10,
      duration: 1000,
    });


    // Region color zoning
    map.on("load", () => {
      // Island zone
      map.addSource("island-region", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.3, 6.4],
                [3.55, 6.4],
                [3.55, 6.52],
                [3.3, 6.52],
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
          "fill-color": "#0c50bd",
          "fill-opacity": 0.06,
        },
      });

      // Mainland zone
      map.addSource("mainland-region", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.2, 6.45],
                [3.45, 6.45],
                [3.45, 6.65],
                [3.2, 6.65],
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
          "fill-color": "#654918",
          "fill-opacity": 0.06,
        },
      });

      // Region labels
      map.addLayer({
        id: "island-label",
        type: "symbol",
        source: "island-region",
        layout: {
          "text-field": "Island",
          "text-size": 13,
          "text-anchor": "center",
        },
        paint: {
          "text-color": "#2e5aa1",
          "text-halo-color": "white",
          "text-halo-width": 2,
        },
      });

      map.addLayer({
        id: "mainland-label",
        type: "symbol",
        source: "mainland-region",
        layout: {
          "text-field": "Mainland",
          "text-size": 13,
          "text-anchor": "center",
        },
        paint: {
          "text-color": "#f59e0b",
          "text-halo-color": "white",
          "text-halo-width": 2,
        },
      });
    });

    return () => map.remove();
  }, []);

  // ===== UPDATED: Filter markers AND re-center map on filter change =====
  useEffect(() => {
    if (!markersRef.current.length) return;

    // Show/hide markers based on region
    markersRef.current.forEach(({ marker, region }) => {
      if (activeRegion === "All" || region === activeRegion) {
        marker.addTo(mapRef.current);
      } else {
        marker.remove();
      }
    });

    // Get only visible markers
    const visibleMarkers = markersRef.current.filter(
      ({ region }) => activeRegion === "All" || region === activeRegion,
    );

    // Re-center map on visible markers
    if (visibleMarkers.length > 0) {
      const newBounds = new maplibregl.LngLatBounds();
      visibleMarkers.forEach(({ marker }) => {
        newBounds.extend(marker.getLngLat());
      });

      const centerLng = (newBounds.getWest() + newBounds.getEast()) / 2;
      const centerLat = (newBounds.getSouth() + newBounds.getNorth()) / 2;

      mapRef.current.fitBounds(newBounds, {
        padding: {
          top: 80,
          bottom: 80,
          left: 60,
          right: 60,
        },
        maxZoom: 10,
        duration: 800,
      });
    }
  }, [activeRegion]);

  return (
    <div className="map-wrapper">
      <FilterBar activeRegion={activeRegion} onFilterChange={setActiveRegion} />
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default MapView;