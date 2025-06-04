
import { putAccessToken, putUser } from '../utils/auth.js';

// const BASE_URL = 'https://story-api.dicoding.dev/v1';

const BASE_URL = 'https://1ce4-203-29-27-134.ngrok-free.app/api/auth';

export const authService = {
  async register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name, // FIXED! Ubah `name` jadi `username`
        email,
        password,
      }),
    });

    const responseJson = await response.json();

    if (!response.ok || responseJson.error) {
      throw new Error(responseJson.message || 'Registrasi gagal');
    }

    return {
      success: true,
      message: responseJson.message,
    };
  },

  async login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (!response.ok || !responseJson.token) {
      console.error('Login error:', responseJson);
      throw new Error(responseJson.message || 'Login gagal');
    }

    // Simpan token & user (gunakan fungsi yang kamu punya)
    putAccessToken(responseJson.token);
    putUser({ email }); // kamu bisa ambil lebih banyak info dari response jika disediakan

    return {
      success: true,
      data: {
        token: responseJson.token,
        email,
      },
    };
  },

  async forgotPassword(email) {
    const response = await fetch(`${BASE_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const responseJson = await response.json();
    if (!response.ok) throw new Error(responseJson.message);
    return responseJson;
  },

  async resetPassword({ email, password }) {
    const response = await fetch(`${BASE_URL}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    if (!response.ok) throw new Error(responseJson.message);
    return responseJson;
  },

  async createDetailUser(data) {
    const response = await fetch(`${BASE_URL}/detail-users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async getDetailUser(user_id) {
    const response = await fetch(`${BASE_URL}/detail-users/${user_id}`);
    return await response.json();
  },

  async updateDetailUser(user_id, data) {
    const response = await fetch(`${BASE_URL}/detail-users/${user_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async tambahCerita({ token, img, ...data }) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    formData.append('img', img);

    const response = await fetch(`${BASE_URL}/tambah-cerita`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return await response.json();
  },

  async updateStatusCerita(id, status) {
    const response = await fetch(`${BASE_URL}/cerita/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return await response.json();
  },

  async getWaitingListWithCerita() {
    const response = await fetch(`${BASE_URL}/waiting-list`);
    return await response.json();
  },

  async simpanAnalisisCerita(data) {
    const response = await fetch(`${BASE_URL}/analisis-cerita`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async likeCerita(data) {
    const response = await fetch(`${BASE_URL}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async unlikeCerita(data) {
    const response = await fetch(`${BASE_URL}/unlike`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async tambahKomentar(data) {
    const response = await fetch(`${BASE_URL}/komentar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async getKomentarByCerita(id_cerita) {
    const response = await fetch(`${BASE_URL}/komentar/${id_cerita}`);
    return await response.json();
  },

  async tambahFavorit(data) {
    const response = await fetch(`${BASE_URL}/favorit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async hapusFavorit(data) {
    const response = await fetch(`${BASE_URL}/hapus-favorit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async getCeritaDetail(id_cerita) {
    const response = await fetch(`${BASE_URL}/cerita/detail/${id_cerita}`);
    return await response.json();
  },
};

  







  // Login
//   async login({ email, password }) {
//     const response = await fetch(`${BASE_URL}/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const responseJson = await response.json();

//     if (!response.ok || responseJson.error) {
//       throw new Error(responseJson.message || 'Login gagal');
//     }

//     putAccessToken(responseJson.loginResult.token);
//     putUser({
//       userId: responseJson.loginResult.userId,
//       name: responseJson.loginResult.name,
//     });

//     return {
//       success: true,
//       data: {
//         token: responseJson.loginResult.token,
//         userId: responseJson.loginResult.userId,
//         name: responseJson.loginResult.name,
//       },
//     };
//   },
// };

// // STORY SERVICE
// async function addStory({ token, description, photo, lat, lon }) {
//   const formData = new FormData();
//   formData.append('description', description);
//   formData.append('photo', photo);
//   if (lat) formData.append('lat', lat);
//   if (lon) formData.append('lon', lon);

//   const response = await fetch(`${BASE_URL}/stories`, {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   });

//   const responseJson = await response.json();

//   if (!response.ok || responseJson.error) {
//     throw new Error(responseJson.message || 'Gagal menambahkan cerita');
//   }

//   return {
//     success: true,
//     message: responseJson.message,
//   };
// }

// async function getAllStories({ token, page = 1, size = 10, location = false }) {
//   const params = new URLSearchParams();
//   params.append('page', page);
//   params.append('size', size);
//   params.append('location', location ? '1' : '0');

//   const response = await fetch(`${BASE_URL}/stories?${params.toString()}`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const responseJson = await response.json();

//   if (!response.ok || responseJson.error) {
//     throw new Error(responseJson.message || 'Gagal mengambil daftar ceritaa');
//   }

//   return {
//     success: true,
//     message: responseJson.message,
//     storyList: responseJson.listStory,
//   };
// }

// async function getStoryDetail({ token, id }) {
//   const response = await fetch(`${BASE_URL}/stories/${id}`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const responseJson = await response.json();

//   if (!response.ok || responseJson.error) {
//     throw new Error(responseJson.message || 'Gagal mengambil detail cerita');
//   }

//   return {
//     success: true,
//     message: responseJson.message,
//     story: responseJson.story,
//   };
// }

// export const storyService = {
//   addStory,
//   tambahCeritaBaru: addStory,
//   getAllStories,
//   getStoryDetail,
 };
