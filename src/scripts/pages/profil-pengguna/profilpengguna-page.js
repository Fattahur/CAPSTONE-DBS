import { html, render } from 'lit-html';

const ProfilPenggunaPage = {
  name: '',
  dob: '',
  gender: '',
  email: '',
  profileImage: '', // Menambahkan properti untuk gambar profil

  handleSubmit(e) {
    e.preventDefault();

    if (!this.name || !this.dob || !this.gender || !this.email) {
      alert("Semua kolom harus diisi!");
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('dob', this.dob);
    formData.append('gender', this.gender);
    formData.append('email', this.email);
    if (this.profileImage) {
      formData.append('profileImage', this.profileImage);
    }

    // Memanggil fungsi untuk menyimpan data ke database
    this.saveDataToDatabase(formData); // Pastikan fungsi ini ada dalam objek ini
  },

  // Pastikan saveDataToDatabase menggunakan function yang tepat dengan konteks `this`
  async saveDataToDatabase(formData) {
    try {
      const response = await fetch('/api/saveProfile', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('Profil berhasil disimpan!');
      } else {
        alert('Gagal menyimpan profil.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan, coba lagi.');
    }
  },

  handleReset() {
    this.name = '';
    this.dob = '';
    this.gender = '';
    this.email = '';
    this.profileImage = ''; // Reset gambar profil
  },

  handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {  // Menggunakan arrow function
        this.profileImage = reader.result;  // Update gambar profil
        this.render();  // Memanggil render ulang agar gambar diperbarui
      };
      reader.readAsDataURL(file);
    }
  },

  render(container) {
    const template = html`
      <div class="profil-container">
        <div class="profil-content">
          <h1>Edit Profil Anda</h1>
          <div class="profile-img-container">
            <img src="images/profile.png" alt="Foto Profil" class="profile-img" id="profileBtn" />
          </div>
          <form @submit="${this.handleSubmit.bind(this)}">
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

            <div class="form-group">
              <label for="profileImage">Gambar Profil</label>
              <div class="profile-image-container">
                ${this.profileImage ? html`<img src="${this.profileImage}" alt="Profile Image" class="profile-image" />` : ''}
              </div>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                @change="${this.handleImageChange}"
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
};

export default ProfilPenggunaPage;
