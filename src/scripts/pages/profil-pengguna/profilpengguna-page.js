import { html, render } from 'lit-html';
import ProfilPenggunaPresenter from '../profil-pengguna/profilpengguna-presenter';  // Import Presenter

const ProfilPenggunaPage = {
  name: '',
  dob: '',
  gender: '',
  phoneNumber: '',
  address: '',
  profileImage: '',

  // Fungsi untuk menginisialisasi presenter
  setPresenter(presenter) {
    this.presenter = presenter;
  },

  // Fungsi render untuk menampilkan halaman
  render(container) {
    const template = html`
      <div class="profil-container">
        <div class="profil-content">
          <h1>Edit Profil Anda</h1>
          <div class="profile-img-container">
            <img src="${this.profileImage || 'https://example.com/foto.jpg'}" alt="Foto Profil" class="profile-img" id="profileBtn" />
          </div>
          <form @submit="${(e) => this.handleSubmit(e)}">
            <div class="form-group">
              <label for="name">Nama Lengkap</label>
              <input
                id="name"
                type="text"
                placeholder="Masukkan Nama Lengkap"
                .value="${this.name}"
                @input="${(e) => this.name = e.target.value}"
              />
            </div>

            <div class="form-group">
              <label for="dob">Tanggal Lahir</label>
              <input
                id="dob"
                type="date"
                .value="${this.dob}"
                @input="${(e) => this.dob = e.target.value}"
              />
            </div>

            <div class="form-group">
              <label for="gender">Gender</label>
              <select
                id="gender"
                .value="${this.gender}"
                @change="${(e) => this.gender = e.target.value}"
              >
                <option value="">Pilih Gender</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>

            <div class="form-group">
              <label for="phoneNumber">No Telepon</label>
              <input
                id="phoneNumber"
                type="text"
                placeholder="Masukkan No Telepon"
                .value="${this.phoneNumber}"
                @input="${(e) => this.phoneNumber = e.target.value}"
              />
            </div>

            <div class="form-group">
              <label for="address">Alamat</label>
              <input
                id="address"
                type="text"
                placeholder="Masukkan Alamat"
                .value="${this.address}"
                @input="${(e) => this.address = e.target.value}"
              />
            </div>

            <div class="form-group">
              <label for="profileImage">Gambar Profil</label>
              <div class="profile-image-container">
                ${this.profileImage ? html`<img src="${this.profileImage}" alt="Profile Image" class="profile-image" />` : ''}
              </div>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                @change="${(e) => this.handleImageChange(e)}"
                class="profile-file-input"
              />
            </div>

            <button type="submit" class="submit-btn">Simpan</button>
            <button type="button" @click="${this.handleReset}" class="reset-btn">Reset</button>
          </form>
        </div>
      </div>
    `;
    render(template, container);
  },

  // Handle submit form
  handleSubmit(e) {
    e.preventDefault();
    this.presenter.handleSubmit(e, this.name, this.dob, this.gender, this.phoneNumber, this.address, this.profileImage);
  },

  // Reset form
  handleReset() {
    this.presenter.handleReset();
  },

  // Handle image change (upload image)
  handleImageChange(e) {
    this.presenter.handleImageChange(e);
  }
};

export default ProfilPenggunaPage;
