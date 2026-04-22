import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./MapView.scss";
import { galleries } from "../../data/galleries";
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
      style: "https://demotiles.maplibre.org/style.json",
      center: [3.3792, 6.5244],
      zoom: 11,
    });

    mapRef.current = map;

    // Create markers and store them
    const markers = galleries.map((gallery) => {
      const marker = new maplibregl.Marker()
        .setLngLat([gallery.lng, gallery.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            `<h4>${gallery.name}</h4><p>${gallery.address}</p>`,
          ),
        )
        .addTo(map);

      return { marker, region: gallery.region };
    });

    markersRef.current = markers;

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
