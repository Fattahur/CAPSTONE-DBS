
import AddProfileModel from '../../models/addprofileModel.js';
import { BASE_URL, BASE_IMAGE_URL } from '../../api/api.js';

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

    this._isExistingProfile = false;
    this._bindEvents();
    await this._loadProfile();
    this._toggleSubmitButton();
  },

  _bindEvents() {
    this._form.addEventListener('submit', (e) => this._handleSubmit(e));
    this._form.addEventListener('reset', () => this._resetForm());
  },

  _toggleSubmitButton() {
    this._submitBtn.textContent = this._isExistingProfile ? 'Update' : 'Tambah';
  },

  async _loadProfile() {
    try {
      const userId = localStorage.getItem('user_id') || '5';
      const model = new AddProfileModel();
      const result = await model.getProfile(userId);

      if (result.success && result.data) {
        const data = result.data;

        this._fullName.value = data.nama_lengkap || '';
        this._birthDate.value = data.tanggal_lahir
          ? new Date(data.tanggal_lahir).toISOString().split('T')[0]
          : '';
        this._gender.value = data.jenis_kelamin || '';
        this._phone.value = data.no_telepon || '';
        this._address.value = data.alamat || '';

        const imgEl = document.getElementById('profile-preview');

        if (data.photo_profile && imgEl) {
          const photoUrl = `${BASE_IMAGE_URL}/${data.photo_profile}`;
          console.log('📸 Setting foto profil ke:', photoUrl);
          imgEl.src = photoUrl;

          // 🔁 Tambahkan fallback jika gagal load foto
          imgEl.onerror = () => {
            console.warn('❌ Gagal memuat foto, fallback ke default-user.png');
            imgEl.src = '/default_profile.png';
          };
        }

        this._isExistingProfile = true;
      } else {
        console.warn('[WARN] Gagal memuat profil:', result.message);
        this._isExistingProfile = false;
      }
    } catch (error) {
      console.error('❌ Error saat load profil:', error);
      alert('❌ Gagal mengambil data profil. Cek koneksi atau server.');
    }
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

      const model = new AddProfileModel();
      let response;

      if (this._isExistingProfile) {
        response = await model.updateProfile(formData);
      } else {
        response = await model.addProfile(formData);
      }

      if (response && response.success) {
        alert('✅ Profil berhasil disimpan!');

        // ⏳ Delay sedikit sebelum load ulang profil (untuk pastikan data siap)
        await new Promise(resolve => setTimeout(resolve, 500));
        await this._loadProfile();
        this._toggleSubmitButton();
      } else {
        console.warn('[WARN] Gagal menyimpan data:', response.message);
        alert(response.message || '⚠️ Gagal menyimpan data.');
      }
    } catch (error) {
      console.error('❌ Error saat menyimpan profil:', error);
      alert(error.message || '❌ Terjadi kesalahan saat mengirim data');
    } finally {
      this._submitBtn.disabled = false;
      this._toggleSubmitButton();
    }
  },

  _resetForm() {
    this._form.reset();
  }
};

export default ProfilPenggunaPresenter;
