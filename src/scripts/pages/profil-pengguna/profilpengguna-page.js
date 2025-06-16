
import { html, render } from 'lit';

import ProfilPenggunaPresenter from './profilpengguna-presenter.js';

const ProfilPenggunaPage = {
  render(container) {
    const template = html`
      <main class="profil-container" role="main" aria-label="Edit Profil">

        <div class="profile-image-container">
          <img src="images/default_profile.png" alt="Foto Profil" id="profile-preview" />
        </div>
        

        <p style="text-align: center; margin-bottom: 20px;">*foto</p>

        <form id="profil-form" novalidate autocomplete="off" enctype="multipart/form-data">
          <div class="form-group">
            <label for="full-name">Nama Lengkap</label>
            <input type="text" id="full-name" name="full-name" placeholder="Masukkan Nama Lengkap" required />
          </div>

          <div class="form-group">
            <label for="birth-date">Tanggal Lahir</label>
            <input type="date" id="birth-date" name="birth-date" placeholder="dd/mm/yyyy" required />
          </div>

          <div class="form-group">
            <label for="gender">Gender</label>
            <select id="gender" name="gender" required>
              <option value="">Pilih Gender</option>
              <option value="L">L</option>
              <option value="P">P</option>
            </select>
          </div>

          <div class="form-group">
            <label for="phone">No Telepon</label>
            <input type="tel" id="phone" name="phone" placeholder="Masukkan No Telepon" required />
          </div>

          <div class="form-group">
            <label for="address">Alamat</label>
            <input type="text" id="address" name="address" placeholder="Masukkan Alamat" required />
          </div>

          <div class="form-group">
            <label for="profile-image">Gambar Profil</label>
            <input type="file" id="profile-image" name="profile-image" accept="image/*" class="profile-file-input" />
          </div>

          <button type="submit" class="submit-btn">Simpan</button>
          <button type="reset" class="reset-btn">Reset</button>
        </form>
      </main>
    `;

    render(template, container);

    // Jalankan presenter setelah rendering selesai
    ProfilPenggunaPresenter.init();
  }
};

export default ProfilPenggunaPage;
