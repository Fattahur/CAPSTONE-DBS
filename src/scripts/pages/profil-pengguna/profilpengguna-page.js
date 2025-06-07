import { html, render } from 'lit-html';

const ProfilPenggunaPage = {
  name: '',
  dob: '',
  gender: '',
  email: '',

  handleSubmit(e) {
    e.preventDefault();
    console.log({ name: this.name, dob: this.dob, gender: this.gender, email: this.email });
  },

  render(container) {
    const template = html`

      <div class="profil-container">
        <!-- Profil Content -->
        <div class="profil-content">
          <h1>Edit Profil Anda</h1>
          <form @submit="${this.handleSubmit}">
            <div class="form-group">
              <label for="name">Nama</label>
              <input
                id="name"
                type="text"
                placeholder="Masukkan Nama"
                .value="${this.name}"
                @input="${(e) => { this.name = e.target.value }}"
              />
            </div>

            <div class="form-group">
              <label for="dob">Tanggal Lahir</label>
              <input
                id="dob"
                type="date"
                .value="${this.dob}"
                @input="${(e) => { this.dob = e.target.value }}"
              />
            </div>

            <div class="form-group">
              <label for="gender">Gender</label>
              <select
                id="gender"
                .value="${this.gender}"
                @change="${(e) => { this.gender = e.target.value }}"
              >
                <option value="">Pilih Gender</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Masukkan Email"
                .value="${this.email}"
                @input="${(e) => { this.email = e.target.value }}"
              />
            </div>

            <button type="submit" class="submit-btn">Simpan</button>
          </form>
        </div>
      </div>
    `;

    render(template, container);
  },
};

export default ProfilPenggunaPage;
