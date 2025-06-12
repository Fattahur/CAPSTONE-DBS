import AddProfileModel from '../../models/addprofileModel.js';

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
      const gender = this._gender.value.toUpperCase();
      const phone = this._phone.value.trim();
      const address = this._address.value.trim();
      const profileImage = this._profileImage.files[0];

      console.log('[DEBUG] Data input:', { fullName, birthDate, gender, phone, address, profileImage });

      if (!fullName || !birthDate || !gender || !phone || !address) {
        throw new Error('❌ Semua kolom harus diisi');
      }

      if (!['L', 'P'].includes(gender)) {
        throw new Error("❌ Jenis kelamin harus 'L' atau 'P'");
      }

      const userId = localStorage.getItem('user_id') || '5';

      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('nama_lengkap', fullName);
      formData.append('tanggal_lahir', birthDate);
      formData.append('jenis_kelamin', gender);
      formData.append('no_telepon', phone);
      formData.append('alamat', address);
      formData.append('status_aktif', '1');

      if (profileImage) {
        formData.append('photo_profile', profileImage);
      }

      console.group('[DEBUG] Data FormData yang dikirim');
      for (const [key, val] of formData.entries()) {
        console.log(`${key}:`, val);
      }
      console.groupEnd();

      const addProfileModel = new AddProfileModel();
      const response = await addProfileModel.addProfile(formData);

      console.log('[DEBUG] Response dari server:', response);

      if (response && response.success) {
        alert('✅ Profil berhasil diperbarui!');
        this._resetForm();
      } else {
        console.warn('[WARN] Gagal menyimpan data:', response.message);
        alert(response.message || '⚠️ Gagal menyimpan data.');
      }
    } catch (error) {
      console.error('❌ Error saat menyimpan profil:', error);
      alert(error.message || '❌ Terjadi kesalahan saat mengirim data');
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
