import { html, render } from 'lit-html';

const CeritaBudayaPage = {
  async render(container) {
    const template = html`
      <main class="cerita-container">
        <!-- Bagian Top Bar -->
        <section class="top-bar">
          <div class= "jdl-cerita-terpopuler">
            Cerita Terpopuler </div>
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
          <div class="jdl-rekomendasi">
          Cerita Budaya Terbaru
          </div>
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

        <div class="jdl-rekomendasi">
          Rekomendasi
        </div>

          <div class="rekomendasi-grid">
            ${[1, 2, 3, 4].map(
              () => html`
                <div class="card-rekomendasi">
                  <img class="img-square" src="images/dayak.jpg"  />
                  
                  <p class="judul-cerita">Cerita Budaya</p>

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
