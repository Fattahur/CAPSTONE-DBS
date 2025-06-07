import { BASE_URL } from "../api/api";

export default class AddProfileModel {
  // Fungsi untuk mengirimkan data profil pengguna ke API
  async addProfile(formData) {
    try {
      const response = await fetch(`${BASE_URL}/auth/detail-users`, {
        method: 'POST', // Atau 'PUT' jika API mendukung update dengan PUT
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
          data: result.data,  // Data profil yang dikembalikan oleh server
        };
      } else {
        return {
          success: false,
          message: result.message || 'Gagal memperbarui profil',
          data: [],
        };
      }
    } catch (error) {
      console.error('Error:', error);
      return {
        success: false,
        message: error.message || 'Terjadi kesalahan saat memperbarui profil',
        data: [],
      };
    }
  }
}
