import { BASE_URL } from "../api/api";

export default class AddProfileModel {
  // Method POST untuk mengupdate profil
  async addProfile(formData) {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${BASE_URL}/detail-users`, {
        method: 'POST',
        body: formData,
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
      });

      const contentType = response.headers.get('content-type');
      let result;

      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server tidak mengembalikan JSON:\n${text}`);
      }

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
