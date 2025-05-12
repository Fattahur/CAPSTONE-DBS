
// registerModel.js
import { authService } from '../api/api';

export default class RegisterModel {
  async register({ name, email, password }) {
    try {
      
      const response = await authService.register({ name, email, password });

      if (response.success) {
        return {
          success: true,
          message: response.message
        };
      }

      throw new Error(response.message || 'Registrasi gagal');
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Gagal melakukan pendaftaran'
      };
    }
  }
}
