import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { galleries } from '../../data/MapViewData';
import "./MapView.scss";

const MapView = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [3.3792, 6.5244],
      zoom: 11,
    });

    // render markers dynamically from galleries data
    galleries.forEach((gallery) => {
      new maplibregl.Marker()
        .setLngLat([gallery.lng, gallery.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            `<h4>${gallery.name}</h4><p>${gallery.address}</p>`,
          ),
        )
        .addTo(map);
    });

    return () => map.remove();
  }, []);
};

export default MapView;
