
// import { html, render } from 'lit-html';
// import CeritaBudayaModel from '../../models/ceritaBudayaModel';
// import CeritaBudayaPresenter from './ceritabudaya-presenter';

// const dummyStories = {
//   semua: [1, 2, 3],
//   tarian: [
//     {
//       image: 'images/dayak.jpg',
//       title: 'Tarian Tradisional',
//       desc: 'Tarian suku Dayak yang memiliki nilai magis...',
//       lokasi: 'Kalimantan',
//     },
//   ],
//   upacara: [
//     {
//       image: 'images/dayak.jpg',
//       title: 'Upacara Adat',
//       desc: 'Upacara tahunan masyarakat suku Dayak...',
//       lokasi: 'Kalimantan',
//     },
//   ],
// };

// let currentCategory = 'semua';

// const CeritaBudayaPage = {
//   async render(container) {
//     const updateContent = () => {
//       const selectedData = dummyStories[currentCategory];

//       const dynamicSection =
//         currentCategory === 'semua'
//           ? html`
//               <!-- Rekomendasi Cerita -->
//               <section class="rekomendasi">
//                 <div class="jdl-rekomendasi"></div>
//                 <div class="rekomendasi-grid">
//                   ${selectedData.map(
//                     () => html`
//                       <div class="card-rekomendasi">
//                         <img class="img-square" src="images/dayak.jpg" />
//                         <p class="judul-cerita">Cerita Budaya</p>
//                         <p class="desc">Deskripsi cerita budaya singkat...</p>
//                         <p class="lokasi">Indonesia</p>
//                         <div class="actions">
//                           <button class="selengkapnya">Selengkapnya</button>
//                           <div class="icon-group">
//                             <span>❤️</span>
//                             <span>💬</span>
//                             <span>🔖</span>
//                           </div>
//                         </div>
//                       </div>
//                     `
//                   )}
//                 </div>
//               </section>
//             `
//           : html`
//               <!-- Tampilan per kategori -->
//               <section class="terpopuler">
//                 ${selectedData.map(
//                   (story) => html`
//                     <div class="terpopuler-img">
//                       <img
//                         class="img-square"
//                         src="${story.image}"
//                         alt="${story.title}"
//                       />
//                       <h3>${story.title}</h3>
//                       <p>${story.desc}</p>
//                       <p><strong>Lokasi:</strong> ${story.lokasi}</p>
//                     </div>
//                   `
//                 )}
//               </section>
//             `;

//       const template = html`
//         <main class="cerita-container">
//           <!-- Top Bar -->
//           <section class="top-bar">
//             <div class="jdl-cerita-terpopuler">Cerita Budaya</div>
//             <div class="search-filter-wrapper">
//               <input
//                 type="text"
//                 class="search-input"
//                 placeholder="Cari cerita budaya..."
//               />
//               <select class="filter-select">
//                 <option value="semua">Semua</option>
//                 <option value="tarian">Tarian</option>
//                 <option value="upacara">Upacara</option>
//               </select>
//             </div>
//           </section>

//           <!-- Konten Dinamis -->
//           ${dynamicSection}
//         </main>
//       `;

//       render(template, container);

//       // Tambahkan event listener ulang karena re-render
//       container.querySelector('.filter-select').addEventListener('change', (e) => {
//         currentCategory = e.target.value;
//         updateContent();
//       });
//     };

//     updateContent();
//   },

//   async afterRender() {
//     // Bisa ditambahkan jika butuh fetch data API
//   },
// };

// export default CeritaBudayaPage;



import { html, render } from 'lit-html';
import CeritaBudayaModel from '../../models/ceritaBudayaModel';
import CeritaBudayaPresenter from './ceritabudaya-presenter';

const dummyStories = {
  semua: [], // Nanti akan diisi dari API
  tarian: [
    {
      image: 'images/dayak.jpg',
      title: 'Tarian Tradisional',
      desc: 'Tarian suku Dayak yang memiliki nilai magis...',
      lokasi: 'Kalimantan',
    },
  ],
  upacara: [
    {
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
                        <p class="desc">${story.isi.substring(0, 60)}...</p>
                        <p class="lokasi">${story.lokasi || 'Indonesia'}</p>
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

      container
        .querySelector('.filter-select')
        .addEventListener('change', (e) => {
          currentCategory = e.target.value;
          updateContent();
        });
    };

    // Simpan updateContent agar bisa dipanggil ulang setelah fetch
    this.updateContent = updateContent;

    updateContent();
  },

  async afterRender() {
    const model = new CeritaBudayaModel();
    this.presenter = new CeritaBudayaPresenter(model, {
      showStories: (data) => {
        dummyStories.semua = data;
        this.updateContent(); // Re-render dengan data terbaru
      },
      showError: (message) => {
        console.error('Gagal memuat cerita:', message);
      },
    });

    await this.presenter.loadCeritaBudaya();
  },
};

export default CeritaBudayaPage;
