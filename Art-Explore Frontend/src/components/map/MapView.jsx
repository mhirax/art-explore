import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./MapView.module.scss";
import { galleries } from "../../data/galleries";
import { neighbourhoodsGeoJSON, landmarksGeoJSON } from "../../data/lagosGeo";
import LegendPanel from "./LegendPanel";
import GalleryCard from "./GalleryCard";

const MAPTILER_KEY = "eBsT19HyOExrdi0WUD3x";

const ALL_BOUNDS = [
  [3.343, 6.435],
  [3.458, 6.575],
];

const ALL_GALLERIES_CENTER = [3.4004, 6.5083];

const LAYER_DEFAULTS = {
  neighbourhoods: true,
  landmarks: true,
  greenZones: true,
  regionOverlays: true,
  galleries: true,
};

const ZOOM = { overview: 11, district: 12, street: 14, detail: 16 };

const FIT_PADDING = { top: 100, bottom: 60, left: 60, right: 280 };

// ── create GeoJSON from galleries array ────────────────────────
const buildGalleriesGeoJSON = (galleryList) => ({
  type: "FeatureCollection",
  features: galleryList.map((g) => ({
    type: "Feature",
    properties: {
      id: g.id,
      name: g.name,
      neighborhood: g.neighborhood,
      address: g.address,
      region: g.region,
      rating: g.rating,
      image: g.image,
      artTypes: JSON.stringify(g.artTypes || []),
    },
    geometry: { type: "Point", coordinates: [g.lng, g.lat] },
  })),
});

// ── SVG pin → base64 data URL for map.addImage()
const createPinImage = () =>
  new Promise((resolve) => {
    const svg = `
      <svg viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="38">
        <path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 24 14 24S28 24.5 28 14C28 6.3 21.7 0 14 0z" fill="#e63946"/>
        <circle cx="14" cy="13" r="5.5" fill="white" fill-opacity="0.92"/>
      </svg>`;
    const img = new Image(28, 38);
    img.onload = () => resolve(img);
    img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
  });

// Helper function to get center of first few galleries for mobile
const getMobileBounds = (galleriesList, count = 3) => {
  const bounds = new maplibregl.LngLatBounds();
  const galleriesToShow = galleriesList.slice(0, count);
  galleriesToShow.forEach((g) => bounds.extend([g.lng, g.lat]));
  return bounds;
};

// ── Component ─────────────────────────────────────────────────
const MapView = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const [activeRegion, setActiveRegion] = useState("All");
  const [activeLayers, setActiveLayers] = useState(LAYER_DEFAULTS);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(10);

  const activeRegionRef = useRef("All");
  useEffect(() => {
    activeRegionRef.current = activeRegion;
  }, [activeRegion]);

  // ── Fly to a gallery ─────────────────────────────────────
  const flyToGallery = useCallback((gallery) => {
    if (!mapRef.current) return;
    const isMobile = window.innerWidth <= 768;
    mapRef.current.flyTo({
      center: [gallery.lng, gallery.lat],
      zoom: isMobile ? 18 : ZOOM.detail, // Even closer zoom on mobile
      speed: 1.2,
      curve: 1.4,
      easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
      duration: 1800,
      essential: true,
    });
    setSelectedGallery(gallery);
  }, []);

  // ── Fly to a neighbourhood ────────────────────────────────
  const flyToNeighbourhood = useCallback((lng, lat, zoom = ZOOM.district) => {
    if (!mapRef.current) return;
    const isMobile = window.innerWidth <= 768;
    mapRef.current.flyTo({
      center: [lng, lat],
      zoom: isMobile ? 16 : zoom,
      speed: 1.0,
      curve: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      duration: 1400,
    });
  }, []);

  // ── Reset to overview ─────────────────────────────────────
  const resetView = useCallback(() => {
    if (!mapRef.current) return;
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // On mobile, zoom in extremely close to first 3 galleries
      const bounds = getMobileBounds(galleries, 3);
      mapRef.current.fitBounds(bounds, {
        padding: { top: 20, bottom: 20, left: 20, right: 20 },
        duration: 800,
        maxZoom: 18,
        minZoom: 16,
      });
    } else {
      mapRef.current.fitBounds(ALL_BOUNDS, {
        padding: FIT_PADDING,
        duration: 1000,
      });
    }
    setSelectedGallery(null);
  }, [galleries]);

  // ── Apply layer visibility ────────────────────────────────
  const applyLayerVisibility = useCallback((layers) => {
    const map = mapRef.current;
    if (!map) return;
    const vis = (b) => (b ? "visible" : "none");
    const safe = (id, v) => {
      if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", v);
    };

    safe("neighbourhood-fill", vis(layers.neighbourhoods));
    safe("neighbourhood-outline", vis(layers.neighbourhoods));
    safe("neighbourhood-label", vis(layers.neighbourhoods));
    safe("landmark-icon", vis(layers.landmarks));
    safe("landmark-label", vis(layers.landmarks));
    safe("green-zone-fill", vis(layers.greenZones));
    safe("green-zone-outline", vis(layers.greenZones));
    safe("green-zone-label", vis(layers.greenZones));
    safe("island-overlay", vis(layers.regionOverlays));
    safe("mainland-overlay", vis(layers.regionOverlays));
    safe("island-label", vis(layers.regionOverlays));
    safe("mainland-label", vis(layers.regionOverlays));
    safe("gallery-pins", vis(layers.galleries));
    safe("gallery-labels", vis(layers.galleries));
  }, []);

  const toggleLayer = useCallback(
    (layerKey) => {
      setActiveLayers((prev) => {
        const next = { ...prev, [layerKey]: !prev[layerKey] };
        applyLayerVisibility(next);
        return next;
      });
    },
    [applyLayerVisibility],
  );

  // ── Update gallery filter (region button) ────────────────
  const updateGalleryFilter = useCallback(
    (region) => {
      const map = mapRef.current;
      if (!map || !mapReady || !map.getSource("galleries")) return;
      
      const filtered =
        region === "All"
          ? galleries
          : galleries.filter((g) => g.region === region);
      
      map.getSource("galleries").setData(buildGalleriesGeoJSON(filtered));

      // Fit bounds based on device and region
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // ALWAYS zoom in extremely close on mobile regardless of region
        // Show only first 3 galleries from filtered results
        const galleriesToShow = filtered.slice(0, 3);
        const bounds = new maplibregl.LngLatBounds();
        galleriesToShow.forEach((g) => bounds.extend([g.lng, g.lat]));
        
        map.fitBounds(bounds, {
          padding: { top: 20, bottom: 20, left: 20, right: 20 },
          duration: 800,
          maxZoom: 18,
          minZoom: 16,
        });
      } else {
        // Desktop behavior
        if (region === "All") {
          map.fitBounds(ALL_BOUNDS, { padding: FIT_PADDING, duration: 800 });
        } else {
          const bounds = new maplibregl.LngLatBounds();
          filtered.forEach((g) => bounds.extend([g.lng, g.lat]));
          map.fitBounds(bounds, {
            padding: FIT_PADDING,
            maxZoom: 13,
            duration: 800,
          });
        }
      }
    },
    [galleries, mapReady],
  );
  
  // ── Map initialisation ────────────────────────────────────
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
      // On mobile, center on first gallery for extreme zoom
      center: isMobile ? [galleries[0].lng, galleries[0].lat] : ALL_GALLERIES_CENTER,
      zoom: isMobile ? 17 : 10, // Extreme zoom on mobile (street level)
      minZoom: isMobile ? 15 : 9, // Can't zoom out too far on mobile
      maxZoom: isMobile ? 19 : 18, // Can zoom in even closer
      maxBounds: isMobile ? null : [ // No bounds on mobile for full flexibility
        [2.9, 6.1],
        [3.9, 6.9],
      ],
      attributionControl: false,
    });

    mapRef.current = map;

    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right",
    );
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right",
    );
    map.on("zoom", () => setCurrentZoom(Math.round(map.getZoom())));

    map.on("load", async () => {
      // ── Load pin image into MapLibre sprite atlas ────────
      const pinImg = await createPinImage();
      map.addImage("gallery-pin", pinImg, { pixelRatio: 2 });

      // ── 1. Neighbourhood fills ───────────────────────────
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
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            0.06,
            13,
            0.1,
            15,
            0.14,
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
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            0.8,
            13,
            1.6,
            15,
            2.2,
          ],
          "line-opacity": 0.5,
        },
      });
      map.addLayer({
        id: "neighbourhood-label",
        type: "symbol",
        source: "neighbourhoods",
        filter: ["!=", ["get", "category"], "green-zone"],
        minzoom: isMobile ? 14 : ZOOM.overview, // Labels appear later on mobile to avoid clutter
        layout: {
          "text-field": ["get", "name"],
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            isMobile ? 10 : 11,
            13,
            isMobile ? 12 : 15,
            15,
            isMobile ? 14 : 18,
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
            "interpolate",
            ["linear"],
            ["zoom"],
            9.5,
            0,
            10.5,
            1,
          ],
        },
      });

      // ── 2. Green zones ───────────────────────────────────
      const greenFeatures = {
        type: "FeatureCollection",
        features: landmarksGeoJSON.features.filter(
          (f) => f.properties.category === "green-zone",
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
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            0.08,
            14,
            0.18,
          ],
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
        minzoom: isMobile ? 14 : 11,
        layout: {
          "text-field": ["get", "name"],
          "text-size": isMobile ? 11 : 11,
          "text-font": ["Open Sans Italic", "Arial Unicode MS Regular"],
          "text-anchor": "center",
        },
        paint: {
          "text-color": "#15803d",
          "text-halo-color": "rgba(255,255,255,0.85)",
          "text-halo-width": 2,
        },
      });

      // ── 3. Landmarks ─────────────────────────────────────
      const landmarkPoints = {
        type: "FeatureCollection",
        features: landmarksGeoJSON.features.filter(
          (f) => f.geometry.type === "Point",
        ),
      };
      map.addSource("landmarks", { type: "geojson", data: landmarkPoints });
      map.addLayer({
        id: "landmark-icon",
        type: "symbol",
        source: "landmarks",
        minzoom: isMobile ? 14 : 11,
        layout: {
          "text-field": ["get", "icon"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 11, isMobile ? 20 : 14, 14, isMobile ? 26 : 20],
          "text-allow-overlap": false,
        },
        paint: {
          "text-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10.5,
            0,
            11.5,
            1,
          ],
        },
      });
      map.addLayer({
        id: "landmark-label",
        type: "symbol",
        source: "landmarks",
        minzoom: isMobile ? 15 : 12,
        layout: {
          "text-field": ["get", "name"],
          "text-size": isMobile ? 12 : 11,
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
          "text-anchor": "top",
          "text-offset": [0, 1.2],
          "text-max-width": 10,
        },
        paint: {
          "text-color": "#374151",
          "text-halo-color": "rgba(255,255,255,0.92)",
          "text-halo-width": 1.5,
          "text-opacity": ["interpolate", ["linear"], ["zoom"], 12, 0, 13, 1],
        },
      });
      map.on("click", "landmark-icon", (e) => {
        const p = e.features[0].properties;
        new maplibregl.Popup({ offset: [0, -8], maxWidth: "240px" })
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML(
            `<div class="landmark-popup"><span class="landmark-popup__icon">${p.icon}</span><div><strong>${p.name}</strong><p>${p.description}</p></div></div>`,
          )
          .addTo(map);
      });
      map.on("mouseenter", "landmark-icon", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "landmark-icon", () => {
        map.getCanvas().style.cursor = "";
      });

      // ── 4. Region overlays ───────────────────────────────
      map.addSource("island-region", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.28, 6.4],
                [3.5, 6.4],
                [3.5, 6.48],
                [3.28, 6.48],
              ],
            ],
          },
        },
      });
      map.addSource("mainland-region", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [3.2, 6.48],
                [3.46, 6.48],
                [3.46, 6.66],
                [3.2, 6.66],
              ],
            ],
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
          "text-size": isMobile ? 10 : 12,
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
          "text-size": isMobile ? 10 : 12,
          "text-letter-spacing": 0.2,
          "text-font": ["Open Sans SemiBold", "Arial Unicode MS Bold"],
        },
        paint: {
          "text-color": "#b45309",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
        },
      });

      // ── 5. Gallery pins — GeoJSON symbol layer ───────────
      map.addSource("galleries", {
        type: "geojson",
        data: buildGalleriesGeoJSON(galleries),
      });

      // Pin icon layer - EXTREMELY LARGE on mobile
      map.addLayer({
        id: "gallery-pins",
        type: "symbol",
        source: "galleries",
        layout: {
          "icon-image": "gallery-pin",
          "icon-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            isMobile ? 2.8 : 1.2, // Huge pins on mobile
            14,
            isMobile ? 3.5 : 1.8,
            15,
            isMobile ? 4.0 : 2.2,
          ],
          "icon-anchor": "bottom",
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
          "text-field": "",
        },
        paint: {
          "icon-opacity": ["interpolate", ["linear"], ["zoom"], 8.5, 0, 9.5, 1],
        },
      });

      // Gallery name label — appears early on mobile
      map.addLayer({
        id: "gallery-labels",
        type: "symbol",
        source: "galleries",
        minzoom: isMobile ? 11 : 13, // Labels appear early on mobile
        layout: {
          "text-field": ["get", "name"],
          "text-size": isMobile ? 16 : 11, // Much larger text on mobile
          "text-font": ["Open Sans SemiBold", "Arial Unicode MS Bold"],
          "text-anchor": "top",
          "text-offset": [0, 1.0],
          "text-max-width": 10,
          "text-allow-overlap": false,
        },
        paint: {
          "text-color": "#1a1a2e",
          "text-halo-color": "rgba(255,255,255,0.95)",
          "text-halo-width": 3,
          "text-opacity": ["interpolate", ["linear"], ["zoom"], 11, 0, 12, 1],
        },
      });

      // ── Click on a gallery pin → open card ───────────────
      map.on("click", "gallery-pins", (e) => {
        const props = e.features[0].properties;
        const gallery = galleries.find((g) => g.id === props.id);
        if (gallery) {
          flyToGallery(gallery);
          new maplibregl.Popup({
            offset: [0, -60],
            maxWidth: isMobile ? "90vw" : "300px",
            closeButton: true,
            className: "gallery-popup-wrapper",
          })
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(
              `
            <div class="popup-content">
              <img src="${gallery.image}" alt="${gallery.name}" class="popup-image"
                onerror="this.src='https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&q=60'"/>
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
          `,
            )
            .addTo(map);
        }
      });

      map.on("mouseenter", "gallery-pins", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "gallery-pins", () => {
        map.getCanvas().style.cursor = "";
      });

      setMapReady(true);

      // ── Fit to show only 2-3 markers on mobile ───────────
      map.once("idle", () => {
        if (isMobile) {
          const firstThreeGalleries = galleries.slice(0, 3);
          const bounds = new maplibregl.LngLatBounds();
          firstThreeGalleries.forEach((g) => bounds.extend([g.lng, g.lat]));
          map.fitBounds(bounds, {
            padding: { top: 20, bottom: 20, left: 20, right: 20 },
            duration: 800,
            maxZoom: 18,
            minZoom: 16,
          });
        } else {
          map.fitBounds(ALL_BOUNDS, { padding: FIT_PADDING, duration: 800 });
        }
      });
    });

    return () => {
      map.remove();
      setMapReady(false);
    };
  }, [galleries]);

  // ── Window resize handler for orientation change ────────────
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;

    const handleResize = () => {
      const map = mapRef.current;
      if (!map) return;

      map.resize();

      const isMobile = window.innerWidth <= 768;
      const currentZoom = map.getZoom();
      
      if (isMobile && currentZoom < 15) {
        // If on mobile and zoomed out too far, zoom in extremely close
        const firstThreeGalleries = galleries.slice(0, 3);
        const bounds = new maplibregl.LngLatBounds();
        firstThreeGalleries.forEach((g) => bounds.extend([g.lng, g.lat]));
        map.fitBounds(bounds, {
          padding: { top: 20, bottom: 20, left: 20, right: 20 },
          duration: 300,
          maxZoom: 18,
          minZoom: 16,
        });
      } else if (!isMobile) {
        const currentBounds = map.getBounds();
        if (
          currentBounds.getWest() <= ALL_BOUNDS[0][0] + 0.01 &&
          currentBounds.getEast() >= ALL_BOUNDS[1][0] - 0.01
        ) {
          map.fitBounds(ALL_BOUNDS, { padding: FIT_PADDING, duration: 300 });
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mapReady, galleries]);

  // ── Region filter effect ──────────────────────────────────
  useEffect(() => {
    if (!mapReady) return;
    updateGalleryFilter(activeRegion);
    applyLayerVisibility({ ...activeLayers });
  }, [activeRegion, mapReady, updateGalleryFilter, applyLayerVisibility]);

  // ── Galleries toggle effect ───────────────────────────────
  useEffect(() => {
    if (!mapReady) return;
    applyLayerVisibility(activeLayers);
  }, [activeLayers, mapReady, applyLayerVisibility]);

  // ── Render ────────────────────────────────────────────────
  return (
    <div className={styles.mapWrapper}>
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

        <button
          className={styles.resetBtn}
          onClick={resetView}
          title="Reset view"
        >
          ⤢ Overview
        </button>
      </div>

      <div ref={mapContainer} className={styles.mapContainer} />

      <LegendPanel
        activeLayers={activeLayers}
        onToggle={toggleLayer}
        galleries={galleries}
        onGalleryClick={flyToGallery}
        onNeighbourhoodClick={flyToNeighbourhood}
        activeRegion={activeRegion}
      />

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