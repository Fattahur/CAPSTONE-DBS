import { html, render } from 'lit-html';

const BerandaPage = {
  async render(container) {
    const template = html`



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
        <div class="container">
          <h2>Cerita Populer</h2>
          <div class="grid-3">
            ${[
              'images/upacara.jpg',
              'images/borobudur.jpg',
              'images/borobudur.jpg',
            ].map(
              (imgPath) => html`
                <div class="card">
                  <img src="${imgPath}" alt="Cerita Populer" />
                  <h3>Subheading</h3>
                  <p>
                    Body text for whatever you’d like to add more to the
                    subheading.
                  </p>
                </div>
              `
            )}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>Cerita Mingguan</h2>
          <div class="filter-bar">
            <button class="active">Tari</button>
            <button>Candi</button>
            <button>Upacara</button>
          </div>
          <div class="grid-3">
            ${[
              'images/borobudur.jpg',
              'images/borobudur.jpg',
              'images/borobudur.jpg',
              'images/borobudur.jpg',
              'images/borobudur.jpg',
              'images/borobudur.jpg',
            ].map(
              (imgPath) => html`
                <div class="card">
                  <img src="${imgPath}" alt="Cerita Mingguan" />
                  <h3>Judul Cerita</h3>
                  <p>Deskripsi singkat cerita mingguan budaya.</p>
                </div>
              `
            )}
          </div>
        </div>
      </section>
    `;

    render(template, container);
  },

  async afterRender(container) {
    // Tambahkan interaksi jika ada
  },
};

export default BerandaPage;
