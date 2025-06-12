import { html, render } from 'lit-html';
import ProfilPenggunaPresenter from './profilpengguna-presenter.js';

const ProfilPenggunaPage = {
  render(container) {
    const template = html`
      <main class="container-profil" role="main" aria-label="Edit Profil">
        <h1>Edit Profil Anda</h1>

        <form id="profil-form" novalidate autocomplete="off" enctype="multipart/form-data">
          <label for="full-name">Nama Lengkap</label>
          <input type="text" id="full-name" name="full-name" placeholder="Masukkan Nama Lengkap" required />

          <label for="birth-date">Tanggal Lahir</label>
          <input type="date" id="birth-date" name="birth-date" required />

          <label for="gender">Gender</label>
          <select id="gender" name="gender" required>
            <option value="">Pilih Gender</option>
            <option value="L">L</option>
            <option value="P">P</option>
          </select>

          <label for="phone">No Telepon</label>
          <input type="tel" id="phone" name="phone" placeholder="Masukkan No Telepon" required />

          <label for="address">Alamat</label>
          <textarea id="address" name="address" placeholder="Masukkan Alamat" required></textarea>

          <label for="profile-image">Gambar Profil</label>
          <input type="file" id="profile-image" name="profile-image" accept="image/*" />

          <button type="submit">Simpan</button>
          <button type="reset">Reset</button>
        </form>
      </main>
    `;

    render(template, container);
    ProfilPenggunaPresenter.init();
  }
};

export default ProfilPenggunaPage;

