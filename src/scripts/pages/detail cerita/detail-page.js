
// import DetailCeritaPresenter from '../detail cerita/detail-presenter.js';
// import { likeCerita, unlikeCerita } from '../../models/likeModel.js';
// import FavoritModel from '../../models/favoritModel.js';
// import { showToastBerhasil, showToastGagal } from '../../toast/show-toast.js';
// import KomentarModel from '../../models/komentarModel.js';

// const DetailPage = {
//   async render() {
//     return `
//       <section class="detail-container">
//         <button class="back-button" id="back-to-landing">
//           <i class="fas fa-arrow-left"></i>
//         </button>
//         <h2>Detail Cerita</h2>
        
//         <img id="gambar" src="" alt="Gambar Cerita" 
//           style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" />

//         <section class="like-bookmark">
//           <div class="like" id="likeBtn" title="Like ❤️">
//             ❤️ <span>Like</span> <span id="likeCount">0</span>
//           </div>
//           <div class="bookmark" id="bookmarkBtn" title="Simpan ke Favorit">
//             ⭐ <span>Favorit</span> <span id="favCount">0</span>
//           </div>
//         </section>

//         <section class="info-cerita">
//           <p><strong>Judul:</strong> <span id="judul"></span></p>
//           <p><strong>Penulis:</strong> <span id="penulis"></span></p>
//           <p><strong>Deskripsi:</strong> <span id="isi"></span></p>
//         </section>

//         <section class="map-wrapper">
//           <div id="map"></div>
//           <div id="map-info" class="map-info"></div>
//         </section>

//         <section class="comments-section">
//           <h3>Komentar</h3>
//           <div class="comments-list" id="commentsList"></div>
//           <form class="comment-form" id="commentForm">
//             <input type="text" id="commentInput" placeholder="Tulis komentar..." required />
//             <button type="submit">Kirim</button>
//           </form>
//         </section>
//       </section>
//     `;
//   },

//   async afterRender() {
//     const loadLeafletCSS = () => {
//       const link = document.createElement('link');
//       link.rel = 'stylesheet';
//       link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
//       document.head.appendChild(link);
//     };

//     const loadLeafletJS = () => {
//       return new Promise((resolve) => {
//         const script = document.createElement('script');
//         script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
//         script.onload = resolve;
//         document.body.appendChild(script);
//       });
//     };

//     loadLeafletCSS();
//     await loadLeafletJS();

//     const [, queryString] = window.location.hash.split('?');
//     const params = new URLSearchParams(queryString);
//     const id = params.get('id');

//     if (!id) {
//       alert('ID cerita tidak ditemukan di URL.');
//       return;
//     }

//     const token = localStorage.getItem('token') || null;
//     let currentData = null;

//     const view = {
//       showDetailCerita: (data) => {
//         currentData = data;

//         let gambarUrl = data.gambar;
//         if (gambarUrl && !gambarUrl.startsWith('http')) {
//           gambarUrl = 'https://ceritanusantara.site/uploads/' + gambarUrl;
//         }

//         document.getElementById('gambar').src = gambarUrl || '';
//         document.getElementById('judul').textContent = data.judul || '-';
//         document.getElementById('penulis').textContent = data.namaUser || '-';
//         document.getElementById('isi').textContent = data.isi || '-';
//         document.getElementById('likeCount').textContent = data.like?.total || '0';
//         document.getElementById('favCount').textContent = data.favorit?.total || '0';

//         document.getElementById('likeBtn').style.color = data.like?.sayaSuka ? 'red' : 'gray';
//         document.getElementById('bookmarkBtn').style.color = data.favorit?.sayaFavorit ? 'gold' : 'gray';

//         const commentsList = document.getElementById('commentsList');
//         commentsList.innerHTML = data.komentar?.length > 0
//           ? data.komentar.map(k => `
//               <div class="comment-item">
//                 <strong>${k.username}</strong> (${k.tanggal}): 
//                 <p>${k.isiKomentar}</p>
//               </div>
//             `).join('')
//           : '<p>Belum ada komentar.</p>';

//         DetailPage.initLeafletMap(data.lokasi, data.judul);
//       },

//       showError: (message) => {
//         alert(`Terjadi kesalahan: ${message}`);
//       }
//     };

//     const presenter = new DetailCeritaPresenter(view);
//     await presenter.loadDetailCerita(id);

//     document.getElementById('likeBtn')?.addEventListener('click', async () => {
//       if (!token) {
//         showToastGagal('Anda harus login untuk menyukai cerita.');
//         return;
//       }

//       try {
//         const idCerita = currentData?.id;
//         const isLiked = currentData?.like?.sayaSuka;

//         if (isLiked) {
//           await unlikeCerita(idCerita, token);
//           currentData.like.total -= 1;
//           currentData.like.sayaSuka = false;
//           showToastBerhasil('Berhasil menghapus like.');
//         } else {
//           await likeCerita(idCerita, token);
//           currentData.like.total += 1;
//           currentData.like.sayaSuka = true;
//           showToastBerhasil('Cerita disukai!');
//         }

//         document.getElementById('likeCount').textContent = currentData.like.total;
//         document.getElementById('likeBtn').style.color = currentData.like.sayaSuka ? 'red' : 'gray';
//       } catch (err) {
//         showToastGagal('Gagal memproses like.');
//         console.error(err);
//       }
//     });

//     document.getElementById('bookmarkBtn')?.addEventListener('click', async () => {
//       if (!token) {
//         showToastGagal('Anda harus login untuk favorit cerita.');
//         return;
//       }

//       try {
//         const idCerita = currentData?.id;
//         const isFavorit = currentData?.favorit?.sayaFavorit;

//         if (isFavorit) {
//           await FavoritModel.hapusFavorit(idCerita, token);
//           currentData.favorit.total -= 1;
//           currentData.favorit.sayaFavorit = false;
//           showToastBerhasil('Dihapus dari favorit.');
//         } else {
//           await FavoritModel.tambahFavorit(idCerita, token);
//           currentData.favorit.total += 1;
//           currentData.favorit.sayaFavorit = true;
//           showToastBerhasil('Ditambahkan ke favorit!');
//         }

//         document.getElementById('favCount').textContent = currentData.favorit.total;
//         document.getElementById('bookmarkBtn').style.color = currentData.favorit.sayaFavorit ? 'gold' : 'gray';
//       } catch (err) {
//         showToastGagal('Gagal memproses favorit.');
//         console.error(err);
//       }
//     });

//     document.getElementById('commentForm')?.addEventListener('submit', async (e) => {
//       e.preventDefault();
//       const input = document.getElementById('commentInput');
//       const isiKomentar = input?.value.trim();
//       if (!isiKomentar) return;

//       if (!token) {
//         showToastGagal('Anda harus login untuk mengirim komentar.');
//         return;
//       }

//       try {
//         await KomentarModel.kirimKomentar(currentData.id, isiKomentar, token);
//         showToastBerhasil('Komentar berhasil dikirim.');

//         const tanggal = new Date().toISOString().split('T')[0];
//         const username = JSON.parse(localStorage.getItem('userData'))?.username || 'Anda';
//         const commentsList = document.getElementById('commentsList');

//         const newComment = {
//           username,
//           tanggal,
//           isiKomentar
//         };
//         currentData.komentar.push(newComment);

//         const commentItem = document.createElement('div');
//         commentItem.className = 'comment-item';
//         commentItem.innerHTML = `<strong>${username}</strong> (${tanggal}): <p>${isiKomentar}</p>`;
//         commentsList.appendChild(commentItem);

//         input.value = '';
//       } catch (err) {
//         console.error(err);
//         showToastGagal('Gagal mengirim komentar.');
//       }
//     });
//   },

//   initLeafletMap(locationData, judulCerita = 'Lokasi Cerita') {
//     let defaultLat = -6.1754;
//     let defaultLng = 106.8272;
//     let zoomLevel = 13;
//     let hasValidLocation = false;

//     if (locationData) {
//       try {
//         if (typeof locationData === 'string') {
//           const coords = locationData.split(',').map(Number);
//           if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
//             [defaultLat, defaultLng] = coords;
//             hasValidLocation = true;
//           }
//         } else if (locationData.latitude && locationData.longitude) {
//           defaultLat = parseFloat(locationData.latitude);
//           defaultLng = parseFloat(locationData.longitude);
//           hasValidLocation = true;
//         }
//       } catch (e) {
//         console.error("Error parsing location:", e);
//       }
//     }

//     if (L.DomUtil.get('map') != null) {
//       L.DomUtil.get('map')._leaflet_id = null;
//     }

//     const map = L.map('map').setView([defaultLat, defaultLng], hasValidLocation ? 15 : zoomLevel);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     }).addTo(map);

//     const storyIcon = L.icon({
//       iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
//       iconSize: [32, 32],
//       iconAnchor: [16, 32],
//     });

//     if (hasValidLocation) {
//       L.marker([defaultLat, defaultLng], { icon: storyIcon })
//         .addTo(map)
//         .bindPopup(`<b>${judulCerita}</b><br><small>Lat: ${defaultLat.toFixed(4)}, Lng: ${defaultLng.toFixed(4)}</small>`)
//         .openPopup();

//       L.circle([defaultLat, defaultLng], {
//         color: '#3388ff',
//         fillColor: '#3388ff',
//         fillOpacity: 0.2,
//         radius: 500
//       }).addTo(map);
//     } else {
//       document.getElementById('map-info').innerHTML = '<p class="text-muted">Lokasi cerita tidak tersedia.</p>';
//     }

//     map.locate({ setView: false, maxZoom: 16 });
//     map.on('locationfound', (e) => {
//       const userIcon = L.icon({
//         iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447042.png',
//         iconSize: [32, 32],
//       });

//       L.marker([e.latitude, e.longitude], { icon: userIcon })
//         .addTo(map)
//         .bindPopup('Lokasi Anda');
//     });
//   }
// };

// export default DetailPage;



import { navigateTo } from '../../utils/navigasi.js';

import DetailCeritaPresenter from '../detail cerita/detail-presenter.js';
import { likeCerita, unlikeCerita } from '../../models/likeModel.js';
import FavoritModel from '../../models/favoritModel.js';
import { showToastBerhasil, showToastGagal } from '../../toast/show-toast.js';
import KomentarModel from '../../models/komentarModel.js';

const DetailPage = {
  async render() {
    return `
      <section class="detail-container">
        <button class="back-button" id="back-to-landing">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h2>Detail Cerita</h2>
        
        <img id="gambar" src="" alt="Gambar Cerita"
          style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" />

        <section class="like-bookmark">
          <div class="like" id="likeBtn" title="Like ❤️">
            ❤️ <span>Like</span> <span id="likeCount">0</span>
          </div>
          <div class="bookmark" id="bookmarkBtn" title="Simpan ke Favorit">
            ⭐ <span>Favorit</span> <span id="favCount">0</span>
          </div>
        </section>

        <section class="info-cerita">
          <p><strong>Judul:</strong> <span id="judul"></span></p>
          <p><strong>Penulis:</strong> <span id="penulis"></span></p>
          <p><strong>Deskripsi:</strong> <span id="isi"></span></p>
        </section>

        <section class="map-wrapper">
          <div id="map"></div>
          <div id="map-info" class="map-info"></div>
        </section>

        <section class="comments-section">
          <h3>Komentar</h3>
          <div class="comments-list" id="commentsList"></div>
          <form class="comment-form" id="commentForm">
            <input type="text" id="commentInput" placeholder="Tulis komentar..." required />
            <button type="submit">Kirim</button>
          </form>
        </section>
      </section>
    `;
  },

  async afterRender() {
    const loadLeafletCSS = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    };

    const loadLeafletJS = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    loadLeafletCSS();
    await loadLeafletJS();

    const [, queryString] = window.location.hash.split('?');
    const params = new URLSearchParams(queryString);
    const id = params.get('id');

    if (!id) {
      alert('ID cerita tidak ditemukan di URL.');
      return;
    }

    const token = localStorage.getItem('token');
    let currentData = null;

    const view = {
      showDetailCerita: (data) => {
        currentData = data;

        let gambarUrl = data.gambar;
        if (gambarUrl && !gambarUrl.startsWith('http')) {
          gambarUrl = 'https://ceritanusantara.site/uploads/' + gambarUrl;
        }

        document.getElementById('gambar').src = gambarUrl || '';
        document.getElementById('judul').textContent = data.judul || '-';
        document.getElementById('penulis').textContent = data.namaUser || '-';
        document.getElementById('isi').textContent = data.isi || '-';
        document.getElementById('likeCount').textContent = data.like?.total || '0';
        document.getElementById('favCount').textContent = data.favorit?.total || '0';

        document.getElementById('likeBtn').style.color = data.like?.sayaSuka ? 'red' : 'gray';
        document.getElementById('bookmarkBtn').style.color = data.favorit?.sayaFavorit ? 'gold' : 'gray';

        const commentsList = document.getElementById('commentsList');
        commentsList.innerHTML = data.komentar?.length
          ? data.komentar.map(k => `
              <div class="comment-item">
                <strong>${k.username}</strong> (${k.tanggal}): 
                <p>${k.isiKomentar}</p>
              </div>
            `).join('')
          : '<p>Belum ada komentar.</p>';

        this.initLeafletMap(data.lokasi, data.judul);
      },
      showError: (message) => {
        alert(`Terjadi kesalahan: ${message}`);
      }
    };

    const presenter = new DetailCeritaPresenter(view);
    await presenter.loadDetailCerita(id);

    // Tombol Back
document.getElementById('back-to-landing')?.addEventListener('click', () => {
  navigateTo('#/beranda');
});


    // Like
    document.getElementById('likeBtn')?.addEventListener('click', async () => {
      if (!token) return showToastGagal('Harap login untuk menyukai.');

      try {
        const idCerita = currentData.id;
        const isLiked = currentData.like.sayaSuka;

        if (isLiked) {
          await unlikeCerita(idCerita, token);
          currentData.like.total -= 1;
        } else {
          await likeCerita(idCerita, token);
          currentData.like.total += 1;
        }

        currentData.like.sayaSuka = !isLiked;
        document.getElementById('likeCount').textContent = currentData.like.total;
        document.getElementById('likeBtn').style.color = currentData.like.sayaSuka ? 'red' : 'gray';
        showToastBerhasil(isLiked ? 'Like dihapus.' : 'Cerita disukai!');
      } catch (err) {
        showToastGagal('Gagal memproses like.');
        console.error(err);
      }
    });

    // Favorit
    document.getElementById('bookmarkBtn')?.addEventListener('click', async () => {
      if (!token) return showToastGagal('Harap login untuk favorit.');

      try {
        const idCerita = currentData.id;
        const isFavorit = currentData.favorit.sayaFavorit;

        if (isFavorit) {
          await FavoritModel.hapusFavorit(idCerita, token);
          currentData.favorit.total -= 1;
        } else {
          await FavoritModel.tambahFavorit(idCerita, token);
          currentData.favorit.total += 1;
        }

        currentData.favorit.sayaFavorit = !isFavorit;
        document.getElementById('favCount').textContent = currentData.favorit.total;
        document.getElementById('bookmarkBtn').style.color = currentData.favorit.sayaFavorit ? 'gold' : 'gray';
        showToastBerhasil(isFavorit ? 'Favorit dihapus.' : 'Ditambahkan ke favorit!');
      } catch (err) {
        showToastGagal('Gagal memproses favorit.');
        console.error(err);
      }
    });

    // Komentar
    document.getElementById('commentForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = document.getElementById('commentInput');
      const isiKomentar = input?.value.trim();
      if (!isiKomentar || !token) return;

      try {
        await KomentarModel.kirimKomentar(currentData.id, isiKomentar, token);
        showToastBerhasil('Komentar berhasil dikirim.');

        const tanggal = new Date().toISOString().split('T')[0];
        const username = JSON.parse(localStorage.getItem('userData'))?.username || 'Anda';
        const newComment = document.createElement('div');
        newComment.className = 'comment-item';
        newComment.innerHTML = `<strong>${username}</strong> (${tanggal}): <p>${isiKomentar}</p>`;
        document.getElementById('commentsList').appendChild(newComment);
        input.value = '';
      } catch (err) {
        console.error(err);
        showToastGagal('Gagal mengirim komentar.');
      }
    });
  },

  initLeafletMap(locationData, judulCerita = 'Lokasi Cerita') {
    let defaultLat = -6.1754;
    let defaultLng = 106.8272;
    let hasValidLocation = false;

    if (locationData) {
      try {
        const coords = typeof locationData === 'string'
          ? locationData.split(',').map(Number)
          : [parseFloat(locationData.latitude), parseFloat(locationData.longitude)];

        if (!isNaN(coords[0]) && !isNaN(coords[1])) {
          [defaultLat, defaultLng] = coords;
          hasValidLocation = true;
        }
      } catch (e) {
        console.error("Error parsing location:", e);
      }
    }

    if (L.DomUtil.get('map') != null) {
      L.DomUtil.get('map')._leaflet_id = null;
    }

    const map = L.map('map').setView([defaultLat, defaultLng], hasValidLocation ? 15 : 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    if (hasValidLocation) {
      const icon = L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png', iconSize: [32, 32] });
      L.marker([defaultLat, defaultLng], { icon }).addTo(map).bindPopup(`<b>${judulCerita}</b>`).openPopup();
    } else {
      document.getElementById('map-info').innerHTML = '<p class="text-muted">Lokasi cerita tidak tersedia.</p>';
    }

    map.locate({ setView: false });
    map.on('locationfound', (e) => {
      const userIcon = L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447042.png', iconSize: [32, 32] });
      L.marker([e.latitude, e.longitude], { icon: userIcon }).addTo(map).bindPopup('Lokasi Anda');
    });
  }
};

export default DetailPage;



























// import DetailCeritaPresenter from '../detail cerita/detail-presenter.js';

// const DetailPage = {
//   async render() {
//     return `
//       <section class="detail-container">
//         <button class="back-button" id="back-to-landing">
//           <i class="fas fa-arrow-left"></i>
//         </button>
//         <h2>Detail Cerita</h2>
        
//         <img id="gambar" src="" alt="Gambar Cerita" 
//           style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" />

//         <section class="like-bookmark">
//           <div class="like" id="likeBtn" title="Like ❤️">
//             ❤️ <span>Like</span> <span id="likeCount">0</span>
//           </div>
//           <div class="bookmark" id="bookmarkBtn" title="Simpan ke Favorit">
//             ⭐ <span>Favorit</span> <span id="favCount">0</span>
//           </div>
//         </section>

//         <section class="info-cerita">
//           <p><strong>Judul:</strong> <span id="judul"></span></p>
//           <p><strong>Penulis:</strong> <span id="penulis"></span></p>
//           <p><strong>Deskripsi:</strong> <span id="isi"></span></p>
//         </section>

//         <section class="map-wrapper">
//           <div id="map"></div>
//           <div id="map-info" class="map-info"></div>
//         </section>

//         <section class="comments-section">
//           <h3>Komentar</h3>
//           <div class="comments-list" id="commentsList"></div>
//           <form class="comment-form" id="commentForm">
//             <input type="text" id="commentInput" placeholder="Tulis komentar..." required />
//             <button type="submit">Kirim</button>
//           </form>
//         </section>
//       </section>
//     `;
//   },

//   async afterRender() {
//     // Load Leaflet CSS dynamically
//     const loadLeafletCSS = () => {
//       const link = document.createElement('link');
//       link.rel = 'stylesheet';
//       link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
//       document.head.appendChild(link);
//     };

//     // Load Leaflet JS dynamically
//     const loadLeafletJS = () => {
//       return new Promise((resolve) => {
//         const script = document.createElement('script');
//         script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
//         script.onload = resolve;
//         document.body.appendChild(script);
//       });
//     };

//     // Load required assets
//     loadLeafletCSS();
//     await loadLeafletJS();

//     const [, queryString] = window.location.hash.split('?');
//     const params = new URLSearchParams(queryString);
//     const id = params.get('id');

//     if (!id) {
//       alert('ID cerita tidak ditemukan di URL.');
//       return;
//     }

//     const view = {
//       showDetailCerita: (data) => {
//         // Update konten cerita
//         let gambarUrl = data.gambar;
//         if (gambarUrl && !gambarUrl.startsWith('http')) {
//           gambarUrl = 'https://ceritanusantara.site/uploads/' + gambarUrl;
//         }

//         document.getElementById('gambar').src = gambarUrl || '';
//         document.getElementById('judul').textContent = data.judul || '-';
//         document.getElementById('penulis').textContent = data.namaUser || '-';
//         document.getElementById('isi').textContent = data.isi || '-';
//         document.getElementById('likeCount').textContent = data.like?.total || '0';
//         document.getElementById('favCount').textContent = data.favorit?.total || '0';

//         // Update komentar
//         const commentsList = document.getElementById('commentsList');
//         commentsList.innerHTML = data.komentar?.length > 0
//           ? data.komentar.map(k => `
//               <div class="comment-item">
//                 <strong>${k.username}</strong> (${k.tanggal}): 
//                 <p>${k.isiKomentar}</p>
//               </div>
//             `).join('')
//           : '<p>Belum ada komentar.</p>';

//         // Render peta Leaflet
//         this.initLeafletMap(data.lokasi, data.judul);
//       },

//       showError: (message) => {
//         alert(`Terjadi kesalahan: ${message}`);
//       }
//     };

//     const presenter = new DetailCeritaPresenter(view);
//     presenter.loadDetailCerita(id);

//     // Event listeners
//     document.getElementById('likeBtn')?.addEventListener('click', () => {
//       alert('Like belum diimplementasikan');
//     });

//     document.getElementById('bookmarkBtn')?.addEventListener('click', () => {
//       alert('Favorit belum diimplementasikan');
//     });

//     document.getElementById('commentForm')?.addEventListener('submit', (e) => {
//       e.preventDefault();
//       const input = document.getElementById('commentInput');
//       const value = input?.value.trim();
//       if (value) {
//         alert('Fitur komentar belum diimplementasikan');
//         if (input) input.value = '';
//       }
//     });
//   },

//   initLeafletMap(locationData, judulCerita = 'Lokasi Cerita') {
//     // Default coordinates (Monas Jakarta)
//     let defaultLat = -6.1754;
//     let defaultLng = 106.8272;
//     let zoomLevel = 13;
//     let hasValidLocation = false;

//     // Parse location data (format: "lat,lng" or {latitude, longitude})
//     if (locationData) {
//       try {
//         if (typeof locationData === 'string') {
//           const coords = locationData.split(',').map(Number);
//           if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
//             [defaultLat, defaultLng] = coords;
//             hasValidLocation = true;
//           }
//         } else if (locationData.latitude && locationData.longitude) {
//           defaultLat = parseFloat(locationData.latitude);
//           defaultLng = parseFloat(locationData.longitude);
//           hasValidLocation = true;
//         }
//       } catch (e) {
//         console.error("Error parsing location:", e);
//       }
//     }

//     if (L.DomUtil.get('map') != null) {
//   L.DomUtil.get('map')._leaflet_id = null;
// }
//     // Initialize map
//     const map = L.map('map').setView([defaultLat, defaultLng], hasValidLocation ? 15 : zoomLevel);

//     // Add tile layer
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     }).addTo(map);

//     // Custom marker icon
//     const storyIcon = L.icon({
//       iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
//       iconSize: [32, 32],
//       iconAnchor: [16, 32],
//     });

//     // Add marker if location is valid
//     if (hasValidLocation) {
//       L.marker([defaultLat, defaultLng], { icon: storyIcon })
//         .addTo(map)
//         .bindPopup(`
//           <b>${judulCerita}</b><br>
//           <small>Lat: ${defaultLat.toFixed(4)}, Lng: ${defaultLng.toFixed(4)}</small>
//         `)
//         .openPopup();

//       // Add circle radius (500m)
//       L.circle([defaultLat, defaultLng], {
//         color: '#3388ff',
//         fillColor: '#3388ff',
//         fillOpacity: 0.2,
//         radius: 500
//       }).addTo(map);
//     } else {
//       document.getElementById('map-info').innerHTML = 
//         '<p class="text-muted">Lokasi cerita tidak tersedia.</p>';
//     }

//     // Add geolocation (user position)
//     map.locate({ setView: false, maxZoom: 16 });
    
//     map.on('locationfound', (e) => {
//       const userIcon = L.icon({
//         iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447042.png',
//         iconSize: [32, 32],
//       });

//       L.marker([e.latitude, e.longitude], { icon: userIcon })
//         .addTo(map)
//         .bindPopup('Lokasi Anda');
//     });
//   }
// };

// export default DetailPage;









// import DetailCeritaPresenter from '../detail cerita/detail-presenter.js';
// import { likeCerita, unlikeCerita } from '../../models/likeModel.js';
// import FavoritModel from '../../models/favoritModel.js';
// import { showToastBerhasil, showToastGagal } from '../../toast/show-toast.js';

// const DetailPage = {
//   async render() {
//     return `
//       <section class="detail-container">
//         <button class="back-button" id="back-to-landing">
//           <i class="fas fa-arrow-left"></i>
//         </button>
//         <h2>Detail Cerita</h2>
        
//         <img id="gambar" src="" alt="Gambar Cerita" 
//           style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" />

//         <section class="like-bookmark">
//           <div class="like" id="likeBtn" title="Like ❤️">
//             ❤️ <span>Like</span> <span id="likeCount">0</span>
//           </div>
//           <div class="bookmark" id="bookmarkBtn" title="Simpan ke Favorit">
//             ⭐ <span>Favorit</span> <span id="favCount">0</span>
//           </div>
//         </section>

//         <section class="info-cerita">
//           <p><strong>Judul:</strong> <span id="judul"></span></p>
//           <p><strong>Penulis:</strong> <span id="penulis"></span></p>
//           <p><strong>Deskripsi:</strong> <span id="isi"></span></p>
//         </section>

//         <section class="map-wrapper">
//           <div id="map"></div>
//           <div id="map-info" class="map-info"></div>
//         </section>

//         <section class="comments-section">
//           <h3>Komentar</h3>
//           <div class="comments-list" id="commentsList"></div>
//           <form class="comment-form" id="commentForm">
//             <input type="text" id="commentInput" placeholder="Tulis komentar..." required />
//             <button type="submit">Kirim</button>
//           </form>
//         </section>
//       </section>
//     `;
//   },

//   async afterRender() {
//     const loadLeafletCSS = () => {
//       const link = document.createElement('link');
//       link.rel = 'stylesheet';
//       link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
//       document.head.appendChild(link);
//     };

//     const loadLeafletJS = () => {
//       return new Promise((resolve) => {
//         const script = document.createElement('script');
//         script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
//         script.onload = resolve;
//         document.body.appendChild(script);
//       });
//     };

//     loadLeafletCSS();
//     await loadLeafletJS();

//     const [, queryString] = window.location.hash.split('?');
//     const params = new URLSearchParams(queryString);
//     const id = params.get('id');

//     if (!id) {
//       alert('ID cerita tidak ditemukan di URL.');
//       return;
//     }

//     const token = localStorage.getItem('token') || null;
//     let currentData = null;

//     const view = {
//       showDetailCerita: (data) => {
//         currentData = data;

//         let gambarUrl = data.gambar;
//         if (gambarUrl && !gambarUrl.startsWith('http')) {
//           gambarUrl = 'https://ceritanusantara.site/uploads/' + gambarUrl;
//         }

//         document.getElementById('gambar').src = gambarUrl || '';
//         document.getElementById('judul').textContent = data.judul || '-';
//         document.getElementById('penulis').textContent = data.namaUser || '-';
//         document.getElementById('isi').textContent = data.isi || '-';
//         document.getElementById('likeCount').textContent = data.like?.total || '0';
//         document.getElementById('favCount').textContent = data.favorit?.total || '0';

//         // Ganti warna jika sudah like / favorit
//         document.getElementById('likeBtn').style.color = data.like?.sayaSuka ? 'red' : 'gray';
//         document.getElementById('bookmarkBtn').style.color = data.favorit?.sayaFavorit ? 'gold' : 'gray';

//         const commentsList = document.getElementById('commentsList');
//         commentsList.innerHTML = data.komentar?.length > 0
//           ? data.komentar.map(k => `
//               <div class="comment-item">
//                 <strong>${k.username}</strong> (${k.tanggal}): 
//                 <p>${k.isiKomentar}</p>
//               </div>
//             `).join('')
//           : '<p>Belum ada komentar.</p>';

//         this.initLeafletMap(data.lokasi, data.judul);
//       },

//       showError: (message) => {
//         alert(`Terjadi kesalahan: ${message}`);
//       }
//     };

//     const presenter = new DetailCeritaPresenter(view);
//     presenter.loadDetailCerita(id);

//     // Like
//     document.getElementById('likeBtn')?.addEventListener('click', async () => {
//       if (!token) {
//         showToastGagal('Anda harus login untuk menyukai cerita.');
//         return;
//       }

//       try {
//         const idCerita = currentData?.id;
//         const isLiked = currentData?.like?.sayaSuka;

//         if (isLiked) {
//           await unlikeCerita(idCerita, token);
//           currentData.like.total -= 1;
//           currentData.like.sayaSuka = false;
//           showToastBerhasil('Berhasil menghapus like.');
//         } else {
//           await likeCerita(idCerita, token);
//           currentData.like.total += 1;
//           currentData.like.sayaSuka = true;
//           showToastBerhasil('Cerita disukai!');
//         }

//         document.getElementById('likeCount').textContent = currentData.like.total;
//         document.getElementById('likeBtn').style.color = currentData.like.sayaSuka ? 'red' : 'gray';
//       } catch (err) {
//         showToastGagal('Gagal memproses like.');
//         console.error(err);
//       }
//     });

//     // Favorit
//     document.getElementById('bookmarkBtn')?.addEventListener('click', async () => {
//       if (!token) {
//         showToastGagal('Anda harus login untuk favorit cerita.');
//         return;
//       }

//       try {
//         const idCerita = currentData?.id;
//         const isFavorit = currentData?.favorit?.sayaFavorit;

//         if (isFavorit) {
//           await FavoritModel.hapusFavorit(idCerita, token);
//           currentData.favorit.total -= 1;
//           currentData.favorit.sayaFavorit = false;
//           showToastBerhasil('Dihapus dari favorit.');
//         } else {
//           await FavoritModel.tambahFavorit(idCerita, token);
//           currentData.favorit.total += 1;
//           currentData.favorit.sayaFavorit = true;
//           showToastBerhasil('Ditambahkan ke favorit!');
//         }

//         document.getElementById('favCount').textContent = currentData.favorit.total;
//         document.getElementById('bookmarkBtn').style.color = currentData.favorit.sayaFavorit ? 'gold' : 'gray';
//       } catch (err) {
//         showToastGagal('Gagal memproses favorit.');
//         console.error(err);
//       }
//     });

//     // Komentar
//     document.getElementById('commentForm')?.addEventListener('submit', (e) => {
//       e.preventDefault();
//       const input = document.getElementById('commentInput');
//       const value = input?.value.trim();
//       if (value) {
//         alert('Fitur komentar belum diimplementasikan');
//         if (input) input.value = '';
//       }
//     });
//   },

//   initLeafletMap(locationData, judulCerita = 'Lokasi Cerita') {
//     let defaultLat = -6.1754;
//     let defaultLng = 106.8272;
//     let zoomLevel = 13;
//     let hasValidLocation = false;

//     if (locationData) {
//       try {
//         if (typeof locationData === 'string') {
//           const coords = locationData.split(',').map(Number);
//           if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
//             [defaultLat, defaultLng] = coords;
//             hasValidLocation = true;
//           }
//         } else if (locationData.latitude && locationData.longitude) {
//           defaultLat = parseFloat(locationData.latitude);
//           defaultLng = parseFloat(locationData.longitude);
//           hasValidLocation = true;
//         }
//       } catch (e) {
//         console.error("Error parsing location:", e);
//       }
//     }

//     if (L.DomUtil.get('map') != null) {
//       L.DomUtil.get('map')._leaflet_id = null;
//     }

//     const map = L.map('map').setView([defaultLat, defaultLng], hasValidLocation ? 15 : zoomLevel);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     }).addTo(map);

//     const storyIcon = L.icon({
//       iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
//       iconSize: [32, 32],
//       iconAnchor: [16, 32],
//     });

//     if (hasValidLocation) {
//       L.marker([defaultLat, defaultLng], { icon: storyIcon })
//         .addTo(map)
//         .bindPopup(`<b>${judulCerita}</b><br><small>Lat: ${defaultLat.toFixed(4)}, Lng: ${defaultLng.toFixed(4)}</small>`)
//         .openPopup();

//       L.circle([defaultLat, defaultLng], {
//         color: '#3388ff',
//         fillColor: '#3388ff',
//         fillOpacity: 0.2,
//         radius: 500
//       }).addTo(map);
//     } else {
//       document.getElementById('map-info').innerHTML = '<p class="text-muted">Lokasi cerita tidak tersedia.</p>';
//     }

//     map.locate({ setView: false, maxZoom: 16 });
//     map.on('locationfound', (e) => {
//       const userIcon = L.icon({
//         iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447042.png',
//         iconSize: [32, 32],
//       });

//       L.marker([e.latitude, e.longitude], { icon: userIcon })
//         .addTo(map)
//         .bindPopup('Lokasi Anda');
//     });
//   }
// };

// export default DetailPage;


































// // detail-page.js
// import detailPresenter from "./detail-presenter.js";

// const BASE_URL = "https://ceritanusantara.site/api/auth";

// let map; // simpan instance map global supaya bisa di-remove

// const DetailPage = {
//   async render() {
//     return `
//       <section class="detail-container">
//         <h2>Detail Cerita</h2>
//         <img id="gambar" src="" alt="Gambar Cerita" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" />
//         <section class="like-bookmark">
//           <div class="like" id="likeBtn" title="Like ❤️">
//             ❤️ <span>Like</span> <span id="likeCount">0</span>
//           </div>
//           <div class="bookmark" id="bookmarkBtn" title="Simpan ke Favorit">
//             ⭐ <span>Favorit</span> <span id="favCount">0</span>
//           </div>
//         </section>
//         <section class="info-cerita">
//           <p><strong>Judul:</strong> <span id="judul"></span></p>
//           <p><strong>Penulis:</strong> <span id="penulis"></span></p>
//           <p><strong>Deskripsi:</strong> <span id="isi"></span></p>
//         </section>
//         <section class="map-wrapper" style="height: 300px;">
//           <div id="map" style="width: 100%; height: 100%;"></div>
//         </section>
//         <section class="comments-section">
//           <h3>Komentar</h3>
//           <div class="comments-list" id="commentsList"></div>
//           <form class="comment-form" id="commentForm">
//             <input type="text" id="commentInput" placeholder="Tulis komentar..." required />
//             <button type="submit">Kirim</button>
//           </form>
//         </section>
//       </section>
//     `;
//   },

//   async afterRender() {
//     const hash = window.location.hash;
//     const queryString = hash.split("?")[1] || "";
//     const urlParams = new URLSearchParams(queryString);
//     const id = urlParams.get("id");

//     if (!id) {
//       alert("ID tidak ditemukan.");
//       return;
//     }

//     const cerita = await detailPresenter.fetchCerita(id);
//     if (!cerita) {
//       alert("Gagal memuat data cerita");
//       return;
//     }

//     document.getElementById("judul").textContent = cerita.judul;
//     document.getElementById("penulis").textContent = cerita.nama_user;
//     document.getElementById("isi").textContent = cerita.deskripsi;
//     document.getElementById("gambar").src = `${BASE_URL.replace("/api/auth", "")}/uploads/${cerita.gambar}`;
//     document.getElementById("gambar").alt = cerita.judul;

//     const coords = cerita.lokasi_koordinat
//       ? cerita.lokasi_koordinat.split(",").map(Number)
//       : [-6.2, 106.816666];

//     // Hapus map lama kalau sudah ada
//     if (map) {
//       map.remove();
//     }

//     // Buat map baru dan simpan instance
//     map = L.map("map").setView(coords, 5);
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "&copy; OpenStreetMap contributors",
//     }).addTo(map);
//     L.marker(coords).addTo(map).bindPopup(cerita.lokasi).openPopup();

//     // Like button
//     const likeBtn = document.getElementById("likeBtn");
//     const likeCount = document.getElementById("likeCount");
//     let liked = cerita.like?.sudahDilikeUser || false;
//     let totalLikes = cerita.like?.total || 0;

//     function updateLikeUI() {
//       likeBtn.classList.toggle("liked", liked);
//       likeCount.textContent = totalLikes;
//     }

//     likeBtn.addEventListener("click", () => {
//       liked = !liked;
//       totalLikes += liked ? 1 : -1;
//       updateLikeUI();
//     });
//     updateLikeUI();

//     // Bookmark button
//     const bookmarkBtn = document.getElementById("bookmarkBtn");
//     const favCount = document.getElementById("favCount");
//     let favorited = cerita.favorit?.sudahDifavoritkanUser || false;
//     let totalFav = cerita.favorit?.total || 0;

//     function updateFavUI() {
//       bookmarkBtn.classList.toggle("favorited", favorited);
//       favCount.textContent = totalFav;
//     }

//     bookmarkBtn.addEventListener("click", () => {
//       favorited = !favorited;
//       totalFav += favorited ? 1 : -1;
//       updateFavUI();
//     });
//     updateFavUI();

//     // Komentar
//     const commentsList = document.getElementById("commentsList");
//     const commentForm = document.getElementById("commentForm");
//     const commentInput = document.getElementById("commentInput");

//     function renderComments() {
//       commentsList.innerHTML = "";
//       if (!cerita.komentar || cerita.komentar.length === 0) {
//         commentsList.innerHTML = "<p>Belum ada komentar.</p>";
//         return;
//       }
//       cerita.komentar.forEach((komentar) => {
//         const div = document.createElement("div");
//         div.className = "comment-item";
//         div.innerHTML = `
//           <strong>${komentar.username}</strong> <small>${new Date(komentar.tanggal).toLocaleString()}</small>
//           <p>${komentar.isi_komentar}</p>
//         `;
//         commentsList.appendChild(div);
//       });
//     }

//     renderComments();

//     commentForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       const newCommentText = commentInput.value.trim();
//       if (!newCommentText) return;

//       const newComment = {
//         id_komentar: Date.now(),
//         isi_komentar: newCommentText,
//         tanggal: new Date().toISOString(),
//         username: "User",
//       };

//       cerita.komentar.push(newComment);
//       renderComments();
//       commentInput.value = "";
//     });
//   },
// };

// export default DetailPage;




// import DetailCeritaPresenter from '../detail cerita/detail-presenter.js';

// const DetailPage = {
//   async render() {
//     return `
//       <section class="detail-container">
//         <h2>Detail Cerita</h2>
//         <img id="gambar" src="" alt="Gambar Cerita" 
//           style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" />

//         <section class="like-bookmark">
//           <div class="like" id="likeBtn" title="Like ❤️">
//             ❤️ <span>Like</span> <span id="likeCount">0</span>
//           </div>
//           <div class="bookmark" id="bookmarkBtn" title="Simpan ke Favorit">
//             ⭐ <span>Favorit</span> <span id="favCount">0</span>
//           </div>
//         </section>

//         <section class="info-cerita">
//           <p><strong>Judul:</strong> <span id="judul"></span></p>
//           <p><strong>Penulis:</strong> <span id="penulis"></span></p>
//           <p><strong>Deskripsi:</strong> <span id="isi"></span></p>
//         </section>

//         <section class="map-wrapper" style="height: 300px;">
//           <div id="map" style="width: 100%; height: 100%; background: #eee;">Map here</div>
//         </section>

//         <section class="comments-section">
//           <h3>Komentar</h3>
//           <div class="comments-list" id="commentsList"></div>
//           <form class="comment-form" id="commentForm">
//             <input type="text" id="commentInput" placeholder="Tulis komentar..." required />
//             <button type="submit">Kirim</button>
//           </form>
//         </section>
//       </section>
//     `;
//   },

//   async afterRender() {
//     const [, queryString] = window.location.hash.split('?');
//       const params = new URLSearchParams(queryString);
//       const id = params.get('id');

//     if (!id) {
//       alert('ID cerita tidak ditemukan di URL.');
//       return;
//     }

//     const view = {
//       showDetailCerita: (data) => {

//          console.log('URL gambar:', data.gambar);  // <-- Tambahkan di sini untuk cek isi gambar
//         document.getElementById('gambar').src = data.gambar;
//         document.getElementById('judul').textContent = data.judul;
//         document.getElementById('penulis').textContent = data.namaUser;
//         document.getElementById('isi').textContent = data.isi;
//         document.getElementById('likeCount').textContent = data.like.total;
//         document.getElementById('favCount').textContent = data.favorit.total;

//         const commentsList = document.getElementById('commentsList');
//         commentsList.innerHTML = '';
//         if (data.komentar.length === 0) {
//           commentsList.innerHTML = '<p>Belum ada komentar.</p>';
//         } else {
//           data.komentar.forEach(k => {
//             const div = document.createElement('div');
//             div.classList.add('comment-item');
//             div.innerHTML = `<strong>${k.username}</strong> (${k.tanggal}): <p>${k.isiKomentar}</p>`;
//             commentsList.appendChild(div);
//           });
//         }

//         // Map render (dummy)
//         document.getElementById('map').textContent = `Lokasi: ${data.lokasi}`;
//       },

//       showError: (message) => {
//         alert(`Terjadi kesalahan: ${message}`);
//       }
//     };

//     const presenter = new DetailCeritaPresenter(view);
//     presenter.loadDetailCerita(id);

//     // Optional: Like and Favorite handler
//     document.getElementById('likeBtn').addEventListener('click', () => {
//       alert('Like belum diimplementasikan');
//     });
//     document.getElementById('bookmarkBtn').addEventListener('click', () => {
//       alert('Favorit belum diimplementasikan');
//     });

//     // Komentar
//     const commentForm = document.getElementById('commentForm');
//     commentForm.addEventListener('submit', (e) => {
//       e.preventDefault();
//       const input = document.getElementById('commentInput');
//       const value = input.value.trim();
//       if (value) {
//         alert('Fitur kirim komentar belum diimplementasikan');
//         input.value = '';
//       }
//     });
//   }
// };

// export default DetailPage;


