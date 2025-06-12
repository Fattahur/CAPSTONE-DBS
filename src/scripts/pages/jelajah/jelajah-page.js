
import { html, render } from 'lit-html';

const JelajahPage = {
  async render(container) {
    const template = html`
      <main class="cerita-container">
        <section class="top-bar">
          <div class="jdl-cerita-terpopuler">Cerita Budaya</div>
          <div class="search-filter-wrapper">
            <input type="text" class="search-input" placeholder="Cari cerita budaya..." />
            <select class="filter-select">
              <option value="semua">Semua</option>
              <option value="tarian">Tarian</option>
              <option value="upacara">Upacara</option>
            </select>
          </div>
        </section>

        <section class="rekomendasi">
          <div class="rekomendasi-grid">
            ${[1, 2, 3, 4, 5, 6].map(
              () => html`
                <div class="card-rekomendasi">
                  <img class="img-square" src="images/dayak.jpg" />
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
  
    
  },
};
export default JelajahPage;






    // import { html, render } from 'lit-html';
    
    // const JelajahPage = {
    //   async render(container) {
    //     const template = html`
    //     <main class="cerita-container">

    //     <section class="top-bar">
    //       <div class= "jdl-cerita-terpopuler">
    //         Cerita Budaya</div>
    //       <div class="search-filter-wrapper">
    //         <input
    //           type="text"
    //           class="search-input"
    //           placeholder="Cari cerita budaya..."
    //         />
    //         <select class="filter-select">
    //           <option value="semua">Semua</option>
    //           <option value="tarian">Tarian</option>
    //           <option value="upacara">Upacara</option>
    //         </select>
    //       </div>
    //     </section>

    //     <!-- Rekomendasi Cerita -->
    //     <section class="rekomendasi">

    //       <div class="rekomendasi-grid">
    //         ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
    //           () => html`
    //             <div class="card-rekomendasi">
    //               <img class="img-square" src="images/dayak.jpg"  />
                  
    //               <p class="judul-cerita">Cerita Budaya</p>

    //               <p class="desc">Deskripsi cerita budaya singkat...</p>
    //               <p class="lokasi">Indonesia</p>
    //               <div class="actions">
    //                 <button class="selengkapnya">Selengkapnya</button>
    //                 <div class="icon-group">
    //                   <span>❤️</span>
    //                   <span>💬</span>
    //                   <span>🔖</span>
    //                 </div>
    //               </div>
    //             </div>
    //           `
    //         )}
    //       </div>
    //     </section>

    //     </main>

    //     `;
    //     render(template, container);
    //   },
    
    //   async afterRender(container) {
    //     // Tambahkan interaksi/animasi di sini jika perlu
    //   },
    // };
    
    // export default JelajahPage;
    