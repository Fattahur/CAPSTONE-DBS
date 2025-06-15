
// import { BASE_URL } from "../api/api";

// export default class AddProfileModel {
//   // Fungsi untuk mengirimkan data profil pengguna ke API
//   async addProfile(formData) {
//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch(`${BASE_URL}/detail-users`, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`, // Menggunakan token dari localStorage
//         },
//       });
      
      
//       const result = await response.json();
      
//       // Memeriksa apakah request berhasil
//       if (response.ok) {
//         return {
//           success: true,
//           message: 'Profil berhasil diperbarui!',
//           data: result.data,
//         };
//       } else {
//         return {
//           success: false,
//           message: result.message || 'Gagal memperbarui profil',
//           data: [],
//         };
//       }
//     } catch (error) {
//       console.error('❌ Error saat mengirim profil:', error);
//       return {
//         success: false,
//         message: error.message || 'Terjadi kesalahan saat memperbarui profil',
//         data: [],
//       };
//     }
//   }

//   // Method GET untuk mendapatkan data profil
// async getProfile(userId) {
//   try {
//     const token = localStorage.getItem('token');

//     const response = await fetch(`${BASE_URL}/detail-users/${userId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         ...(token && { 'Authorization': `Bearer ${token}` }),
//       }
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       return {
//         success: false,
//         message: result.message || 'Gagal mengambil data profil',
//         data: null
//       };
//     }

//     // Jika hasilnya langsung berupa objek (bukan di dalam result.data)
//     const profile = result.data || result;

//     return {
//       success: true,
//       data: {
//         id: profile.id,
//         user_id: profile.user_id,
//         nama_lengkap: profile.nama_lengkap,
//         photo_profile: profile.photo_profile,
//         no_telepon: profile.no_telepon,
//         alamat: profile.alamat,
//         tanggal_lahir: profile.tanggal_lahir,
//         jenis_kelamin: profile.jenis_kelamin,
//         status_aktif: profile.status_aktif,
//         updated_at: profile.updated_at,
//       }
//     };
//   } catch (error) {
//     console.error('❌ Error saat mengambil data profil:', error);
//     return {
//       success: false,
//       message: error.message || 'Terjadi kesalahan saat mengambil data',
//       data: null
//     };
//   }
// }

// }





import { BASE_URL } from "../api/api";

export default class AddProfileModel {
  // Fungsi POST: Menambahkan detail profil pengguna
  async addProfile(formData) {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${BASE_URL}/detail-users`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Profil berhasil ditambahkan!',
          data: result.data,
        };
      } else {
        return {
          success: false,
          message: result.message || 'Gagal menambahkan profil',
          data: [],
        };
      }
    } catch (error) {
      console.error('❌ Error saat mengirim profil:', error);
      return {
        success: false,
        message: error.message || 'Terjadi kesalahan saat mengirim profil',
        data: [],
      };
    }
  }

  // Fungsi PUT: Mengupdate detail profil pengguna
  async updateProfile(formData) {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${BASE_URL}/detail-users`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: result.message || 'Profil berhasil diperbarui!',
          data: result.data || null,
        };
      } else {
        return {
          success: false,
          message: result.message || 'Gagal memperbarui profil',
          data: [],
        };
      }
    } catch (error) {
      console.error('❌ Error saat mengupdate profil:', error);
      return {
        success: false,
        message: error.message || 'Terjadi kesalahan saat memperbarui profil',
        data: [],
      };
    }
  }

  // Fungsi GET: Mengambil detail profil pengguna
  async getProfile(userId) {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${BASE_URL}/detail-users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        }
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Gagal mengambil data profil',
          data: null
        };
      }

      const profile = result.data || result;

      return {
        success: true,
        data: {
          id: profile.id,
          user_id: profile.user_id,
          nama_lengkap: profile.nama_lengkap,
          photo_profile: profile.photo_profile,
          no_telepon: profile.no_telepon,
          alamat: profile.alamat,
          tanggal_lahir: profile.tanggal_lahir,
          jenis_kelamin: profile.jenis_kelamin,
          status_aktif: profile.status_aktif,
          updated_at: profile.updated_at,
        }
      };
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

