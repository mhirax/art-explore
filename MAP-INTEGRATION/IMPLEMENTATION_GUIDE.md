# Lagos Map — Production Upgrade Guide

## File Structure

```
src/
├── components/
│   └── MapView/
│       ├── MapView.jsx              ← Main map component
│       ├── MapView.module.scss      ← Map + popup styles
│       ├── LegendPanel.jsx          ← Toggleable layer guide
│       ├── LegendPanel.module.scss
│       ├── GalleryCard.jsx          ← Slide-in gallery detail
│       └── GalleryCard.module.scss
├── data/
│   ├── galleries.js                 ← Your existing gallery data (unchanged)
│   └── lagosGeo.js                  ← NEW: neighbourhoods + landmarks GeoJSON
└── hooks/
    └── useMapLayers.js              ← Clustering + tile cache utilities
```

---

## Drop-in Instructions

### 1. Install dependencies (none new needed)
MapLibre GL JS is already in your project. No new packages required.

### 2. Replace your MapView
Swap your existing `MapView.jsx` and `MapView.scss` with the new files.
Your `galleries.js` data file is **unchanged** — it stays as your source of truth.

### 3. Add GeoJSON data
Copy `lagosGeo.js` to `/src/data/`. This is the real-coordinate GeoJSON for:
- Victoria Island, Ikoyi, Lekki, Lagos Island, Onikan (Island)
- Yaba, Ikeja, Surulere, Apapa (Mainland)
- Landmarks: Apapa Port, Tin Can Port, MMA Airport, National Museum, etc.
- Green zones: Lekki Coastal Greenway, VI Lagoon Buffer

### 4. SCSS modules
Rename `.scss` → `.module.scss` if not already using CSS Modules in Vite.
Add to your vite.config.js if needed:
```js
css: { modules: { localsConvention: 'camelCase' } }
```

---

## Design Decisions

### Zoom Level Behaviour

| Zoom | What shows |
|------|-----------|
| 9–10 | Region overlays (Island/Mainland), gallery markers, region labels |
| 10–11 | Neighbourhood fill colours appear, green zone shading |
| 11–12 | Neighbourhood name labels, landmark emoji icons |
| 12–13 | Landmark text labels appear |
| 13–14 | Full street-level detail, all labels at full opacity |
| 14–16 | Street names from MapTiler base layer clearly visible |

### Map Style Recommendation
Switch from `base-v4` to `streets-v2` for far more street/building detail:
```js
style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${KEY}`
```
The `base-v4` style used in your original code suppresses most street names.

### Marker Strategy
- **Under 30 galleries**: DOM markers (current approach) — better for rich HTML popups
- **Over 30 galleries**: Switch to `addClusteredGalleries()` from `useMapLayers.js`
  which uses WebGL rendering and clusters at low zoom

---

## FlyTo Easing Reference

```js
// Ease-in-out quad (used for gallery focus)
easing: (t) => t < 0.5 ? 2*t*t : -1 + (4-2*t)*t

// Ease-out cubic (used for neighbourhood fly)
easing: (t) => 1 - Math.pow(1 - t, 3)

// Ease-in-out cubic (used for reset/overview)
easing: (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2
```

---

## Legend Panel — Layer Keys

| Key | Controls |
|-----|---------|
| `galleries` | All gallery markers |
| `neighbourhoods` | Neighbourhood fills, outlines, labels |
| `landmarks` | Landmark icons + labels |
| `greenZones` | Lekki Greenway, VI Lagoon Buffer shading |
| `regionOverlays` | Island/Mainland background shading |

---

## Extending the Map

### Add more landmarks
In `lagosGeo.js`, add a Point feature to `landmarksGeoJSON.features`:
```js
{
  type: "Feature",
  properties: {
    id: "lekki-tollgate",
    name: "Lekki Tollgate",
    category: "landmark",
    icon: "🚧",
    description: "Major intersection — Lekki-Epe Expressway",
    showAtZoom: 12,
  },
  geometry: { type: "Point", coordinates: [3.5450, 6.4410] },
}
```

### Add a new neighbourhood
Add a Polygon feature to `neighbourhoodsGeoJSON.features`:
```js
{
  type: "Feature",
  properties: {
    id: "ajah",
    name: "Ajah",
    region: "Island",
    color: "#0891b2",
    description: "Growing suburban district — Lekki Peninsula",
  },
  geometry: {
    type: "Polygon",
    coordinates: [[ /* coordinate ring */ ]],
  },
}
```

### Switch to offline tiles
Replace the MapTiler URL with a self-hosted PMTiles source:
```js
style: {
  version: 8,
  sources: {
    "lagos-tiles": {
      type: "vector",
      url: "pmtiles:///public/lagos.pmtiles",
    }
  },
  layers: [ /* your layer definitions */ ]
}
```
Use `protomaps/pmtiles` + `maplibre-gl-pmtiles` plugin for this.

---

## Performance Checklist

- [ ] Use `streets-v2` map style (more detail, same tile count)
- [ ] Run `lagosGeo.js` polygons through mapshaper.org if adding high-res boundaries
- [ ] Enable clustering (`useMapLayers.js`) when gallery list exceeds 30
- [ ] Add `?key=` caching headers to MapTiler tile requests in production
- [ ] Use `map.setMaxBounds()` to prevent unnecessary tile loads outside Lagos
- [ ] Lazy-import `LegendPanel` if bundle size matters: `React.lazy(() => import('./LegendPanel'))`
