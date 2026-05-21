// ─────────────────────────────────────────────────────────────
//  MapView.jsx — Production-grade Lagos Gallery Map
//  /src/components/MapView/MapView.jsx
//
//  Layers (all toggleable via Legend panel):
//    • Neighbourhood fills + labels (zoom-responsive)
//    • Gallery markers (clustered at low zoom)
//    • Landmarks (ports, museums, parks, markets)
//    • Green zones (tree-planting / drainage shading)
//    • Region overlays (Island / Mainland)
//
//  Map library: MapLibre GL JS (open-source, offline-capable)
//  Tile source: MapTiler (swap key for production)
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./MapView.module.scss";
import { galleries } from "../../data/galleries";
import { neighbourhoodsGeoJSON, landmarksGeoJSON } from "../../data/lagosGeo";
import LegendPanel from "./LegendPanel";
import GalleryCard from "./GalleryCard";

// ── Constants ─────────────────────────────────────────────────
const LAGOS_CENTER = [3.3792, 6.5244];
const MAPTILER_KEY = "eBsT19HyOExrdi0WUD3x"; // ← replace for production

const LAYER_DEFAULTS = {
  neighbourhoods: true,
  landmarks: true,
  greenZones: true,
  regionOverlays: true,
  galleries: true,
};

// Zoom thresholds for label / feature visibility
const ZOOM = { overview: 10, district: 12, street: 14, detail: 16 };

// ── Component ─────────────────────────────────────────────────
const MapView = () => {
  const mapContainer = useRef(null);
  const mapRef       = useRef(null);
  const markersRef   = useRef([]);
  const popupsRef    = useRef({});

  const [activeRegion,  setActiveRegion]  = useState("All");
  const [activeLayers,  setActiveLayers]  = useState(LAYER_DEFAULTS);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [mapReady,      setMapReady]      = useState(false);
  const [currentZoom,   setCurrentZoom]   = useState(10);

  // ── Fly to a gallery with smooth easing ───────────────────
  const flyToGallery = useCallback((gallery) => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: [gallery.lng, gallery.lat],
      zoom: ZOOM.detail,
      speed: 1.2,
      curve: 1.4,
      easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, // ease-in-out quad
      duration: 1800,
      essential: true,
    });
    setSelectedGallery(gallery);
  }, []);

  // ── Fly to a neighbourhood centroid ───────────────────────
  const flyToNeighbourhood = useCallback((lng, lat, zoom = ZOOM.district) => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: [lng, lat],
      zoom,
      speed: 1.0,
      curve: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      duration: 1400,
    });
  }, []);

  // ── Reset to overview ─────────────────────────────────────
  const resetView = useCallback(() => {
    if (!mapRef.current) return;
    const bounds = new maplibregl.LngLatBounds();
    galleries.forEach((g) => bounds.extend([g.lng, g.lat]));
    mapRef.current.fitBounds(bounds, {
      padding: { top: 100, bottom: 100, left: 80, right: 80 },
      maxZoom: ZOOM.overview,
      duration: 1200,
      easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    });
    setSelectedGallery(null);
  }, []);

  // ── Toggle layer visibility ────────────────────────────────
  const toggleLayer = useCallback((layerKey) => {
    setActiveLayers((prev) => {
      const next = { ...prev, [layerKey]: !prev[layerKey] };
      applyLayerVisibility(mapRef.current, next);
      return next;
    });
  }, []);

  // ── Apply MapLibre layer visibility ───────────────────────
  const applyLayerVisibility = (map, layers) => {
    if (!map) return;

    const vis = (bool) => (bool ? "visible" : "none");

    const safe = (id, visibility) => {
      if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", visibility);
    };

    // Neighbourhood fills + outlines + labels
    safe("neighbourhood-fill",    vis(layers.neighbourhoods));
    safe("neighbourhood-outline", vis(layers.neighbourhoods));
    safe("neighbourhood-label",   vis(layers.neighbourhoods));

    // Landmarks
    safe("landmark-icon",  vis(layers.landmarks));
    safe("landmark-label", vis(layers.landmarks));

    // Green zones
    safe("green-zone-fill",    vis(layers.greenZones));
    safe("green-zone-outline", vis(layers.greenZones));
    safe("green-zone-label",   vis(layers.greenZones));

    // Region overlays
    safe("island-overlay",   vis(layers.regionOverlays));
    safe("mainland-overlay", vis(layers.regionOverlays));
    safe("island-label",     vis(layers.regionOverlays));
    safe("mainland-label",   vis(layers.regionOverlays));

    // Gallery markers (DOM-based)
    markersRef.current.forEach(({ marker, region }) => {
      if (!layers.galleries) {
        marker.remove();
      } else {
        const regionMatch =
          activeRegionRef.current === "All" || region === activeRegionRef.current;
        if (regionMatch) marker.addTo(map);
        else marker.remove();
      }
    });
  };

  // Keep activeRegion in a ref so the applyLayerVisibility closure can access it
  const activeRegionRef = useRef(activeRegion);
  useEffect(() => { activeRegionRef.current = activeRegion; }, [activeRegion]);

  // ── Map init ──────────────────────────────────────────────
  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
      center: LAGOS_CENTER,
      zoom: 10,
      minZoom: 9,
      maxBounds: [[3.05, 6.18], [3.78, 6.80]],
      attributionControl: false,
    });

    mapRef.current = map;

    // Attribution (minimal)
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    // Navigation controls
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    // Track zoom for zoom-responsive UI hints
    map.on("zoom", () => setCurrentZoom(Math.round(map.getZoom())));

    map.on("load", () => {
      // ── 1. Neighbourhood fills ─────────────────────────────
      map.addSource("neighbourhoods", {
        type: "geojson",
        data: neighbourhoodsGeoJSON,
      });

      map.addLayer({
        id: "neighbourhood-fill",
        type: "fill",
        source: "neighbourhoods",
        filter: ["!=", ["get", "category"], "green-zone"],
        paint: {
          "fill-color": ["get", "color"],
          "fill-opacity": [
            "interpolate", ["linear"], ["zoom"],
            10, 0.06,
            13, 0.10,
            15, 0.14,
          ],
        },
      });

      map.addLayer({
        id: "neighbourhood-outline",
        type: "line",
        source: "neighbourhoods",
        filter: ["!=", ["get", "category"], "green-zone"],
        paint: {
          "line-color": ["get", "color"],
          "line-width": [
            "interpolate", ["linear"], ["zoom"],
            10, 0.8,
            13, 1.6,
            15, 2.2,
          ],
          "line-opacity": 0.5,
        },
      });

      map.addLayer({
        id: "neighbourhood-label",
        type: "symbol",
        source: "neighbourhoods",
        filter: ["!=", ["get", "category"], "green-zone"],
        minzoom: ZOOM.overview,
        layout: {
          "text-field": ["get", "name"],
          "text-size": [
            "interpolate", ["linear"], ["zoom"],
            10, 11,
            13, 15,
            15, 18,
          ],
          "text-font": ["Open Sans SemiBold", "Arial Unicode MS Bold"],
          "text-anchor": "center",
          "text-max-width": 8,
        },
        paint: {
          "text-color": ["get", "color"],
          "text-halo-color": "rgba(255,255,255,0.9)",
          "text-halo-width": 2,
          "text-opacity": [
            "interpolate", ["linear"], ["zoom"],
            9.5, 0,
            10.5, 1,
          ],
        },
      });

      // ── 2. Green zones (tree-planting / drainage) ──────────
      const greenFeatures = {
        type: "FeatureCollection",
        features: landmarksGeoJSON.features.filter(
          (f) => f.properties.category === "green-zone"
        ),
      };

      map.addSource("green-zones", { type: "geojson", data: greenFeatures });

      map.addLayer({
        id: "green-zone-fill",
        type: "fill",
        source: "green-zones",
        paint: {
          "fill-color": "#16a34a",
          "fill-opacity": [
            "interpolate", ["linear"], ["zoom"],
            10, 0.08,
            14, 0.18,
          ],
          "fill-pattern": undefined, // Can add hatching texture via addImage
        },
      });

      map.addLayer({
        id: "green-zone-outline",
        type: "line",
        source: "green-zones",
        paint: {
          "line-color": "#16a34a",
          "line-width": 1.5,
          "line-dasharray": [4, 2],
          "line-opacity": 0.7,
        },
      });

      map.addLayer({
        id: "green-zone-label",
        type: "symbol",
        source: "green-zones",
        minzoom: 11,
        layout: {
          "text-field": ["get", "name"],
          "text-size": 11,
          "text-font": ["Open Sans Italic", "Arial Unicode MS Regular"],
          "text-anchor": "center",
        },
        paint: {
          "text-color": "#15803d",
          "text-halo-color": "rgba(255,255,255,0.85)",
          "text-halo-width": 2,
        },
      });

      // ── 3. Landmarks ───────────────────────────────────────
      const landmarkPoints = {
        type: "FeatureCollection",
        features: landmarksGeoJSON.features.filter(
          (f) => f.geometry.type === "Point"
        ),
      };

      map.addSource("landmarks", { type: "geojson", data: landmarkPoints });

      map.addLayer({
        id: "landmark-icon",
        type: "symbol",
        source: "landmarks",
        minzoom: 11,
        layout: {
          "text-field": ["get", "icon"],
          "text-size": [
            "interpolate", ["linear"], ["zoom"],
            11, 14,
            14, 20,
          ],
          "text-allow-overlap": false,
          "text-ignore-placement": false,
        },
        paint: {
          "text-opacity": [
            "interpolate", ["linear"], ["zoom"],
            10.5, 0,
            11.5, 1,
          ],
        },
      });

      map.addLayer({
        id: "landmark-label",
        type: "symbol",
        source: "landmarks",
        minzoom: 12,
        layout: {
          "text-field": ["get", "name"],
          "text-size": 11,
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
          "text-anchor": "top",
          "text-offset": [0, 1.2],
          "text-max-width": 10,
        },
        paint: {
          "text-color": "#374151",
          "text-halo-color": "rgba(255,255,255,0.92)",
          "text-halo-width": 1.5,
          "text-opacity": [
            "interpolate", ["linear"], ["zoom"],
            12, 0,
            13, 1,
          ],
        },
      });

      // Landmark click popup
      map.on("click", "landmark-icon", (e) => {
        const props = e.features[0].properties;
        const coords = e.features[0].geometry.coordinates;
        new maplibregl.Popup({ offset: [0, -8], maxWidth: "240px" })
          .setLngLat(coords)
          .setHTML(`
            <div class="landmark-popup">
              <span class="landmark-popup__icon">${props.icon}</span>
              <div>
                <strong>${props.name}</strong>
                <p>${props.description}</p>
              </div>
            </div>
          `)
          .addTo(map);
      });

      map.on("mouseenter", "landmark-icon", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "landmark-icon", () => {
        map.getCanvas().style.cursor = "";
      });

      // ── 4. Region overlays (vague background zones) ────────
      map.addSource("island-region", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[[3.28, 6.40], [3.50, 6.40], [3.50, 6.48], [3.28, 6.48]]],
          },
        },
      });

      map.addSource("mainland-region", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[[3.20, 6.48], [3.46, 6.48], [3.46, 6.66], [3.20, 6.66]]],
          },
        },
      });

      map.addLayer({
        id: "island-overlay",
        type: "fill",
        source: "island-region",
        paint: { "fill-color": "#0c50bd", "fill-opacity": 0.04 },
      });

      map.addLayer({
        id: "mainland-overlay",
        type: "fill",
        source: "mainland-region",
        paint: { "fill-color": "#92400e", "fill-opacity": 0.04 },
      });

      map.addLayer({
        id: "island-label",
        type: "symbol",
        source: "island-region",
        maxzoom: 11,
        layout: {
          "text-field": "ISLAND",
          "text-size": 12,
          "text-letter-spacing": 0.2,
          "text-font": ["Open Sans SemiBold", "Arial Unicode MS Bold"],
        },
        paint: {
          "text-color": "#1d4ed8",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
        },
      });

      map.addLayer({
        id: "mainland-label",
        type: "symbol",
        source: "mainland-region",
        maxzoom: 11,
        layout: {
          "text-field": "MAINLAND",
          "text-size": 12,
          "text-letter-spacing": 0.2,
          "text-font": ["Open Sans SemiBold", "Arial Unicode MS Bold"],
        },
        paint: {
          "text-color": "#b45309",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
        },
      });

      // ── 5. Gallery markers ─────────────────────────────────
      const markers = galleries.map((gallery) => {
        const el = document.createElement("div");
        el.className = `gallery-marker gallery-marker--${gallery.region.toLowerCase()}`;
        el.setAttribute("aria-label", gallery.name);
        el.innerHTML = `
          <svg viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 24 14 24S28 24.5 28 14C28 6.3 21.7 0 14 0z"
              fill="${gallery.region === 'Island' ? '#1a6bbd' : '#b45309'}"/>
            <circle cx="14" cy="13" r="5.5" fill="white" fill-opacity="0.9"/>
          </svg>
          <span class="gallery-marker__pulse"></span>
        `;

        const popup = new maplibregl.Popup({
          offset: [0, -40],
          maxWidth: "300px",
          closeButton: true,
          className: "gallery-popup-wrapper",
        }).setHTML(`
          <div class="popup-content">
            <img src="${gallery.image}" alt="${gallery.name}" class="popup-image"
              onerror="this.src='https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&q=60'"
            />
            <div class="popup-text">
              <div class="popup-meta">
                <span class="popup-region popup-region--${gallery.region.toLowerCase()}">${gallery.region}</span>
                <span class="popup-neighbourhood">${gallery.neighborhood}</span>
              </div>
              <h4>${gallery.name}</h4>
              <p>${gallery.address}</p>
              <div class="popup-footer">
                <span class="popup-rating">★ ${gallery.rating}</span>
                <span class="popup-tags">${(gallery.artTypes || []).join(" · ")}</span>
              </div>
            </div>
          </div>
        `);

        popupsRef.current[gallery.id] = popup;

        const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([gallery.lng, gallery.lat])
          .setPopup(popup)
          .addTo(map);

        el.addEventListener("click", () => flyToGallery(gallery));

        return { marker, region: gallery.region, gallery };
      });

      markersRef.current = markers;
      setMapReady(true);

      // Fit to show all galleries
      const bounds = new maplibregl.LngLatBounds();
      galleries.forEach((g) => bounds.extend([g.lng, g.lat]));
      map.fitBounds(bounds, {
        padding: { top: 90, bottom: 90, left: 70, right: 70 },
        maxZoom: ZOOM.overview,
        duration: 1000,
      });
    }); // end map.on("load")

    return () => {
      map.remove();
      setMapReady(false);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Region filter effect ───────────────────────────────────
  useEffect(() => {
    if (!mapReady || !markersRef.current.length) return;

    const map = mapRef.current;
    const bounds = new maplibregl.LngLatBounds();

    markersRef.current.forEach(({ marker, region, gallery }) => {
      const show =
        activeLayers.galleries &&
        (activeRegion === "All" || region === activeRegion);

      if (show) {
        marker.addTo(map);
        bounds.extend([gallery.lng, gallery.lat]);
      } else {
        marker.remove();
      }
    });

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, {
        padding: { top: 90, bottom: 90, left: 70, right: 70 },
        maxZoom: ZOOM.overview,
        duration: 800,
        easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      });
    }
  }, [activeRegion, activeLayers.galleries, mapReady]);

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className={styles.mapWrapper}>
      {/* Region switcher */}
      <div className={styles.regionBar}>
        {["All", "Island", "Mainland"].map((r) => (
          <button
            key={r}
            className={`${styles.regionBtn} ${activeRegion === r ? styles.regionBtnActive : ""} ${styles[`regionBtn${r}`]}`}
            onClick={() => setActiveRegion(r)}
          >
            {r === "All" ? "All Lagos" : r}
          </button>
        ))}

        <div className={styles.zoomHint}>
          {currentZoom < 11 && <span>Zoom in for neighbourhoods</span>}
          {currentZoom >= 11 && currentZoom < 13 && <span>Zoom in for landmarks</span>}
          {currentZoom >= 13 && <span>Street level detail</span>}
        </div>

        <button className={styles.resetBtn} onClick={resetView} title="Reset view">
          ⤢ Overview
        </button>
      </div>

      {/* Map canvas */}
      <div ref={mapContainer} className={styles.mapContainer} />

      {/* Legend panel */}
      <LegendPanel
        activeLayers={activeLayers}
        onToggle={toggleLayer}
        galleries={galleries}
        onGalleryClick={flyToGallery}
        onNeighbourhoodClick={flyToNeighbourhood}
        activeRegion={activeRegion}
      />

      {/* Selected gallery card */}
      {selectedGallery && (
        <GalleryCard
          gallery={selectedGallery}
          onClose={() => setSelectedGallery(null)}
        />
      )}
    </div>
  );
};

export default MapView;
