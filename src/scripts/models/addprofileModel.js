
import { BASE_URL } from "../api/api";

export default class AddProfileModel {
  // Fungsi untuk mengirimkan data profil pengguna ke API
  async addProfile(formData) {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${BASE_URL}/detail-users`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Menggunakan token dari localStorage
        },
      });
      
      
      const result = await response.json();
      
      // Memeriksa apakah request berhasil
      if (response.ok) {
        return {
          success: true,
          message: 'Profil berhasil diperbarui!',
          data: result.data,
        };
      } else {
        return {
          success: false,
          message: result.message || 'Gagal memperbarui profil',
          data: [],
        };
      }
    } catch (error) {
      console.error('❌ Error saat mengirim profil:', error);
      return {
        success: false,
        message: error.message || 'Terjadi kesalahan saat memperbarui profil',
        data: [],
      };
    }
  }

  // Method GET untuk mendapatkan data profil
  async getProfile(userId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/detail-users/${userId}`, {
        method: 'GET',
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
      });

      const result = await response.json();

      if (response.ok && result.data) {
        return {
          success: true,
          data: result.data
        };
      } else {
        return {
          success: false,
          message: result.message || 'Gagal mengambil data profil',
          data: null
        };
      }
    } catch (error) {
      console.error('❌ Error saat mengambil data profil:', error);
      return {
        success: false,
        message: error.message || 'Terjadi kesalahan saat mengambil data',
        data: null
      };
    }
  }
}
