import { html, render } from 'lit-html';
import ProfilPenggunaPresenter from './profilpengguna-presenter.js';

const ProfilPenggunaPage = {
  render(container) {
    if (!document.getElementById('profil-pengguna-style')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'src/scripts/pages/profilpengguna/profilpengguna-view.css';
      link.id = 'profil-pengguna-style';
      document.head.appendChild(link);
    }

    const template = html`
      <main class="container-profil" role="main" aria-label="Edit Profil">
        <h1>Edit Profil Anda</h1>
        
        <form id="profil-form" novalidate autocomplete="off">
          <label for="full-name">Nama Lengkap</label>
          <input type="text" id="full-name" name="full-name" placeholder="Masukkan Nama Lengkap" required />

          <label for="birth-date">Tanggal Lahir</label>
          <input type="date" id="birth-date" name="birth-date" required />

          <label for="gender">Gender</label>
          <select id="gender" name="gender" required>
            <option value="">Pilih Gender</option>
            <option value="male">Laki-Laki</option>
            <option value="female">Perempuan</option>
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

    // Inisialisasi presenter setelah render
    ProfilPenggunaPresenter.init();
  }
};

export default ProfilPenggunaPage;
