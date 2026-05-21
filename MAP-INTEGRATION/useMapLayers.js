// ─────────────────────────────────────────────────────────────
//  useMapLayers.js — Performance hook: clustering + tile cache
//  /src/hooks/useMapLayers.js
//
//  Usage:
//    const { addClusteredGalleries, preloadTiles } = useMapLayers(mapRef);
// ─────────────────────────────────────────────────────────────

import { useCallback } from "react";

/**
 * Adds a clustered GeoJSON source for galleries.
 * At low zoom: shows cluster circle + count.
 * At high zoom: shows individual gallery markers.
 *
 * Use this instead of individual DOM markers when you have 50+ galleries.
 */
export const addClusteredGalleries = (map, galleries) => {
  const geojson = {
    type: "FeatureCollection",
    features: galleries.map((g) => ({
      type: "Feature",
      properties: {
        id:           g.id,
        name:         g.name,
        neighborhood: g.neighborhood,
        region:       g.region,
        rating:       g.rating,
      },
      geometry: { type: "Point", coordinates: [g.lng, g.lat] },
    })),
  };

  // Source with clustering enabled
  map.addSource("galleries-clustered", {
    type:            "geojson",
    data:            geojson,
    cluster:         true,
    clusterMaxZoom:  13,   // stop clustering above zoom 13
    clusterRadius:   48,   // cluster radius in pixels
  });

  // Cluster circle
  map.addLayer({
    id:     "clusters",
    type:   "circle",
    source: "galleries-clustered",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step", ["get", "point_count"],
        "#1a6bbd", 5,   // < 5 items  → blue
        "#0e4f96", 10,  // < 10 items → darker blue
        "#0a3569",      // ≥ 10 items → darkest
      ],
      "circle-radius": [
        "step", ["get", "point_count"],
        18, 5,
        22, 10,
        28,
      ],
      "circle-stroke-color": "white",
      "circle-stroke-width": 2,
    },
  });

  // Cluster count label
  map.addLayer({
    id:     "cluster-count",
    type:   "symbol",
    source: "galleries-clustered",
    filter: ["has", "point_count"],
    layout: {
      "text-field":      ["get", "point_count_abbreviated"],
      "text-size":       13,
      "text-font":       ["Open Sans Bold", "Arial Unicode MS Bold"],
      "text-allow-overlap": true,
    },
    paint: { "text-color": "white" },
  });

  // Individual (unclustered) point
  map.addLayer({
    id:     "unclustered-point",
    type:   "circle",
    source: "galleries-clustered",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": [
        "match", ["get", "region"],
        "Island",   "#1a6bbd",
        "Mainland", "#b45309",
        "#888",
      ],
      "circle-radius":       8,
      "circle-stroke-width": 2,
      "circle-stroke-color": "white",
    },
  });

  // Click cluster → zoom in
  map.on("click", "clusters", (e) => {
    const features = map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
    const clusterId = features[0].properties.cluster_id;
    map.getSource("galleries-clustered").getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) return;
      map.flyTo({ center: features[0].geometry.coordinates, zoom });
    });
  });

  map.on("mouseenter", "clusters",          () => { map.getCanvas().style.cursor = "pointer"; });
  map.on("mouseleave", "clusters",          () => { map.getCanvas().style.cursor = ""; });
  map.on("mouseenter", "unclustered-point", () => { map.getCanvas().style.cursor = "pointer"; });
  map.on("mouseleave", "unclustered-point", () => { map.getCanvas().style.cursor = ""; });

  return () => {
    ["unclustered-point", "cluster-count", "clusters"].forEach((id) => {
      if (map.getLayer(id)) map.removeLayer(id);
    });
    if (map.getSource("galleries-clustered")) map.removeSource("galleries-clustered");
  };
};

/**
 * Preloads tile cache for a set of bounds at target zoom levels.
 * Call this after map load to warm up the cache for Lagos areas.
 *
 * Note: MapLibre handles tile caching via browser Cache API automatically.
 * This helper nudges the renderer to prefetch tiles at specific zooms.
 */
export const preloadTiles = (map, bounds, zooms = [10, 12, 14]) => {
  zooms.forEach((zoom) => {
    // MapLibre doesn't have an explicit prefetch API, but fitting bounds
    // at each zoom level triggers tile requests which the browser caches.
    // We use a very short duration so it's nearly invisible.
    setTimeout(() => {
      map.fitBounds(bounds, { duration: 100, maxZoom: zoom, padding: 0 });
    }, zoom * 100); // stagger by zoom level to avoid request flooding
  });
};

/**
 * Performance tips (comments for your team):
 *
 * 1. TILE CACHING
 *    MapLibre GL JS uses browser Cache API automatically for raster/vector tiles.
 *    For offline support, use maplibre-gl-offline-manager or cache via a
 *    service worker that intercepts tile requests.
 *
 * 2. CLUSTERING
 *    Use addClusteredGalleries() instead of DOM markers when gallery count > 30.
 *    DOM markers (HTMLElement) each have their own event listeners and reflow cost.
 *    GeoJSON clusters render entirely on WebGL and scale to 10,000+ points.
 *
 * 3. GEOJSON OPTIMISATION
 *    For neighbourhood polygons with many vertices, run them through:
 *      https://mapshaper.org (10–15% simplification for zoom 10–12)
 *    This reduces parse time and GPU vertex buffer size.
 *
 * 4. LAYER COUNT
 *    Each addLayer() call is a draw call. Combine fill + outline into one
 *    layer where possible using "fill-outline-color" (single pass).
 *
 * 5. SPRITE / IMAGE ATLAS
 *    Pre-load landmark icons as a sprite sheet using map.addImage() on load
 *    rather than text-based emoji, for consistent cross-platform rendering.
 */
