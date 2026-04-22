import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./MapView.scss";

const MapView = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [3.3792, 6.5244], // Lagos [lng, lat]
      zoom: 11,
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="map-container" />;
};

export default MapView;
