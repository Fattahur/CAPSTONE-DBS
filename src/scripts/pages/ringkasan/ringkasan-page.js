
// import { html, render } from 'lit';

// import { BASE_URL, BASE_IMAGE_URL } from '../../api/api';

// const RingkasanPage = {
//   async fetchFavoritCerita() {
//     const token = localStorage.getItem('accessToken');
//     try {
//       const response = await fetch(`${BASE_URL}/favorit`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`Gagal mengambil data favorit. Status: ${response.status}`);
//       }

//       const result = await response.json();
//       return { data: result.data, error: null };
//     } catch (err) {
//       console.error(err);
//       return { data: [], error: err.message };
//     }
//   },

//   async render(container) {
//     render(html`<p class="loading">Memuat data...</p>`, container);

//     const { data: favoritCerita, error } = await this.fetchFavoritCerita();

//     const template = html`
      

//       <div class="ringkasan-container">


//       <div class="tab-bar">
//         <button class="tab-btn active" @click=${() => location.hash = '#/favorit'}>❤️ Favorit</button>
//         <button class="tab-btn" @click=${() => location.hash = '#/like'}>👍 Like</button>
//         <button class="tab-btn" @click=${() => location.hash = '#/cerita-anda'}>📝 Cerita Anda</button>
//       </div>


//         ${error
//           ? html`<div class="error">${error}</div>`
//           : favoritCerita.length === 0
//             ? html`<div class="empty">Belum ada cerita favorit</div>`
//             : html`
//               <div class="card-grid">
                
//                 ${favoritCerita.map(item => html`
//                   <div class="card">
//                     <img 
//                       src="${BASE_IMAGE_URL}/${item.gambar}" 
//                       alt="${item.judul}" 
//                       @error=${e => e.target.src = `${BASE_IMAGE_URL}/default.jpg`}
//                     />
//                     <h3>${item.judul}</h3>
//                     <p>${item.deskripsi?.substring(0, 100)}...</p>
//                   </div>
//                 `)}
//               </div>
//             `}
//       </div>
//     `;

//     render(template, container);
//   }
// };

// export default RingkasanPage;




// KODE UJICOBA

import { html, render } from 'lit';
import { BASE_URL, BASE_IMAGE_URL } from '../../api/api';

import AOS from 'aos';
import 'aos/dist/aos.css';

const RingkasanPage = {
  async fetchFavoritCerita() {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`${BASE_URL}/favorit`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Gagal mengambil data favorit. Status: ${response.status}`);
      }

      const result = await response.json();
      return { data: result.data, error: null };
    } catch (err) {
      console.error(err);
      return { data: [], error: err.message };
    }
  },

  async render(container) {
    AOS.init({ duration: 800, once: false }); // ✅ Inisialisasi animasi
    render(html`<p class="loading">Memuat data...</p>`, container);

    const { data: favoritCerita, error } = await this.fetchFavoritCerita();

    const template = html`
      <div class="ringkasan-container">
        <div class="tab-bar">
          <button class="tab-btn active" @click=${() => location.hash = '#/favorit'}>❤️ Favorit</button>
          <button class="tab-btn" @click=${() => location.hash = '#/like'}>👍 Like</button>
          <button class="tab-btn" @click=${() => location.hash = '#/cerita-anda'}>📝 Cerita Anda</button>
        </div>

        ${error
          ? html`<div class="error">${error}</div>`
          : favoritCerita.length === 0
            ? html`<div class="empty">Belum ada cerita favorit</div>`
            : html`
              <div class="card-grid">
                ${favoritCerita.map(item => html`
                  <div class="card" data-aos="fade-up">
                    <img 
                      src="${BASE_IMAGE_URL}/${item.gambar}" 
                      alt="${item.judul}" 
                      @error=${e => e.target.src = `${BASE_IMAGE_URL}/default.jpg`}
                    />
                    <h3>${item.judul}</h3>
                    <p>${item.deskripsi?.substring(0, 100)}...</p>
                  </div>
                `)}
              </div>
            `}
      </div>
    `;

    render(template, container);
    AOS.refresh(); // ✅ Pastikan animasi diaktifkan setelah render
  }
};

export default RingkasanPage;
