
import { html, render } from 'lit-html';
import CeritaBudayaModel from '../../models/ceritaBudayaModel';
import CeritaBudayaPresenter from './ceritabudaya-presenter';
import { likeCerita, unlikeCerita } from '../../models/likeModel';
import FavoritModel from '../../models/favoritModel';
import { showToastBerhasil, showToastGagal } from '../../toast/show-toast';

let currentCategory = 'semua';
let searchQuery = '';
let kategoriList = ['semua'];

const dummyStories = {
  semua: [],
};

const CeritaBudayaPage = {
  presenter: null,
  userToken: null,

  async render(container) {
    const updateContent = () => {
      const allStories = dummyStories.semua;

      const selectedData = currentCategory === 'semua'
        ? allStories
        : allStories.filter(
            (story) =>
              story.kategori?.toLowerCase() === currentCategory.toLowerCase()
          );

      const filteredData = selectedData.filter((story) => {
        const text = story.judul || story.title || '';
        return text.toLowerCase().includes(searchQuery);
      });

      const template = html`
        <main class="cerita-container">
          <section class="top-bar">
            <div class="jdl-cerita-terpopuler">Cerita Budaya</div>
            <div class="search-filter-wrapper">
              <input
                type="text"
                class="search-input"
                placeholder="Cari cerita budaya..."
                @input=${(e) => {
                  searchQuery = e.target.value.toLowerCase();
                  updateContent();
                }}
              />
              <select
                class="filter-select"
                @change=${(e) => {
                  currentCategory = e.target.value;
                  updateContent();
                }}
              >
                ${kategoriList.map(
                  (kat) => html`
                    <option value="${kat}" ?selected=${kat === currentCategory}>
                      ${kat[0].toUpperCase() + kat.slice(1)}
                    </option>
                  `
                )}
              </select>
            </div>
          </section>

          <section class="rekomendasi">
            <div class="rekomendasi-grid">
              ${filteredData.map(
                (story) => html`
                  <div class="card-rekomendasi">
                    <img class="img-square" src="${story.gambar}" />
                    <p class="judul-cerita">${story.judul}</p>
                    <p class="desc">
                      ${story.isi?.substring(0, 60)}...
                    </p>
                    <p class="lokasi">${story.lokasi || 'Indonesia'}</p>
                    <div class="actions">
                      <button class="selengkapnya" data-id="${story.id}">
                        Selengkapnya
                      </button>
                      <div class="icon-group">
                        <span
                          class="like-btn"
                          style="cursor:pointer; color: ${story.isLiked ? 'red' : 'gray'}"
                          data-id="${story.id}"
                          title="${story.isLiked ? 'Unlike' : 'Like'} Cerita"
                        >
                          ❤️
                        </span>
                        <span
                          class="comment-btn"
                          style="cursor:pointer;"
                          data-id="${story.id}"
                          title="Lihat & Tambahkan Komentar"
                        >
                          💬
                        </span>
                        <span
                          class="fav-btn"
                          style="cursor:pointer; color: ${story.isFavorit ? 'gold' : 'gray'}"
                          data-id="${story.id}"
                          title="${story.isFavorit ? 'Hapus dari Favorit' : 'Tambahkan ke Favorit'}"
                        >
                          🔖
                        </span>
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

      // SELENGKAPNYA
      container.querySelectorAll('.selengkapnya').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          if (id) {
            window.location.hash = `#/detail?id=${id}`;
          } else {
            showToastGagal('ID cerita tidak tersedia!');
          }
        });
      });

      // KOMENTAR - arahkan ke detail cerita
      container.querySelectorAll('.comment-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          if (id) {
            window.location.hash = `#/detail?id=${id}`;
          } else {
            showToastGagal('ID cerita tidak tersedia!');
          }
        });
      });

      // LIKE Handler
      container.querySelectorAll('.like-btn').forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const id = e.target.getAttribute('data-id');
          if (!id) return;

          if (!this.userToken) {
            showToastGagal('Silakan login terlebih dahulu untuk like/unlike.');
            return;
          }

          try {
            const story = dummyStories.semua.find((s) => s.id == id);
            if (!story) return;

            if (story.isLiked) {
              await unlikeCerita(id, this.userToken);
              story.isLiked = false;
              showToastBerhasil('Unlike cerita berhasil!');
            } else {
              await likeCerita(id, this.userToken);
              story.isLiked = true;
              showToastBerhasil('Berhasil menyukai cerita ini!');
            }
            updateContent();
          } catch (err) {
            showToastGagal('Gagal memproses like/unlike: ' + (err.message || err));
          }
        });
      });

      // FAVORIT Handler
      container.querySelectorAll('.fav-btn').forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const id = e.target.getAttribute('data-id');
          if (!id) return;

          if (!this.userToken) {
            showToastGagal('Silakan login untuk mengelola favorit.');
            return;
          }

          try {
            const story = dummyStories.semua.find((s) => s.id == id);
            if (!story) return;

            if (story.isFavorit) {
              await FavoritModel.hapusFavorit(id, this.userToken);
              story.isFavorit = false;
              showToastBerhasil('Cerita dihapus dari favorit.');
            } else {
              await FavoritModel.tambahFavorit(id, this.userToken);
              story.isFavorit = true;
              showToastBerhasil('Cerita ditambahkan ke favorit.');
            }
            updateContent();
          } catch (err) {
            showToastGagal('Gagal mengelola favorit: ' + (err.message || err));
          }
        });
      });
    };

    this.updateContent = updateContent;
    updateContent();
  },

  async afterRender() {
    this.userToken = localStorage.getItem('token') || null;

    const model = new CeritaBudayaModel();

    this.presenter = new CeritaBudayaPresenter(model, {
      showStories: (data) => {
        data.forEach((d) => {
          if (typeof d.isLiked === 'undefined') d.isLiked = false;
          if (typeof d.isFavorit === 'undefined') d.isFavorit = false;
        });

        dummyStories.semua = data;

        const kategoriUnik = [
          ...new Set(data.map((item) => item.kategori?.toLowerCase())),
        ];
        kategoriList = ['semua', ...kategoriUnik.filter(Boolean)];

        this.updateContent();
      },
      showError: (message) => {
        console.error('Gagal memuat cerita:', message);
      },
    });

    await this.presenter.loadCeritaBudaya();
  },
};

export default CeritaBudayaPage;
