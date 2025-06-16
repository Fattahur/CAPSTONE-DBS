
// import { html, render } from 'lit-html';

// const JelajahPage = {
//   async render(container) {
//     const template = html`
//       <main class="cerita-container">
//         <section class="top-bar">
//           <div class="jdl-cerita-terpopuler">Cerita Budaya</div>
//           <div class="search-filter-wrapper">
//             <input type="text" class="search-input" placeholder="Cari cerita budaya..." />
//             <select class="filter-select">
//               <option value="semua">Semua</option>
//               <option value="tarian">Tarian</option>
//               <option value="upacara">Upacara</option>
//             </select>
//           </div>
//         </section>

//         <section class="rekomendasi">
//           <div class="rekomendasi-grid">
//             ${[1, 2, 3, 4, 5, 6].map(
//               () => html`
//                 <div class="card-rekomendasi">
//                   <img class="img-square" src="images/dayak.jpg" />
//                   <p class="judul-cerita">Cerita Budaya</p>
//                   <p class="desc">Deskripsi cerita budaya singkat...</p>
//                   <p class="lokasi">Indonesia</p>
//                   <div class="actions">
//                     <button class="selengkapnya">Selengkapnya</button>
//                     <div class="icon-group">
//                       <span>❤️</span>
//                       <span>💬</span>
//                       <span>🔖</span>
//                     </div>
//                   </div>
//                 </div>
//               `
//             )}
//           </div>
//         </section>
//       </main>
//     `;
//     render(template, container);
//   },

//   async afterRender(container) {
  
    
//   },
// };
// export default JelajahPage;






//     // import { html, render } from 'lit-html';
    
//     // const JelajahPage = {
//     //   async render(container) {
//     //     const template = html`
//     //     <main class="cerita-container">

//     //     <section class="top-bar">
//     //       <div class= "jdl-cerita-terpopuler">
//     //         Cerita Budaya</div>
//     //       <div class="search-filter-wrapper">
//     //         <input
//     //           type="text"
//     //           class="search-input"
//     //           placeholder="Cari cerita budaya..."
//     //         />
//     //         <select class="filter-select">
//     //           <option value="semua">Semua</option>
//     //           <option value="tarian">Tarian</option>
//     //           <option value="upacara">Upacara</option>
//     //         </select>
//     //       </div>
//     //     </section>

//     //     <!-- Rekomendasi Cerita -->
//     //     <section class="rekomendasi">

//     //       <div class="rekomendasi-grid">
//     //         ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
//     //           () => html`
//     //             <div class="card-rekomendasi">
//     //               <img class="img-square" src="images/dayak.jpg"  />
                  
//     //               <p class="judul-cerita">Cerita Budaya</p>

//     //               <p class="desc">Deskripsi cerita budaya singkat...</p>
//     //               <p class="lokasi">Indonesia</p>
//     //               <div class="actions">
//     //                 <button class="selengkapnya">Selengkapnya</button>
//     //                 <div class="icon-group">
//     //                   <span>❤️</span>
//     //                   <span>💬</span>
//     //                   <span>🔖</span>
//     //                 </div>
//     //               </div>
//     //             </div>
//     //           `
//     //         )}
//     //       </div>
//     //     </section>

//     //     </main>

//     //     `;
//     //     render(template, container);
//     //   },
    
//     //   async afterRender(container) {
//     //     // Tambahkan interaksi/animasi di sini jika perlu
//     //   },
//     // };
    
//     // export default JelajahPage;
    









import { html, render } from 'lit';
import CeritaBudayaModel from '../../models/ceritaBudayaModel.js';

import AOS from 'aos';
import 'aos/dist/aos.css';

const JelajahPage = {
  allStories: [],
  kategoriList: ['semua'],
  currentCategory: 'semua',
  searchQuery: '',

  async render(container) {
    this.container = container;

    AOS.init({ duration: 800, once: false }); // ✅ Inisialisasi animasi

    const selected = this.currentCategory === 'semua'
      ? this.allStories
      : this.allStories.filter((s) =>
          (s.kategori || '').toLowerCase() === this.currentCategory.toLowerCase()
        );

    const filteredStories = selected.filter((s) =>
      (s.judul || '').toLowerCase().includes(this.searchQuery)
    );

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
                this.searchQuery = e.target.value.toLowerCase();
                this.render(container);
              }}
            />
            <select
              class="filter-select"
              @change=${(e) => {
                this.currentCategory = e.target.value;
                this.render(container);
              }}
            >
              ${this.kategoriList.map(
                (kat) => html`
                  <option value="${kat}" ?selected=${kat === this.currentCategory}>
                    ${kat[0].toUpperCase() + kat.slice(1)}
                  </option>
                `
              )}
            </select>
          </div>
        </section>

        <section class="rekomendasi">
          <div class="rekomendasi-grid">
            ${filteredStories.map(
              (story) => html`
                <div class="card-rekomendasi" data-aos="fade-up">
                  <img class="img-square" src="${story.gambar}" alt="${story.judul}" />
                  <p class="judul-cerita">${story.judul}</p>
                  <p class="desc">${story.isi.substring(0, 60)}...</p>
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
      </main>
    `;

    render(template, container);
    AOS.refresh(); // ✅ Pastikan animasi diaktifkan setelah render

    container.querySelectorAll('.selengkapnya')?.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        if (id) {
          window.location.hash = `#/detail?id=${id}`;
        }
      });
    });
  },

  async afterRender(container) {
    const model = new CeritaBudayaModel();
    const result = await model.fetchCeritaBudaya();

    if (result.success) {
      this.allStories = result.data;
      const kategoriUnik = [...new Set(result.data.map((item) => item.kategori?.toLowerCase()))];
      this.kategoriList = ['semua', ...kategoriUnik.filter(Boolean)];
      this.render(container);
    } else {
      render(html`<p style="padding: 1rem;">${result.message}</p>`, container);
    }
  },
};

export default JelajahPage;

