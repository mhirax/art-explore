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
     center: [3.3792, 6.5244],
     zoom: 11,
   });

   // 👇 REPLACED THIS SECTION
   new maplibregl.Marker()
     .setLngLat([3.4479, 6.4563])
     .setPopup(
       new maplibregl.Popup({ offset: 25 }).setHTML(
         "<h4>Nike Art Gallery</h4><p>2 Elegushi Rd, Lekki Phase I, Lagos</p>",
       ),
     )
     .addTo(map);

   return () => map.remove();
 }, []);

  return <div ref={mapContainer} className="map-container" />;
};

export default MapView;
