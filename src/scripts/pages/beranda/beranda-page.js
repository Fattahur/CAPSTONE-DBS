
import { html, render } from 'lit-html';
import CeritaPopulerModel from '../../models/berandaModel.js';
import BerandaPresenter from './beranda-presenter.js';
import { saveHeroImages, loadHeroImages } from '../../indexedDB.js';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 800,
  once: false,
});

const BerandaPage = {
  ceritaPopuler: [],
  ceritaMingguan: [],
  container: null,
  heroImages: [],
  heroIndex: 0,
  heroInterval: null,

  renderTemplate() {
    const populer = this.ceritaPopuler;
    const mingguan = this.ceritaMingguan;

    return html`
      <section class="hero" id="hero">
        <div class="container hero-overlay">
          <h1>
            Temukan Cerita<br />
            Budaya dari Seluruh<br />
            Nusantara
          </h1>
          <button class="cta-button">Jelajahi Sekarang</button>
          <div
            class="scroll-indicator"
            @click=${() =>
              document.querySelector('.section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            &#x25BC;
          </div>
        </div>
      </section>

      <section class="container section">
        <div class="container-beranda">
          <h2>Cerita Populer</h2>
          <div class="grid-3">
            ${
              populer.length > 0
                ? populer.map(
                    (item) => html`
                      <div class="card" data-aos="fade-up">
                        <img src="${item.gambar}" alt="${item.judul}" />
                        <h3>${item.judul}</h3>
                        <p>${item.isi?.substring(0, 100)}</p>
                        <a href="#/detail?id=${item.id}" class="btn-selengkapnya">Selengkapnya</a>
                      </div>
                    `
                  )
                : html`<p>Memuat cerita populer...</p>`
            }
          </div>
        </div>
      </section>

      <section class="container section">
        <div class="container-beranda">
          <div class="section-header">
            <h2>Cerita Mingguan</h2>
            <div class="filter-bar">
              <button class="active">Tari</button>
              <button>Candi</button>
              <button>Upacara</button>
            </div>
          </div>
          <div class="grid-3">
            ${
              mingguan.length > 0
                ? mingguan.map(
                    (item) => html`
                      <div class="card" data-aos="fade-up">
                        <img src="${item.gambar}" alt="${item.judul}" />
                        <h3>${item.judul}</h3>
                        <p>${item.isi?.substring(0, 100)}</p>
                        <a href="#/detail?id=${item.id}" class="btn-selengkapnya">Selengkapnya</a>
                      </div>
                    `
                  )
                : html`<p>Memuat cerita mingguan...</p>`
            }
          </div>
        </div>
      </section>
    `;
  },

  render(container) {
    this.container = container;
    render(this.renderTemplate(), container);
  },

  updateCeritaPopuler(data) {
    this.ceritaPopuler = data;
    this.heroImages = data.map((item) => item.gambar).filter(Boolean);

    // ✅ Simpan ke IndexDB
    saveHeroImages(this.heroImages);

    if (this.container) {
      this.render(this.container);
      AOS.refresh();
    }

    this.startHeroRotation();
  },

  updateCeritaMingguan(data) {
    this.ceritaMingguan = data;
    if (this.container) {
      this.render(this.container);
      AOS.refresh();
    }
  },

  showError(message) {
    this.ceritaPopuler = [];
    this.ceritaMingguan = [];
    if (this.container) {
      this.render(this.container);
      AOS.refresh();
    }
    alert(message);
  },

  startHeroRotation() {
    if (this.heroInterval) clearInterval(this.heroInterval);

    const heroElement = document.querySelector('#hero');
    if (!heroElement || this.heroImages.length === 0) return;

    heroElement.style.backgroundImage = `url('${this.heroImages[this.heroIndex]}')`;
    heroElement.style.backgroundSize = 'cover';
    heroElement.style.backgroundPosition = 'center';

    this.heroInterval = setInterval(() => {
      this.heroIndex = (this.heroIndex + 1) % this.heroImages.length;
      heroElement.style.backgroundImage = `url('${this.heroImages[this.heroIndex]}')`;
    }, 5000);
  },

  async afterRender() {
    this.presenter = new BerandaPresenter(new CeritaPopulerModel(), this);

    // ✅ Coba ambil dari cache lokal lebih dulu
    const cachedImages = await loadHeroImages();
    if (cachedImages.length > 0) {
      this.heroImages = cachedImages;
      this.startHeroRotation();
    }

    // Lalu tetap load data baru dari API
    await this.presenter.loadCeritaPopuler();
    await this.presenter.loadCeritaMingguan();
  },
};

export default BerandaPage;
