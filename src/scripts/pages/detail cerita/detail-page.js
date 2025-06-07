const DetailPage = {
  render() {
    return `
      <section>
        <h2>Detail Cerita</h2>
        <div id="map" style="height: 400px;"></div>
        <p>Judul: <span id="judul"></span></p>
        <p>Penulis: <span id="penulis"></span></p>
        <p>Isi Cerita: <span id="isi"></span></p>
      </section>
    `;
  },

  afterRender() {
    // Sementara ini dummy data, nanti diganti pakai model/presenter
    document.getElementById("judul").textContent = "Judul Cerita Contoh";
    document.getElementById("penulis").textContent = "Nama Penulis";
    document.getElementById("isi").textContent = "Ini adalah isi cerita yang detail...";

    // Inisialisasi leaflet map (contoh koordinat Jakarta)
    const map = L.map("map").setView([-6.200000, 106.816666], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Contoh marker
    L.marker([-6.200000, 106.816666]).addTo(map).bindPopup("Lokasi Cerita").openPopup();
  },
};

export default DetailPage;
