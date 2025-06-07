// const DetailPage = {
//   render() {
//   return `
//     <section class="detail-container">
//       <h2>Detail Cerita</h2>

//       <img id="gambar" src="" alt="Gambar Cerita" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" />

//       <section class="like-bookmark">
//         <div class="like" id="likeBtn" title="Like ❤️">
//           ❤️ <span>Like</span> <span id="likeCount">0</span>
//         </div>
//         <div class="bookmark" id="bookmarkBtn" title="Simpan ke Favorit">
//           ⭐ <span>Favorit</span> <span id="favCount">0</span>
//         </div>
//       </section>

//       <section class="info-cerita">
//         <p><strong>Judul:</strong> <span id="judul"></span></p>
//         <p><strong>Penulis:</strong> <span id="penulis"></span></p>
//         <p><strong>Deskripsi:</strong> <span id="isi"></span></p>
//       </section>

//       <section class="map-wrapper">
//         <div id="map"></div>
//       </section>

//       <section class="comments-section">
//         <h3>Komentar</h3>
//         <div class="comments-list" id="commentsList"></div>
//         <form class="comment-form" id="commentForm">
//           <input type="text" id="commentInput" placeholder="Tulis komentar..." required />
//           <button type="submit">Kirim</button>
//         </form>
//       </section>
//     </section>
//   `;
// },


//   afterRender() {
//   const cerita = {
//     id: 18,
//     judul: "Indonesia Merdeka",
//     deskripsi: "Cerita Unik Nusantara Indonesia Pusaka",
//     lokasi: "Indonesia",
//     nama_user: "rahmatullah24",
//     gambar: "https://picsum.photos/seed/indonesia/1200/600",
//     komentar: [
//       "Mantap ceritanya!",
//       "Semangat terus untuk Indonesia!",
//     ],
//     like: {
//       total: 12,
//       sudahDilikeUser: false,
//     },
//     favorit: {
//       total: 5,
//       sudahDifavoritkan: false,
//     },
//   };

//   document.getElementById("judul").textContent = cerita.judul;
//   document.getElementById("penulis").textContent = cerita.nama_user;
//   document.getElementById("isi").textContent = cerita.deskripsi;
//   document.getElementById("gambar").src = cerita.gambar;

//   // Map
//   const coords = [-6.200000, 106.816666];
//   const map = L.map("map").setView(coords, 5);
//   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: '&copy; OpenStreetMap contributors',
//   }).addTo(map);
//   L.marker(coords).addTo(map).bindPopup(cerita.lokasi).openPopup();

//   // Like
//   const likeBtn = document.getElementById("likeBtn");
//   const likeCount = document.getElementById("likeCount");
//   let liked = cerita.like.sudahDilikeUser;
//   let totalLikes = cerita.like.total;

//   function updateLikeUI() {
//     likeBtn.classList.toggle("liked", liked);
//     likeCount.textContent = totalLikes;
//   }

//   likeBtn.addEventListener("click", () => {
//     liked = !liked;
//     totalLikes += liked ? 1 : -1;
//     updateLikeUI();
//   });

//   updateLikeUI();

//   // Favorit
//   const bookmarkBtn = document.getElementById("bookmarkBtn");
//   const favCount = document.getElementById("favCount");
//   let favorited = cerita.favorit.sudahDifavoritkan;
//   let totalFav = cerita.favorit.total;

//   function updateFavUI() {
//     bookmarkBtn.classList.toggle("favorited", favorited);
//     favCount.textContent = totalFav;
//   }

//   bookmarkBtn.addEventListener("click", () => {
//     favorited = !favorited;
//     totalFav += favorited ? 1 : -1;
//     updateFavUI();
//   });

//   updateFavUI();

//   // Komentar
//   const commentsList = document.getElementById("commentsList");
//   const commentForm = document.getElementById("commentForm");
//   const commentInput = document.getElementById("commentInput");

//   function renderComments() {
//     commentsList.innerHTML = "";
//     if (cerita.komentar.length === 0) {
//       commentsList.innerHTML = "<p>Belum ada komentar.</p>";
//       return;
//     }
//     cerita.komentar.forEach((komentar) => {
//       const div = document.createElement("div");
//       div.className = "comment-item";
//       div.textContent = komentar;
//       commentsList.appendChild(div);
//     });
//   }

//   renderComments();

//   commentForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const newComment = commentInput.value.trim();
//     if (newComment) {
//       cerita.komentar.push(newComment);
//       renderComments();
//       commentInput.value = "";
//     }
//   });
// },
// };

// export default DetailPage;


import detailPresenter from './detail-presenter.js';

const BASE_URL = 'https://ceritanusantara.site/api/auth'; // base url API-mu

const DetailPage = {
  async render() {
    return `
      <section class="detail-container">
        <h2>Detail Cerita</h2>

        <img id="gambar" src="" alt="Gambar Cerita" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" />

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

        <section class="map-wrapper" style="height: 300px;">
          <div id="map" style="width: 100%; height: 100%;"></div>
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
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || 20; // default id kalau gak ada

    const cerita = await detailPresenter.fetchCerita(id);

    if (!cerita) {
      alert('Gagal memuat data cerita');
      return;
    }

    // Set isi konten
    document.getElementById("judul").textContent = cerita.judul;
    document.getElementById("penulis").textContent = cerita.nama_user;
    document.getElementById("isi").textContent = cerita.deskripsi;
    document.getElementById("gambar").src = `${BASE_URL.replace('/api/auth', '')}/uploads/${cerita.gambar}`;
    document.getElementById("gambar").alt = cerita.judul;

    // Map
    // cek koordinat, kalau gak ada default ke Jakarta
    const coords = cerita.lokasi_koordinat || [-6.200000, 106.816666]; 
    const map = L.map("map").setView(coords, 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
    L.marker(coords).addTo(map).bindPopup(cerita.lokasi).openPopup();

    // Like
    const likeBtn = document.getElementById("likeBtn");
    const likeCount = document.getElementById("likeCount");
    let liked = cerita.like?.sudahDilikeUser || false;
    let totalLikes = cerita.like?.total || 0;

    function updateLikeUI() {
      likeBtn.classList.toggle("liked", liked);
      likeCount.textContent = totalLikes;
    }

    likeBtn.addEventListener("click", () => {
      liked = !liked;
      totalLikes += liked ? 1 : -1;
      updateLikeUI();
    });

    updateLikeUI();

    // Favorit
    const bookmarkBtn = document.getElementById("bookmarkBtn");
    const favCount = document.getElementById("favCount");
    let favorited = cerita.favorit?.sudahDifavoritkanUser || false;
    let totalFav = cerita.favorit?.total || 0;

    function updateFavUI() {
      bookmarkBtn.classList.toggle("favorited", favorited);
      favCount.textContent = totalFav;
    }

    bookmarkBtn.addEventListener("click", () => {
      favorited = !favorited;
      totalFav += favorited ? 1 : -1;
      updateFavUI();
    });

    updateFavUI();

    // Komentar
    const commentsList = document.getElementById("commentsList");
    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");

    function renderComments() {
      commentsList.innerHTML = "";
      if (!cerita.komentar || cerita.komentar.length === 0) {
        commentsList.innerHTML = "<p>Belum ada komentar.</p>";
        return;
      }
      cerita.komentar.forEach((komentar) => {
        const div = document.createElement("div");
        div.className = "comment-item";
        // komentar sekarang objek, jadi tampilkan isi_komentar dan username
        div.innerHTML = `
          <strong>${komentar.username}</strong> <small>${new Date(komentar.tanggal).toLocaleString()}</small>
          <p>${komentar.isi_komentar}</p>
        `;
        commentsList.appendChild(div);
      });
    }

    renderComments();

    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newCommentText = commentInput.value.trim();
      if (!newCommentText) return;

      // tambahkan komentar baru sebagai objek sesuai format
      const newComment = {
        id_komentar: Date.now(),
        isi_komentar: newCommentText,
        tanggal: new Date().toISOString(),
        username: 'User' // bisa diganti sesuai user login kalau ada
      };

      cerita.komentar.push(newComment);
      renderComments();
      commentInput.value = "";
    });
  },
};

export default DetailPage;

