// Initialize the map centered on Galway, Ireland
const map = L.map("map").setView([53.2707, -9.0568], 13);

// Add Esri World Imagery as the base layer
L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    maxZoom: 19,
  }
).addTo(map);

// Add some sample points with popups in Galway
const galwayPoints = [
  {
    name: "Galway Cathedral",
    coords: [53.2763, -9.0574],
    description: "One of Galway's most recognizable landmarks, built in 1965.",
  },
  {
    name: "Spanish Arch",
    coords: [53.2695, -9.0535],
    description:
      "Historic arch dating back to 1584, part of Galway's medieval walls.",
  },
  {
    name: "Eyre Square",
    coords: [53.2744, -9.049],
    description: "Central public park in the heart of Galway city.",
  },
  {
    name: "Salthill Promenade",
    coords: [53.2589, -9.0805],
    description: "Popular seaside walk with views of Galway Bay.",
  },
];

// Create markers for each point
galwayPoints.forEach((point) => {
  L.marker(point.coords)
    .addTo(map)
    .bindPopup(`<b>${point.name}</b><br>${point.description}`);
});

// Optional: Add a scale control
L.control.scale().addTo(map);
