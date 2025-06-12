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

    // ✅ Panggil untuk mengisi data awal
    await this._loadProfile();
  },

  _bindEvents() {
    this._form.addEventListener('submit', (e) => this._handleSubmit(e));
    this._form.addEventListener('reset', () => this._resetForm());
  },

  // Method untuk memuat data profil
  async _loadProfile() {
    try {
      const userId = localStorage.getItem('user_id') || '5'; // fallback id
      const model = new AddProfileModel();
      const result = await model.getProfile(userId);

      if (result.success && result.data) {
        const data = result.data;
        this._fullName.value = data.nama_lengkap || '';
        this._birthDate.value = data.tanggal_lahir || '';
        this._gender.value = data.jenis_kelamin || '';
        this._phone.value = data.no_telepon || '';
        this._address.value = data.alamat || '';

        // Jika ingin tampilkan gambar preview
        if (data.photo_profile) {
          const imgEl = document.querySelector('.profile-img');
          if (imgEl) {
            imgEl.src = `${BASE_URL}/path-to-images/${data.photo_profile}`; // sesuaikan dengan path kamu
          }
        }
      } else {
        console.warn('[WARN] Gagal memuat profil:', result.message);
      }
    } catch (error) {
      console.error('❌ Error saat load profil:', error);
    }
  },

  // Method untuk menangani submit form
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

      const addProfileModel = new AddProfileModel();
      const response = await addProfileModel.addProfile(formData);

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
