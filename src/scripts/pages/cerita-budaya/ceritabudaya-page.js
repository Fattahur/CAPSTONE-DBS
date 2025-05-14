import { html, render } from 'lit-html';

const CeritaBudayaPage = {
  async render(container) {
    const template = html`
      <main class="cerita-container">
        <!-- Bagian Top Bar -->
        <section class="top-bar">
          <h2>Cerita Terpopuler</h2>
          <div class="search-filter-wrapper">
            <input
              type="text"
              class="search-input"
              placeholder="Cari cerita budaya..."
            />
            <select class="filter-select">
              <option value="semua">Semua</option>
              <option value="tarian">Tarian</option>
              <option value="upacara">Upacara</option>
            </select>
          </div>
        </section>

        <!-- Bagian Terpopuler -->
        <section class="terpopuler">
          <div class="terpopuler-img">
            <img class="img-square" src="images/dayak.jpg" alt="Cerita Terpopuler" />
          </div>
        </section>

        <!-- Cerita Terbaru -->
        <section class="terbaru">
          <h2>Cerita Budaya Terbaru</h2>
          <div class="gambar-grid">
            ${[1, 2, 3].map(
              () => html`
                <div class="gambar-card">
                  <img class="img-square" src="images/dayak.jpg" alt="Cerita Budaya Terbaru" />
                </div>
              `
            )}
          </div>
        </section>

        <!-- Rekomendasi Cerita -->
        <section class="rekomendasi">
          <h2>Rekomendasi</h2>
          <div class="rekomendasi-grid">
            ${[1, 2, 3, 4].map(
              () => html`
                <div class="card">
                  <img class="img-square" src="images/dayak.jpg" alt="Cerita Budaya" />
                  <h3>Cerita Budaya</h3>
                  <p class="desc">Deskripsi cerita budaya singkat...</p>
                  <p class="lokasi">Indonesia</p>
                  <div class="actions">
                    <button class="selengkapnya">Selengkapnya</button>
                    <div class="icon-group">
                      <span>❤️</span>
                      <span>💬</span>
                      <span>🔖</span>
                    </div>
                  </div>
                </div>
              `
            )}
          </div>
        </section>
      </main>
    `;

    render(template, container);
  },

  async afterRender(container) {
    // Tambahkan logika pencarian/filter jika dibutuhkan
  },
};

export default CeritaBudayaPage;
