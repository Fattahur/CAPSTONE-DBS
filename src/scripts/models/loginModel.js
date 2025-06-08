
// // import { authService } from '../api/api';

// // export default class LoginModel {
// //   async login({ email, password }) {
// //     try {
// //       const response = await authService.login({ email, password });

// //       // Simpan token ke localStorage
// //       const token = response.data.token;
// //       if (token) {
// //         localStorage.setItem('token', token);
// //       }

// //       return {
// //         success: true,
// //         message: response.message,
// //         data: response.data,
// //       };
// //     } catch (error) {
// //       return {
// //         success: false,
// //         message: error.message || 'Gagal melakukan login',
// //       };
// //     }
// //   }
// // }


// import { authService } from '../api/api';

// export default class LoginModel {
//   async login({ email, password }) {
//     try {
//       const response = await authService.login({ email, password });

//       const token = response.data.token;
//       const user = response.data.user; // <- ambil objek user dari respons

//       if (token) {
//         localStorage.setItem('token', token);
//       }

//       if (user?.id) {
//         localStorage.setItem('user_id', user.id); // <- simpan user_id juga
//       }

//       return {
//         success: true,
//         message: response.message,
//         data: response.data,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message || 'Gagal melakukan login',
//       };
//     }
//   }
// }



import { authService } from '../api/api';

export default class LoginModel {
  async login({ email, password }) {
    try {
      // Kirim permintaan login ke server
      const response = await authService.login({ email, password });

      // Ambil token dan data user dari respons
      const { token, user } = response.data;

      // Simpan token ke localStorage (untuk autentikasi selanjutnya)
      if (token) {
        localStorage.setItem('token', token);
      }

      // Simpan user_id ke localStorage (untuk keperluan seperti add cerita)
      if (user?.id) {
        localStorage.setItem('user_id', user.id.toString());
      }

      // Berhasil login
      return {
        success: true,
        message: response.message || 'Login berhasil',
        data: response.data,
      };
    } catch (error) {
      // Tangani error
      return {
        success: false,
        message:
          error?.response?.data?.message || error.message || 'Gagal melakukan login',
      };
    }
  }
}
