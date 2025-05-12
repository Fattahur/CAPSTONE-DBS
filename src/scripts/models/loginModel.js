
// loginModel.js
import { authService } from '../api/api'; 

export default class LoginModel {
  async login({ email, password }) {
    try {
      const response = await authService.login({ email, password });
      
      if (response.success) {
        return {
          success: true,
          message: response.message
        };
      }

      return {
        success: false,
        message: response.message || 'Login gagal'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Gagal melakukan login'
      };
    }
  }
}


