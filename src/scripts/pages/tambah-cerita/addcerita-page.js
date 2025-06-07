import { html, render } from 'lit-html';
import AddCeritaPresenter from './addcerita-presenter.js';

const AddCeritaPage = {
  render(container) {
    
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

    AddCeritaPresenter.init();
  }
};

export default AddCeritaPage;
