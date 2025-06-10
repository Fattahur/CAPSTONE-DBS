import AddProfileModel from '../../models/addprofileModel.js';  // Pastikan pathnya benar

const ProfilPenggunaPresenter = {
  async init() {
    this._form = document.getElementById('profil-form');
    this._fullName = document.getElementById('full-name');
    this._birthDate = document.getElementById('birth-date');
    this._gender = document.getElementById('gender');
    this._phone = document.getElementById('phone');
    this._address = document.getElementById('address');
    this._profileImage = document.getElementById('profile-image');
    this._submitBtn = this._form.querySelector('button[type="submit"]');
    this._resetBtn = this._form.querySelector('button[type="reset"]');

    this._bindEvents();
  },

  _bindEvents() {
    this._form.addEventListener('submit', (e) => this._handleSubmit(e));
    this._form.addEventListener('reset', () => this._resetForm());
  },

  async _handleSubmit(e) {
    e.preventDefault();

    this._submitBtn.disabled = true;
    this._submitBtn.textContent = 'Menyimpan...';

    try {
      const fullName = this._fullName.value.trim();
      const birthDate = this._birthDate.value;
      const gender = this._gender.value;
      const phone = this._phone.value.trim();
      const address = this._address.value.trim();
      const profileImage = this._profileImage.files[0];  // Ambil file gambar jika ada

      if (!fullName || !birthDate || !gender || !phone || !address) {
        throw new Error('Semua kolom harus diisi');
      }

      // Menyusun data menggunakan FormData (terutama untuk gambar)
      const formData = new FormData();
      formData.append('full_name', fullName);
      formData.append('birth_date', birthDate);
      formData.append('gender', gender);
      formData.append('phone', phone);
      formData.append('address', address);
      
      if (profileImage) {
        formData.append('profile_image', profileImage);  // Menambahkan file gambar jika ada
      }

      // Membuat instansi dari AddProfileModel
      const addProfileModel = new AddProfileModel();
      
      // Mengirim data menggunakan addProfile dari instansi AddProfileModel
      const response = await addProfileModel.addProfile(formData);

      if (response.success) {
        alert('Profil berhasil diperbarui!');
      } else {
        alert(response.message);
      }

      this._resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Gagal memperbarui profil');
    } finally {
      this._submitBtn.disabled = false;
      this._submitBtn.textContent = 'Simpan';
    }
  },

  _resetForm() {
    this._form.reset();
  }
};

export default ProfilPenggunaPresenter;
