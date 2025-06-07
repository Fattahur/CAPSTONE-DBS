

import { authService } from '../api/api';

export default class LoginModel {
  async login({ email, password }) {
    try {
      const response = await authService.login({ email, password });

      // Simpan token ke localStorage
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
      }

      return {
        success: true,
        message: response.message,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Gagal melakukan login',
      };
    }
  }
}


