
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
