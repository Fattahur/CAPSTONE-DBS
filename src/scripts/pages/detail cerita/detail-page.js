// cobaa
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


