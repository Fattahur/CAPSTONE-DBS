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
  // Cek apakah user sudah login, kalau iya langsung arahkan ke halaman sesuai role
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    const role = localStorage.getItem('role');
    window.location.hash = role === 'admin' ? '#/admin' : '#/beranda';
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

          // Ambil role dari userData atau localStorage
          const role = userData?.role || JSON.parse(localStorage.getItem('userData'))?.role || localStorage.getItem('role');
          
          

          setTimeout(() => {
            // Redirect berdasarkan role
            if (role === 'admin') {
              window.location.hash = '#/admin';
              
            } else {
              window.location.hash = '#/beranda';
            }
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

