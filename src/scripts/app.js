// COBA 1
import '../styles/main.css';
import './router/router.js';


// Mengecek jika sudah login dan hash kosong, arahkan ke #/beranda
if (localStorage.getItem('isLoggedIn') === 'true' && window.location.hash === '') {
  window.location.hash = '#/beranda';
}


// memakai DOM Manipulation untuk memperbarui navbar
export function updateNavbar() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navbar = document.getElementById('navbar');

  if (!navbar) return;

  if (isLoggedIn) { // untuk halaman setelah login / dashboard
    navbar.innerHTML = `
      <a href="#/beranda">Beranda</a>
      <a href="#/cerita-budaya">Cerita Budaya</a>
      <a href="#/jelajah">Jelajah</a>
      <a href="#/ringkasan">Ringkasan</a>
      <a href="#" id="logout">Logout</a>
    `;
  } else { // untuk halaman landing page
    navbar.innerHTML = `
      <a href="#beranda">Budaya</a>
      <a href="#sorotan_budaya">Sorotan Budaya</a>
      <a href="#keunggulan">Keunggulan</a>
      <a href="#tentang_kami">Tentang Kami</a>
      <a href="#visi_misi">Visi Misi</a>
      <a href="#/login" class="btn-login-navbar">Login</a>
    `;
  }

  // Logout Web
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userData');
      updateNavbar(); // Ganti navbar langsung
      window.location.hash = ''; // Kembali ke landing page
    });
  }
}

// Panggil saat halaman dimuat dan saat hash berubah
document.addEventListener('DOMContentLoaded', updateNavbar);
window.addEventListener('hashchange', updateNavbar);

// Panggil updateNavbar setiap kali halaman dimuat
updateNavbar();

// Panggil updateNavbar setiap kali hash berubah (navigasi hash-based)
window.addEventListener('hashchange', updateNavbar);

/////////////////////////////////////////////////////////////////////////////

// untuk menyembunyikan navbar saat scroll ke bawah (Humburger)
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navbarLinks = document.querySelector('.navbar-link');
    
    // Fungsi toggle menu
    function toggleMenu() {
      hamburger.classList.toggle('active');
      navbarLinks.classList.toggle('active');
      
      // Toggle aria-expanded untuk aksesibilitas
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      
      // Lock/unlock scroll body saat menu terbuka
      document.body.style.overflow = navbarLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    // Event listener untuk hamburger
    hamburger.addEventListener('click', toggleMenu);
    
    // Tutup menu saat klik di luar
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.navbar') && navbarLinks.classList.contains('active')) {
        toggleMenu();
      }
    });
    
    // Tutup menu saat resize (jika mobile berubah ke desktop)
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && navbarLinks.classList.contains('active')) {
        toggleMenu();
      }
    });
  });




