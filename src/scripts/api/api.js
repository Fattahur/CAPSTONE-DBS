
import { putAccessToken, putUser } from '../utils/auth.js';

export const BASE_URL = 'https://ceritanusantara.site/api/auth';

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

// 

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

  // Simpan token & user lengkap
  putAccessToken(responseJson.token);
  putUser(responseJson.user);  // simpan user lengkap, bukan hanya email

  return {
    success: true,
    data: responseJson,  // kembalikan response lengkap dari backend
  };
},
}