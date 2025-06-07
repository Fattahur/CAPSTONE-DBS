
import { html, render } from 'lit-html';
import CeritaPopulerModel from '../../models/berandaModel.js';
import BerandaPresenter from './beranda-presenter.js';

const BerandaPage = {
  ceritaPopuler: [],
  ceritaMingguan: [], 
  container: null,

  renderTemplate() {
    const populer = this.ceritaPopuler;
    const mingguan = this.ceritaMingguan;

    return html`
      <section class="hero">
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

      <section class="section">
        <div class="container-beranda">
          <h2>Cerita Populer</h2>
          <div class="grid-3">
            ${
              populer.length > 0
                ? populer.map(
                    (item) => html`
                      <div class="card">
                        <img src="${item.gambar}" alt="${item.judul}" />
                        <h3>${item.judul}</h3>
                        <p>${item.isi}</p>
                        <a href="#/detail?id=${item.id}" class="btn-selengkapnya">Selengkapnya</a>
                      </div>
                    `
                  )
                : html`<p>Memuat cerita populer...</p>`
            }
          </div>
        </div>
      </section>

      <section class="section">
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
                      <div class="card">
                        <img src="${item.gambar}" alt="${item.judul}" />
                        <h3>${item.judul}</h3>
                        <p>${item.isi}</p>
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
    if (this.container) {
      this.render(this.container);
    }
  },

  updateCeritaMingguan(data) {
    this.ceritaMingguan = data;
    if (this.container) {
      this.render(this.container);
    }
  },

  showError(message) {
    this.ceritaPopuler = [];
    this.ceritaMingguan = [];
    if (this.container) {
      this.render(this.container);
    }
    alert(message);
  },

  async afterRender() {
    this.presenter = new BerandaPresenter(new CeritaPopulerModel(), this);
    await this.presenter.loadCeritaPopuler();
    await this.presenter.loadCeritaMingguan();  
  },
};

export default BerandaPage;
