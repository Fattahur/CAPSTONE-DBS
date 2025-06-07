// map.js
export function initMap(containerId, lat = -6.200000, lng = 106.816666, zoom = 13) {
  // Pastikan Leaflet sudah load karena di index.html pakai defer

  const map = L.map(containerId).setView([lat, lng], zoom);

  // Pakai tile dari OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
}
