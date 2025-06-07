// import { html, render } from 'lit-html';

// const AddCeritaPage = {
//   render(container) {
//     // Inject CSS jika belum dimuat
//     if (!document.getElementById('add-story-style')) {
//       const link = document.createElement('link');
//       link.rel = 'stylesheet';
//       link.href = 'src/scripts/pages/add-cerita/add-story-view.css';
//       link.id = 'add-story-style';
//       document.head.appendChild(link);
//     }

//     const template = html`
//       <main class="container_cerita" role="main" aria-label="Tambah Cerita">
//         <h1>Tambah Cerita</h1>
//         <p class="subtitle">
//           Bagikan cerita kamu dengan judul, kategori, deskripsi, lokasi di peta, dan foto.
//         </p>

//         <form id="story-form" novalidate autocomplete="off" aria-describedby="form-instruction">
//           <p id="form-instruction" class="sr-only">
//             Form untuk tambah cerita baru. Isilah judul, pilih kategori, deskripsi, pilih lokasi dengan klik peta, upload gambar atau gunakan kamera, lalu kirim ceritamu.
//           </p>

//           <label for="title">Judul <span aria-hidden="true">*</span></label>
//           <input type="text" id="title" name="title" placeholder="Masukkan judul cerita" required maxlength="100" aria-required="true" aria-describedby="title-error" />
//           <span id="title-error" class="sr-only" aria-live="polite"></span>

//           <label for="category" style="margin-top:2rem;">Kategori / Jenis Cerita <span aria-hidden="true">*</span></label>
//           <select id="category" name="category" required aria-required="true" aria-describedby="category-error">
//             <option value="" disabled selected>Pilih kategori cerita</option>
//             <option value="personal">Personal</option>
//             <option value="travel">Travel</option>
//             <option value="event">Event</option>
//             <option value="education">Education</option>
//             <option value="other">Other</option>
//           </select>
//           <span id="category-error" class="sr-only" aria-live="polite"></span>

//           <label for="description" style="margin-top:2rem;">Deskripsi <span aria-hidden="true">*</span></label>
//           <textarea id="description" name="description" placeholder="Tulis deskripsi cerita kamu..." rows="7" required maxlength="1000" aria-required="true" aria-describedby="desc-error"></textarea>
//           <span id="desc-error" class="sr-only" aria-live="polite"></span>

//           <label for="map-container" style="margin-top:2rem;">Lokasi <span aria-hidden="true">*</span></label>
//           <div id="map-container" tabindex="0" aria-label="Peta lokasi cerita" role="region" aria-describedby="map-desc">
//             <div id="map"></div>
//           </div>
//           <p id="map-desc" class="sr-only">Peta interaktif: klik peta untuk memilih lokasi cerita kamu.</p>

//           <div class="upload-camera-container" style="margin-top:1.5rem;">
//             <input type="file" id="file-upload" accept="image/*" style="display:none" aria-hidden="true" />
//             <button type="button" id="upload-img-btn" aria-label="Upload gambar">Upload Gambar</button>
//             <button type="button" id="start-camera-btn" aria-label="Gunakan kamera">Gunakan Kamera</button>
//             <button type="button" id="cancel-camera-btn" class="btn-cancel" aria-label="Batalkan kamera">Batalkan</button>
//           </div>

//           <div id="camera-preview-container">
//             <video id="camera-preview" autoplay playsinline></video>
//           </div>

//           <img id="image-preview" alt="Preview gambar yang diunggah" />

//           <div class="form-actions">
//             <button type="submit">Kirim Cerita</button>
//             <button type="reset" class="btn-cancel">Batal</button>
//           </div>
//         </form>
//       </main>
//     `;

//     render(template, container);
//   },
// };

// export default AddCeritaPage;


import { html, render } from 'lit-html';
import AddCeritaPresenter from './addcerita-presenter.js';

const AddCeritaPage = {
  render(container) {
    // Inject CSS jika belum
    if (!document.getElementById('add-story-style')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'src/scripts/pages/add-cerita/add-story-view.css';
      link.id = 'add-story-style';
      document.head.appendChild(link);
    }

    const template = html`
      <main class="container_cerita" role="main" aria-label="Tambah Cerita">
        <h1>Tambah Cerita</h1>
        <p class="subtitle">
          Bagikan cerita kamu dengan judul, kategori, deskripsi, lokasi di peta, dan foto.
        </p>

        <form id="story-form" novalidate autocomplete="off">
          <label for="title">Judul Cerita</label>
          <input type="text" id="title" name="title" required />

          <label for="category">Kategori</label>
          <select id="category" name="category" required>
            <option value="">Pilih kategori</option>
            <option value="sejarah">Sejarah</option>
            <option value="budaya">Budaya</option>
            <option value="lokal">Lokal</option>
          </select>

          <label for="description">Deskripsi</label>
          <textarea id="description" name="description" rows="5" required></textarea>

          <div id="upload-container">
            <button type="button" id="upload-img-btn">Upload Gambar</button>
            <input type="file" id="file-upload" accept="image/*" style="display: none;" />
          </div>

          <div id="camera-preview-container">
            <button type="button" id="start-camera-btn">Aktifkan Kamera</button>
            <button type="button" id="cancel-camera-btn" style="display: none;">Batal Kamera</button>
            <button type="button" id="capture-btn" style="display: none;">Ambil Foto</button>
            <video id="camera-preview" autoplay playsinline style="display: none;"></video>
          </div>

          <img id="image-preview" alt="Preview Gambar" style="display: none; max-width: 100%; margin-top: 10px;" />

          <div id="map-container" style="margin-top: 20px;">
            <h3>Pilih Lokasi</h3>
            <div id="map" style="width: 100%; height: 200px; background: #ccc; cursor: pointer;">
              Klik untuk memilih lokasi
            </div>
          </div>

          <button type="submit">Kirim Cerita</button>
        </form>
      </main>
    `;

    render(template, container);

    // Inisialisasi presenter setelah elemen sudah dirender
    AddCeritaPresenter.init();
  }
};

export default AddCeritaPage;
