// import { BASE_URL } from '../api/api.js';

// export default class TambahCeritaModel {
//   static async kirimCerita(data) {
//     const formData = new FormData();

//     formData.append('user_id', data.user_id);
//     formData.append('judul', data.judul);
//     formData.append('deskripsi', data.deskripsi);
//     formData.append('lokasi', data.lokasi);
//     formData.append('kategori', data.kategori);

//     if (data.img) {
//       formData.append('img', data.img);
//     }

//     try {
// const response = await fetch('https://ceritanusantara.site/api/auth/tambah-cerita', {
//   method: 'POST',
//   body: formData,
// });


//       const contentType = response.headers.get('content-type');

//       if (!response.ok) {
//         const text = await response.text();
//         console.error('Unexpected response:', text);

//         if (contentType && contentType.includes('application/json')) {
//           const error = JSON.parse(text);
//           throw new Error(error.message || 'Gagal mengirim cerita');
//         } else {
//           throw new Error('Gagal mengirim cerita: Server tidak mengembalikan JSON.');
//         }
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Error in TambahCeritaModel:', error);
//       throw error;
//     }
//   }
// }





// import { BASE_URL } from '../api/api.js';

// export default class TambahCeritaModel {
//   static async kirimCerita(data) {
//     const formData = new FormData();

//     formData.append('user_id', data.user_id);
//     formData.append('judul', data.judul);
//     formData.append('deskripsi', data.deskripsi);
//     formData.append('lokasi', data.lokasi);
//     formData.append('kategori', data.kategori);

//     if (data.img) {
//       formData.append('img', data.img, data.img.name || 'image.jpg');
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/tambah-cerita`, {

//         method: 'POST',
//         body: formData,
//         // Jika membutuhkan auth token
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
//         }
//       });

//       // Handle non-JSON responses
//       const text = await response.text();
//       let result;
      
//       try {
//         result = text ? JSON.parse(text) : {};
//       } catch (e) {
//         console.error('Failed to parse JSON:', text);
//         throw new Error('Invalid server response');
//       }

//       if (!response.ok) {
//         throw new Error(result.message || 'Gagal mengirim cerita');
//       }

//       return result;
//     } catch (error) {
//       console.error('Error in TambahCeritaModel:', error);
//       throw error;
//     }
//   }
// }


import { BASE_URL } from '../api/api.js';

export default class TambahCeritaModel {
  static async kirimCerita(data) {
    // Validasi data wajib
    if (!data.judul || !data.deskripsi || !data.lokasi || !data.kategori) {
      throw new Error('Data cerita tidak lengkap');
    }

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Sesi tidak ditemukan. Silakan login terlebih dahulu.');
    }

    const formData = new FormData();

    // Tambahkan data ke FormData (tanpa user_id, karena ambil dari token di backend)
    formData.append('judul', data.judul);
    formData.append('deskripsi', data.deskripsi);
    formData.append('lokasi', data.lokasi);
    formData.append('kategori', data.kategori);

    // Tambahkan file gambar jika ada
    if (data.img) {
      if (!(data.img instanceof File || data.img instanceof Blob)) {
        throw new Error('Format gambar tidak valid');
      }
      formData.append('img', data.img, data.img.name || 'image.jpg');
    }

    // Debugging: log isi FormData
    console.log('[DEBUG] FormData:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? `File[${value.name}]` : value);
    }

    try {
      const response = await fetch(`${BASE_URL}/tambah-cerita`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
          // Jangan set Content-Type secara manual untuk FormData
        },
      });

      const rawText = await response.text();
      let responseData;

      try {
        responseData = rawText ? JSON.parse(rawText) : {};
      } catch (err) {
        throw new Error('Format response dari server tidak valid.');
      }

      if (!response.ok) {
        const msg = responseData.message || 'Gagal menambah cerita';
        throw new Error(msg);
      }

      console.log('[DEBUG] Cerita berhasil dikirim:', responseData);
      return responseData;

    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Tidak dapat terhubung ke server. Cek koneksi internet Anda.');
      } else if (error.message.includes('401')) {
        throw new Error('Sesi Anda sudah habis. Silakan login ulang.');
      } else {
        throw error;
      }
    }
  }
}
