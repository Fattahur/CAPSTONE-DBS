
import { authService } from '../api/api';

export default class LoginModel {
  async login({ email, password }) {
    try {
      const response = await authService.login({ email, password });

      // Debug: tampilkan response.data dan user.role ke console
      console.log('DEBUG: response.data =', response.data);
      const { token, user } = response.data || {};
      console.log('DEBUG: user =', user);
      console.log('DEBUG: user.role =', user?.role);

      if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', 'true'); 
      }

      if (user?.id) {
        localStorage.setItem('user_id', user.id.toString());
      }

      if (user?.role) {
        localStorage.setItem('role', user.role);
      }

      return {
        success: true,
        message: `Login berhasil sebagai ${user?.role || 'user'}`,
        data: response.data,
        role: user?.role,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || error.message || 'Gagal melakukan login',
      };
    }
  }
}
