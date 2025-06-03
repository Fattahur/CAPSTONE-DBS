// login-page.js

import { html, render } from 'lit-html';
import { updateNavbar } from '../../../app.js'; 
import AuthPresenter from './login-presenter.js';
import RegisterModel from '../../../models/registerModel.js';
import { showToastBerhasil, showToastGagal } from '../../../toast/show-toast.js';

export class LoginPage {
  static async render(container) {
    const template = html`
      <section class="alas_login" id="login-section">
        <div class="background-image"></div>
        <div class="container">
          <div class="wrapper_login">

            <!-- Tombol Back -->
            <button class="back-button" id="back-to-landing">
              <i class="fas fa-arrow-left"></i>
            </button>

            <div class="form_box" id="form-box">
              <!-- Form Login -->
              <form id="login-form" class="active">
                <h1>Sign In</h1>
                <input id="login-email" type="email" placeholder="Email" required />
                <input id="login-password" type="password" placeholder="Kata Sandi" required />
                <button type="submit">Masuk</button>
                <p>Belum punya akun? <a href="#" id="show-signup">Daftar di sini</a></p>
              </form>

              <!-- Form Sign Up -->
              <form id="signup-form">
                <h1>Sign Up</h1>
                <input id="signup-name" type="text" placeholder="Nama Lengkap" required />
                <input id="signup-email" type="email" placeholder="Email" required />
                <input id="signup-password" type="password" placeholder="Kata Sandi" required />
                <button type="submit">Daftar</button>
                <p>Sudah punya akun? <a href="#" id="show-login">Masuk di sini</a></p>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;

    render(template, container);
  }

  static async afterRender(container) {
    //Cek apakah user sudah login, kalau iya langsung arahkan ke beranda
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      window.location.hash = '#/beranda';
      return; 
    }
  
    const loginForm = container.querySelector('#login-form');
    const signupForm = container.querySelector('#signup-form');
    const showSignupLink = container.querySelector('#show-signup');
    const showLoginLink = container.querySelector('#show-login');
    const backButton = container.querySelector('#back-to-landing');
  
    // Fungsi toggle form login <-> signup
    const toggleForms = (showSignup) => {
      if (showSignup) {
        loginForm.classList.remove('active');
        loginForm.classList.add('exit-left');
        signupForm.classList.remove('exit-right');
        signupForm.classList.add('active');
      } else {
        signupForm.classList.remove('active');
        signupForm.classList.add('exit-right');
        loginForm.classList.remove('exit-left');
        loginForm.classList.add('active');
      }
    };
  
    // Tombol kembali ke landing
    backButton?.addEventListener('click', () => {
      window.location.hash = '#/';
    });
  
    // Link toggle ke signup/login
    showSignupLink?.addEventListener('click', (e) => {
      e.preventDefault();
      toggleForms(true);
    });
  
    showLoginLink?.addEventListener('click', (e) => {
      e.preventDefault();
      toggleForms(false);
    });
  
    // Login form submit
    loginForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const presenter = new AuthPresenter({
        view: {
          showSubmitLoadingButton: () => {
            loginForm.querySelector('button[type="submit"]').textContent = 'Loading...';
          },
          hideSubmitLoadingButton: () => {
            loginForm.querySelector('button[type="submit"]').textContent = 'Masuk';
          },
          loginSuccessfully: (message, userData) => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userData', JSON.stringify(userData || {}));
            showToastBerhasil(message);
            updateNavbar();
  
            setTimeout(() => {
              window.location.hash = '#/beranda';
            }, 1500);
          },
          loginFailed: (message) => {
            showToastGagal(message);
          },
        },
      });
  
      await presenter.getLogin({
        email: loginForm.querySelector('#login-email').value,
        password: loginForm.querySelector('#login-password').value,
      });
    });
  

    // Signup form submit
    signupForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const signupButton = signupForm.querySelector('button[type="submit"]');
      signupButton.textContent = 'Loading...';
  
      const name = signupForm.querySelector('#signup-name').value;
      const email = signupForm.querySelector('#signup-email').value;
      const password = signupForm.querySelector('#signup-password').value;
  
      const model = new RegisterModel();
      const result = await model.register({ name, email, password });
  
      if (result.success) {
        showToastBerhasil('Registrasi berhasil! Silakan login.');
        toggleForms(false); // Kembali ke form login
      } else {
        showToastGagal(result.message);
      }
  
      signupButton.textContent = 'Daftar';
    });
  
    // Jika akses langsung ke #/signup
    if (window.location.hash === '#/signup') {
      toggleForms(true);
    }
  }
  
}

export default LoginPage;




// // login-page.js

// import { html, render } from 'lit-html';
// import { updateNavbar } from '../../../app.js'; 
// import AuthPresenter from './login-presenter.js';
// import RegisterModel from '../../../models/registerModel.js';
// import { showToastBerhasil, showToastGagal } from '../../../toast/show-toast.js';

// export class LoginPage {
//   static async render(container) {
//     const template = html`
//       <section class="alas_login" id="login-section">
//         <div class="background-image"></div>
//         <div class="container">
//           <div class="wrapper_login">

//             <!-- Tombol Back -->
//             <button class="back-button" id="back-to-landing">
//               <i class="fas fa-arrow-left"></i>
//             </button>

//             <div class="form_box" id="form-box">
//               <!-- Form Login -->
//               <form id="login-form" class="active">
//                 <h1>Sign In</h1>
//                 <input id="login-email" type="email" placeholder="Email" required />
//                 <input id="login-password" type="password" placeholder="Kata Sandi" required />
//                 <button type="submit">Masuk</button>
//                 <p>
//                   <a href="#" id="forgot-password-link">Lupa Password?</a>
//                 </p>
//                 <p>Belum punya akun? <a href="#" id="show-signup">Daftar di sini</a></p>
//               </form>

//               <!-- Form Sign Up -->
//               <form id="signup-form" class="hide">
//                 <h1>Sign Up</h1>
//                 <input id="signup-name" type="text" placeholder="Nama Lengkap" required />
//                 <input id="signup-email" type="email" placeholder="Email" required />
//                 <input id="signup-password" type="password" placeholder="Kata Sandi" required />
//                 <button type="submit">Daftar</button>
//                 <p>Sudah punya akun? <a href="#" id="show-login">Masuk di sini</a></p>
//               </form>

//               <!-- Form Lupa Password -->
//               <form id="forgot-password-form" class="hide">
//                 <h1>Lupa Password</h1>
//                 <input id="forgot-email" type="email" placeholder="Masukkan email Anda" required />
//                 <button type="submit">Kirim Link Reset</button>
//                 <p><a href="#" id="back-to-login-from-forgot">Kembali ke Masuk</a></p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     `;

//     render(template, container);
//   }

//   static async afterRender(container) {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     if (isLoggedIn === 'true') {
//       window.location.hash = '#/beranda';
//       return; 
//     }
  
//     const loginForm = container.querySelector('#login-form');
//     const signupForm = container.querySelector('#signup-form');
//     const forgotForm = container.querySelector('#forgot-password-form');
//     const showSignupLink = container.querySelector('#show-signup');
//     const showLoginLink = container.querySelector('#show-login');
//     const forgotPasswordLink = container.querySelector('#forgot-password-link');
//     const backToLoginFromForgot = container.querySelector('#back-to-login-from-forgot');
//     const backButton = container.querySelector('#back-to-landing');
  
//     // Fungsi toggle form
//     const showLogin = () => {
//       loginForm.classList.add('active');
//       loginForm.classList.remove('hide');
//       loginForm.classList.remove('exit-left');
//       signupForm.classList.add('hide');
//       signupForm.classList.remove('active');
//       signupForm.classList.remove('exit-right');
//       forgotForm.classList.add('hide');
//       forgotForm.classList.remove('active');
//     };

//     const showSignup = () => {
//       signupForm.classList.add('active');
//       signupForm.classList.remove('hide');
//       signupForm.classList.remove('exit-right');
//       loginForm.classList.remove('active');
//       loginForm.classList.add('exit-left');
//       loginForm.classList.add('hide');
//       forgotForm.classList.add('hide');
//       forgotForm.classList.remove('active');
//     };

//     const showForgotPassword = () => {
//       forgotForm.classList.add('active');
//       forgotForm.classList.remove('hide');
//       loginForm.classList.remove('active');
//       loginForm.classList.add('hide');
//       signupForm.classList.add('hide');
//       signupForm.classList.remove('active');
//     };
  
//     // Tombol kembali ke landing
//     backButton?.addEventListener('click', () => {
//       window.location.hash = '#/';
//     });
  
//     // Link toggle ke signup/login
//     showSignupLink?.addEventListener('click', (e) => {
//       e.preventDefault();
//       showSignup();
//     });
  
//     showLoginLink?.addEventListener('click', (e) => {
//       e.preventDefault();
//       showLogin();
//     });

//     // Link lupa password
//     forgotPasswordLink?.addEventListener('click', (e) => {
//       e.preventDefault();
//       showForgotPassword();
//     });

//     // Link kembali dari lupa password ke login
//     backToLoginFromForgot?.addEventListener('click', (e) => {
//       e.preventDefault();
//       showLogin();
//     });
  
//     // Login form submit
//     loginForm?.addEventListener('submit', async (e) => {
//       e.preventDefault();
  
//       const presenter = new AuthPresenter({
//         view: {
//           showSubmitLoadingButton: () => {
//             loginForm.querySelector('button[type="submit"]').textContent = 'Loading...';
//           },
//           hideSubmitLoadingButton: () => {
//             loginForm.querySelector('button[type="submit"]').textContent = 'Masuk';
//           },
//           loginSuccessfully: (message, userData) => {
//             localStorage.setItem('isLoggedIn', 'true');
//             localStorage.setItem('userData', JSON.stringify(userData || {}));
//             showToastBerhasil(message);
//             updateNavbar();
  
//             setTimeout(() => {
//               window.location.hash = '#/beranda';
//             }, 1500);
//           },
//           loginFailed: (message) => {
//             showToastGagal(message);
//           },
//         },
//       });
  
//       await presenter.getLogin({
//         email: loginForm.querySelector('#login-email').value,
//         password: loginForm.querySelector('#login-password').value,
//       });
//     });
  
//     // Signup form submit
//     signupForm?.addEventListener('submit', async (e) => {
//       e.preventDefault();
  
//       const signupButton = signupForm.querySelector('button[type="submit"]');
//       signupButton.textContent = 'Loading...';
  
//       const name = signupForm.querySelector('#signup-name').value;
//       const email = signupForm.querySelector('#signup-email').value;
//       const password = signupForm.querySelector('#signup-password').value;
  
//       const model = new RegisterModel();
//       const result = await model.register({ name, email, password });
  
//       if (result.success) {
//         showToastBerhasil('Registrasi berhasil! Silakan login.');
//         showLogin(); // Kembali ke form login
//       } else {
//         showToastGagal(result.message);
//       }
  
//       signupButton.textContent = 'Daftar';
//     });

//     // Forgot password form submit
//     forgotForm?.addEventListener('submit', async (e) => {
//       e.preventDefault();

//       const forgotButton = forgotForm.querySelector('button[type="submit"]');
//       forgotButton.textContent = 'Mengirim...';

//       const email = forgotForm.querySelector('#forgot-email').value;

//       // Contoh fungsi reset password - kamu bisa sesuaikan sesuai API/backend-mu
//       try {
//         await AuthPresenter.sendPasswordResetEmail(email);
//         showToastBerhasil('Link reset password berhasil dikirim ke email Anda.');
//         showLogin(); // Kembali ke form login
//       } catch (error) {
//         showToastGagal('Gagal mengirim link reset password. Silakan coba lagi.');
//       }

//       forgotButton.textContent = 'Kirim Link Reset';
//     });
  
//     // Jika akses langsung ke #/signup
//     if (window.location.hash === '#/signup') {
//       showSignup();
//     } else {
//       showLogin();
//     }
//   }
// }

// export default LoginPage;

