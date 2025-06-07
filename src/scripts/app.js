// // COBA 1
// import '../styles/main.css';
// import './router/router.js';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init();

// // Mengecek jika sudah login dan hash kosong, arahkan ke #/beranda
// if (localStorage.getItem('isLoggedIn') === 'true' && window.location.hash === '') {
//   window.location.hash = '#/beranda';
// }

// // memakai DOM Manipulation untuk memperbarui navbar
// export function updateNavbar() {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//   const navbar = document.getElementById('navbar');

//   if (!navbar) return;

//   // if (isLoggedIn) { // untuk halaman setelah login / dashboard
//   //   navbar.innerHTML = `
//   //     <a href="#/beranda">Beranda</a>
//   //     <a href="#/cerita-budaya">Cerita Budaya</a>
//   //     <a href="#/jelajah">Jelajah</a>
//   //     <a href="#/ringkasan">Ringkasan</a>
//   //     <a href="#" id="logout">Logout</a>
//   //   `;

// if (isLoggedIn) {
//   navbar.innerHTML = `
//     <a href="#/beranda">Beranda</a>
//     <a href="#/cerita-budaya">Cerita Budaya</a>
//     <a href="#/jelajah">Jelajah</a>
//     <a href="#/ringkasan">Ringkasan</a>

//     <a href="#/tambah-cerita" class="btn-tambah-cerita">Tambah Cerita</a>

//     <div class="profile-dropdown">
//       <img src="images/profile.png" alt="Foto Profil" class="profile-img" id="profileBtn" />
//       <div class="dropdown-menu" id="dropdownMenu">
//         <a href="#">Profil Saya</a>
//         <a href="#">Pengaturan</a>
//         <a href="#" id="logout">Logout</a>
//       </div>
//     </div>
//   `;
//   } else { // untuk halaman landing page
//     navbar.innerHTML = `
//       <a href="#beranda">Budaya</a>
//       <a href="#sorotan_budaya">Sorotan Budaya</a>
//       <a href="#keunggulan">Keunggulan</a>
//       <a href="#tentang_kami">Tentang Kami</a>
//       <a href="#visi_misi">Visi Misi</a>
//       <a href="#/login" class="btn-login-navbar">Login</a>
//     `;
//   }

//   // Logout Web
//   const logoutButton = document.getElementById('logout');
//   if (logoutButton) {
//     logoutButton.addEventListener('click', (e) => {
//       e.preventDefault();
//       localStorage.removeItem('isLoggedIn');
//       localStorage.removeItem('userData');
//       updateNavbar(); // Ganti navbar langsung
//       window.location.hash = ''; // Kembali ke landing page
//     });
//   }
// }

// // Panggil saat halaman dimuat dan saat hash berubah
// document.addEventListener('DOMContentLoaded', updateNavbar);
// window.addEventListener('hashchange', updateNavbar);

// // Panggil updateNavbar setiap kali halaman dimuat
// updateNavbar();

// // Panggil updateNavbar setiap kali hash berubah (navigasi hash-based)
// window.addEventListener('hashchange', updateNavbar);

// /////////////////////////////////////////////////////////////////////////////

// // untuk menyembunyikan navbar saat scroll ke bawah (Humburger)
// document.addEventListener('DOMContentLoaded', function() {
//     const hamburger = document.querySelector('.hamburger');
//     const navbarLinks = document.querySelector('.navbar-link');

//     // Fungsi toggle menu
//     function toggleMenu() {
//       hamburger.classList.toggle('active');
//       navbarLinks.classList.toggle('active');

//       // Toggle aria-expanded untuk aksesibilitas
//       const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
//       hamburger.setAttribute('aria-expanded', !isExpanded);

//       // Lock/unlock scroll body saat menu terbuka
//       document.body.style.overflow = navbarLinks.classList.contains('active') ? 'hidden' : '';
//     }

//     // Event listener untuk hamburger
//     hamburger.addEventListener('click', toggleMenu);

//     // Tutup menu saat klik di luar
//     document.addEventListener('click', function(e) {
//       if (!e.target.closest('.navbar') && navbarLinks.classList.contains('active')) {
//         toggleMenu();
//       }
//     });

//     // Tutup menu saat resize (jika mobile berubah ke desktop)
//     window.addEventListener('resize', function() {
//       if (window.innerWidth > 768 && navbarLinks.classList.contains('active')) {
//         toggleMenu();
//       }
//     });
//   });

// // Dropdown toggle foto profil
// document.addEventListener("DOMContentLoaded", function () {
//   const profileBtn = document.getElementById("profileBtn");
//   const dropdownMenu = document.getElementById("dropdownMenu");

//   if (profileBtn) {
//     profileBtn.addEventListener("click", () => {
//       dropdownMenu.classList.toggle("show");
//     });

//     window.addEventListener("click", function (event) {
//       if (!event.target.matches("#profileBtn")) {
//         if (dropdownMenu.classList.contains("show")) {
//           dropdownMenu.classList.remove("show");
//         }
//       }
//     });
//   }
// });

// function updateActiveNav() {
//   const links = document.querySelectorAll('.navbar-link a');
//   // Kalau URL hash kosong, anggap default halaman beranda (#/beranda)
//   const currentHash = window.location.hash || '#/beranda';

//   links.forEach(link => {
//     if (link.getAttribute('href') === currentHash) {
//       link.classList.add('active');
//     } else {
//       link.classList.remove('active');
//     }
//   });
// }

// // Panggil saat halaman selesai dimuat
// window.addEventListener('load', updateActiveNav);
// // Panggil saat hash URL berubah (misal user klik link navbar)
// window.addEventListener('hashchange', updateActiveNav);

// import '../styles/main.css';
// import './router/router.js';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init();

// // Redirect ke #/beranda jika sudah login dan tidak ada hash
// if (localStorage.getItem('isLoggedIn') === 'true' && window.location.hash === '') {
//   window.location.hash = '#/beranda';
// }

// export function updateNavbar() {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//   const navbar = document.getElementById('navbar');

//   if (!navbar) return;

//   if (isLoggedIn) {
//     navbar.innerHTML = `
//       <a href="#/beranda">Beranda</a>
//       <a href="#/cerita-budaya">Cerita Budaya</a>
//       <a href="#/jelajah">Jelajah</a>
//       <a href="#/ringkasan">Ringkasan</a>
//       <a href="#/tambah-cerita" class="btn-tambah-cerita">Tambah Cerita</a>
//       <div class="profile-dropdown">
//         <img src="images/profile.png" alt="Foto Profil" class="profile-img" id="profileBtn" />
//         <div class="dropdown-menu" id="dropdownMenu">
//           <a href="#/profil" id="linkProfil">Profil Saya</a>
//           <a href="#">Pengaturan</a>
//           <a href="#" id="logout">Logout</a>
//         </div>
//       </div>
//     `;
//   } else {
//     navbar.innerHTML = `
//       <a href="#beranda">Budaya</a>
//       <a href="#sorotan_budaya">Sorotan Budaya</a>
//       <a href="#keunggulan">Keunggulan</a>
//       <a href="#tentang_kami">Tentang Kami</a>
//       <a href="#visi_misi">Visi Misi</a>
//       <a href="#/login" class="btn-login-navbar">Login</a>
//     `;
//   }

//   // Tambahkan ulang semua event listener yang dibutuhkan setelah innerHTML di-set
//   const logoutButton = document.getElementById('logout');
//   if (logoutButton) {
//     logoutButton.addEventListener('click', (e) => {
//       e.preventDefault();
//       localStorage.removeItem('isLoggedIn');
//       localStorage.removeItem('userData');
//       updateNavbar();
//       window.location.hash = '';
//     });
//   }

//   const profileBtn = document.getElementById("profileBtn");
//   const dropdownMenu = document.getElementById("dropdownMenu");

//   if (profileBtn && dropdownMenu) {
//     profileBtn.addEventListener("click", (e) => {
//       e.stopPropagation();
//       dropdownMenu.classList.toggle("show");
//     });

//     window.addEventListener("click", function (event) {
//       if (!event.target.matches("#profileBtn")) {
//         if (dropdownMenu.classList.contains("show")) {
//           dropdownMenu.classList.remove("show");
//         }
//       }
//     });
//   }
// }

// function updateActiveNav() {
//   const currentHash = window.location.hash || '#/beranda';
//   const links = document.querySelectorAll('.navbar a');
//   links.forEach(link => {
//     if (link.getAttribute('href') === currentHash) {
//       link.classList.add('active');
//     } else {
//       link.classList.remove('active');
//     }
//   });
// }

// // ===== DOM Ready =====
// document.addEventListener('DOMContentLoaded', () => {
//   updateNavbar();
//   updateActiveNav();

//   // Fungsi hamburger menu (TIDAK DIHAPUS)
//   const hamburger = document.querySelector('.hamburger');
//   const navbarLinks = document.querySelector('.navbar-link');

//   if (hamburger && navbarLinks) {
//     function toggleMenu() {
//       hamburger.classList.toggle('active');
//       navbarLinks.classList.toggle('active');
//       const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
//       hamburger.setAttribute('aria-expanded', !isExpanded);
//       document.body.style.overflow = navbarLinks.classList.contains('active') ? 'hidden' : '';
//     }

//     hamburger.addEventListener('click', toggleMenu);

//     document.addEventListener('click', function(e) {
//       if (!e.target.closest('.navbar') && navbarLinks.classList.contains('active')) {
//         toggleMenu();
//       }
//     });

//     window.addEventListener('resize', function () {
//       if (window.innerWidth > 768 && navbarLinks.classList.contains('active')) {
//         toggleMenu();
//       }
//     });
//   }

//   // Dropdown profil
//   const profileBtn = document.getElementById("profileBtn");
//   const dropdownMenu = document.getElementById("dropdownMenu");

//   if (profileBtn && dropdownMenu) {
//     profileBtn.addEventListener("click", () => {
//       dropdownMenu.classList.toggle("show");
//     });

//     window.addEventListener("click", function (event) {
//       if (!event.target.matches("#profileBtn")) {
//         if (dropdownMenu.classList.contains("show")) {
//           dropdownMenu.classList.remove("show");
//         }
//       }
//     });
//   }
// });

// // Saat hash berubah
// window.addEventListener('hashchange', () => {
//   updateNavbar();
//   updateActiveNav();
// });

// // Saat halaman selesai dimuat
// window.addEventListener('load', () => {
//   updateNavbar();
//   updateActiveNav();
// });

import "../styles/main.css";
import "./router/router.js";

import AOS from "aos";
import "aos/dist/aos.css";
import DetailPage from "../scripts/pages/detail cerita/detail-page.js";
import { initMap } from "./map.js";

AOS.init();

if (
  localStorage.getItem("isLoggedIn") === "true" &&
  window.location.hash === ""
) {
  window.location.hash = "#/beranda";
}

export function updateNavbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navbar = document.getElementById("navbar");

  if (!navbar) return;

  if (isLoggedIn) {
    navbar.innerHTML = `
      <a href="#/beranda">Beranda</a>
      <a href="#/cerita-budaya">Cerita Budaya</a>
      <a href="#/jelajah">Jelajah</a>
      <a href="#/ringkasan">Ringkasan</a>
      <a href="#/add-cerita" class="btn-tambah-cerita">Tambah Cerita</a>
      <div class="profile-dropdown">
        <img src="images/profile.png" alt="Foto Profil" class="profile-img" id="profileBtn" />
        <div class="dropdown-menu" id="dropdownMenu">
          <a href="#/profil" id="linkProfil">Profil Saya</a>
          <a href="#">Pengaturan</a>
          <a href="#" id="logout">Logout</a>
        </div>
      </div>
    `;
  } else {
    navbar.innerHTML = `
      <a href="#beranda">Budaya</a>
      <a href="#sorotan_budaya">Sorotan Budaya</a>
      <a href="#keunggulan">Keunggulan</a>
      <a href="#tentang_kami">Tentang Kami</a>
      <a href="#visi_misi">Visi Misi</a>
      <a href="#/login" class="btn-login-navbar">Login</a>
    `;
  }

  // Tambah event logout
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userData");
      updateNavbar();
      window.location.hash = "";
    });
  }

  // Dropdown profil
  const profileBtn = document.getElementById("profileBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (profileBtn && dropdownMenu) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("show");
    });

    window.addEventListener("click", function (event) {
      if (!event.target.matches("#profileBtn")) {
        if (dropdownMenu.classList.contains("show")) {
          dropdownMenu.classList.remove("show");
        }
      }
    });
  }

  // ✅ Event listener tombol "Tambah Cerita"
  const tambahCeritaBtn = document.querySelector(".btn-tambah-cerita");
  if (tambahCeritaBtn) {
    tambahCeritaBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = "#/add-cerita";
    });
  }
}

function updateActiveNav() {
  const currentHash = window.location.hash || "#/beranda";
  const links = document.querySelectorAll(".navbar a");
  links.forEach((link) => {
    if (link.getAttribute("href") === currentHash) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateNavbar();
  updateActiveNav();

  // Hamburger menu
  const hamburger = document.querySelector(".hamburger");
  const navbarLinks = document.querySelector(".navbar-link");

  if (hamburger && navbarLinks) {
    function toggleMenu() {
      hamburger.classList.toggle("active");
      navbarLinks.classList.toggle("active");
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      document.body.style.overflow = navbarLinks.classList.contains("active")
        ? "hidden"
        : "";
    }

    hamburger.addEventListener("click", toggleMenu);

    document.addEventListener("click", function (e) {
      if (
        !e.target.closest(".navbar") &&
        navbarLinks.classList.contains("active")
      ) {
        toggleMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && navbarLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  }
});

window.addEventListener("hashchange", () => {
  updateNavbar();
  updateActiveNav();
});

window.addEventListener("load", () => {
  updateNavbar();
  updateActiveNav();
});




document.addEventListener("DOMContentLoaded", () => {
  // Misal kamu punya div dengan id="map" di halaman yang ingin pakai map
  const mapContainerId = "map";

  // Pastikan elemen div dengan id="map" sudah ada di DOM sebelum inisialisasi
  const mapContainer = document.getElementById(mapContainerId);
  if (mapContainer) {
    initMap(mapContainerId);
  } else {
    console.warn(`Element dengan id="${mapContainerId}" tidak ditemukan.`);
  }
});

const appContainer = document.getElementById("main-content");



async function router() {
  const hash = window.location.hash || "#/beranda";

  if (hash.startsWith("#/detail")) {
    // Render dulu HTML-nya
    appContainer.innerHTML = await DetailPage.render();
    // Setelah itu, panggil afterRender untuk load data dan event listener
    await DetailPage.afterRender();
  }

  // route lain bisa kamu buat di sini
}

// Jalankan router pertama kali saat page load
window.addEventListener("load", router);

// Tangani perubahan hash untuk SPA navigation
window.addEventListener("hashchange", router);
