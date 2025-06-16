import { html, render } from 'lit';

import AddCeritaPresenter from './addcerita-presenter.js';

const AddCeritaPage = {
  render(container) {
    
    const template = html`
  <main class="container_cerita" role="main" aria-label="Tambah Cerita">
    <h1>Tambah Cerita</h1>
    <p class="subtitle">
      Bagikan cerita kamu dengan judul, kategori, deskripsi, lokasi di peta, dan foto.
    </p>

    <form id="story-form" novalidate autocomplete="off">
      <div class="form-group">
        <label for="title">Judul Cerita</label>
        <input type="text" id="title" name="title" required />
      </div>

      <div class="form-group">
        <label for="category">Kategori</label>
        <select id="category" name="category" required>
          <option value="">Pilih kategori</option>
          <option value="legenda">Legenda</option>
          <option value="mitos">Mitos</option>
          <option value="fabel">Fabel</option>
          <option value="dongeng">Dongeng</option>
        </select>
      </div>

      <div class="form-group">
        <label for="description">Deskripsi</label>
        <textarea id="description" name="description" rows="5" required></textarea>
      </div>

      <div class="form-group" id="upload-container">
        <button type="button" id="upload-img-btn">Upload Gambar</button>
        <input type="file" id="file-upload" accept="image/*" style="display: none;" />
      </div>

      <div class="form-group" id="camera-preview-container">
        <button type="button" id="start-camera-btn">Aktifkan Kamera</button>
        <button type="button" id="cancel-camera-btn" style="display: none;">Batal Kamera</button>
        <button type="button" id="capture-btn" style="display: none;">Ambil Foto</button>
        <video id="camera-preview" autoplay playsinline style="display: none;"></video>
      </div>

      <img id="image-preview" alt="Preview Gambar" style="display: none;" />
      <div class="form-group" id="map-container">
        
        <div id="map">Klik untuk memilih lokasi</div>
      </div>

      <div class="form-group">
        <button type="submit">Kirim Cerita</button>
      </div>
    </form>
  </main>
`;


    render(template, container);

    AddCeritaPresenter.init();
  }
};

export default AddCeritaPage;
