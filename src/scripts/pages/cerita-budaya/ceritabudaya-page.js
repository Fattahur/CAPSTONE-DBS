import { html, render } from 'lit-html';
import CeritaBudayaModel from '../../models/ceritaBudayaModel';
import CeritaBudayaPresenter from './ceritabudaya-presenter';

const dummyStories = {
  semua: [], // Akan diisi dari API
  tarian: [
    {
      id: 'tarian-1',
      image: 'images/dayak.jpg',
      title: 'Tarian Tradisional',
      desc: 'Tarian suku Dayak yang memiliki nilai magis...',
      lokasi: 'Kalimantan',
    },
  ],
  upacara: [
    {
      id: 'upacara-1',
      image: 'images/dayak.jpg',
      title: 'Upacara Adat',
      desc: 'Upacara tahunan masyarakat suku Dayak...',
      lokasi: 'Kalimantan',
    },
  ],
};

let currentCategory = 'semua';

const CeritaBudayaPage = {
  presenter: null,

  async render(container) {
    const updateContent = () => {
      const selectedData = dummyStories[currentCategory];

      const dynamicSection =
        currentCategory === 'semua'
          ? html`
              <section class="rekomendasi">
                <div class="jdl-rekomendasi"></div>
                <div class="rekomendasi-grid">
                  ${selectedData.map(
                    (story) => html`
                      <div class="card-rekomendasi">
                        <img class="img-square" src="${story.gambar}" />
                        <p class="judul-cerita">${story.judul}</p>
                        <p class="desc">${story.isi?.substring(0, 60) || story.desc?.substring(0, 60)}...</p>
                        <p class="lokasi">${story.lokasi || 'Indonesia'}</p>
                        <div class="actions">
                          <button class="selengkapnya" data-id="${story.id}">Selengkapnya</button>
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
            `
          : html`
              <section class="terpopuler">
                ${selectedData.map(
                  (story) => html`
                    <div class="terpopuler-img">
                      <img
                        class="img-square"
                        src="${story.image}"
                        alt="${story.title}"
                      />
                      <h3>${story.title}</h3>
                      <p>${story.desc}</p>
                      <p><strong>Lokasi:</strong> ${story.lokasi}</p>
                      <div class="actions">
                        <button class="selengkapnya" data-id="${story.id}">Selengkapnya</button>
                      </div>
                    </div>
                  `
                )}
              </section>
            `;

      const template = html`
        <main class="cerita-container">
          <section class="top-bar">
            <div class="jdl-cerita-terpopuler">Cerita Budaya</div>
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
          ${dynamicSection}
        </main>
      `;

      render(template, container);

      // Tombol filter
      container.querySelector('.filter-select').addEventListener('change', (e) => {
        currentCategory = e.target.value;
        updateContent();
      });

      // Tombol "Selengkapnya"
      container.querySelectorAll('.selengkapnya').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          if (id) {
            window.location.hash = `#/detail?id=${id}`;
          } else {
            alert('ID cerita tidak tersedia!');
          }
        });
      });
    };

    this.updateContent = updateContent;

    updateContent();
  },

  async afterRender() {
    const model = new CeritaBudayaModel();

    this.presenter = new CeritaBudayaPresenter(model, {
      showStories: (data) => {
        dummyStories.semua = data;
        this.updateContent(); // Re-render dengan data baru
      },
      showError: (message) => {
        console.error('Gagal memuat cerita:', message);
      },
    });

    await this.presenter.loadCeritaBudaya();
  },
};

export default CeritaBudayaPage;
