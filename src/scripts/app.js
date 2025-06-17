
import "../styles/main.css";
import "./router/router.js";
import AOS from "aos";
import "aos/dist/aos.css";
import DetailPage from "../scripts/pages/detail cerita/detail-page.js";
import { initMap } from "./map.js";
import { BASE_IMAGE_URL } from './api/api.js';
import { showPopup } from "./toast/popup.js";


AOS.init();

if (
  localStorage.getItem("isLoggedIn") === "true" &&
  window.location.hash === ""
) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const role = userData?.role;

  if (role === "admin") {
    window.location.hash = "#/admin";
  } else {
    window.location.hash = "#/beranda";
  }
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then((reg) => console.log('✅ Service Worker registered:', reg))
//       .catch((err) => console.error('❌ Service Worker registration failed:', err));
//   });
// }

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => console.log('✅ Service Worker registered:', reg))
      .catch((err) => console.error('❌ Service Worker registration failed:', err));
  });
}




export function updateNavbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");
  const navbar = document.getElementById("navbar");

  if (!navbar) return;

  const currentHash = window.location.hash;
  if (currentHash.startsWith("#/detail")) {
    header.style.display = "none";

    return;
  } else {
    navbar.style.display = "flex"; 
  }

  if (!isLoggedIn) {
    navbar.innerHTML = `...`;
  } else if (role === "admin") {
    navbar.innerHTML = `...`;
  } else {
    navbar.innerHTML = `...`;
  }

  if (!isLoggedIn) {
    // Belum login
    navbar.innerHTML = `
      <a href="#beranda">Budaya</a>
      <a href="#sorotan_budaya">Sorotan Budaya</a>
      <a href="#keunggulan">Keunggulan</a>
      <a href="#tentang_kami">Tentang Kami</a>
      <a href="#visi_misi">Visi Misi</a>
      <a href="#/login" class="btn-login-navbar">Login</a>
    `;
  } else if (role === "admin") {
    // Login admin
    navbar.innerHTML = `
      <a href="#/admin">Beranda</a>
      <a href="#/manajemen">Manajemen Konten</a>
      <div class="profile-dropdown">
        <img src="images/default_profile.png" alt="Foto Profil" class="profile-img" id=".profile-img" />
        <div class="dropdown-menu" id="dropdownMenu">
          <a href="#/profil" id="linkProfil">Profil Saya</a>
          <a href="#">Pengaturan</a>
          <a href="#" id="logout">Logout</a>
        </div>
      </div>
    `;
  } else {
    // Login user biasa
    navbar.innerHTML = `
      <a href="#/beranda">Beranda</a>
      <a href="#/cerita-budaya">Cerita Budaya</a>
      <a href="#/jelajah">Jelajah</a>
      <a href="#/ringkasan">Ringkasan</a>
      <a href="#/add-cerita" class="btn-tambah-cerita">Tambah Cerita</a>
      <div class="profile-dropdown">
        <img src="images/default_profile.png" alt="Foto Profil" class="profile-img" id=".profile-img" />
        <div class="dropdown-menu" id="dropdownMenu">
          <a href="#/profil" id="linkProfil">Profil Saya</a>
          <a href="#">Pengaturan</a>
          <a href="#" id="logout">Logout</a>
        </div>
      </div>
    `;
  }


  
// Ambil user ID dari localStorage
const userId = localStorage.getItem("user_id");

if (userId) {
  import('./models/addprofileModel.js').then(async ({ default: AddProfileModel }) => {
    const model = new AddProfileModel();
    const result = await model.getProfile(userId);

    if (result.success && result.data && result.data.photo_profile) {
      const photoUrl = `${BASE_IMAGE_URL}/${result.data.photo_profile}`;
      const profileImg = document.querySelector(".profile-img");

      if (profileImg) {
        profileImg.src = photoUrl;

        profileImg.onerror = () => {
          profileImg.src = "images/default_profile.png"; 
        };
      }
    }
  });
}


  // Event listener logout (sama untuk semua)
 const logoutButton = document.getElementById("logout");
if (logoutButton) {
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    updateNavbar();

    

    const targetHash = "#/";
    if (window.location.hash === targetHash) {
      renderPage(); // Paksa render karena hash tidak berubah
    } else {
      window.location.hash = targetHash;
    }
  });
}


  // Dropdown profil
  const profileBtn = document.getElementById(".profile-img");
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

  
  // Event listener tombol "Tambah Cerita" untuk user
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
  const mapContainerId = "map";

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
    await DetailPage.afterRender();
    appContainer.innerHTML = await DetailPage.render();
    
  }
}

window.addEventListener("load", router);

// Tangani perubahan hash untuk SPA navigation
window.addEventListener("hashchange", router);


// untuk mengatur animasi header narbar      
let lastScrollTop = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scroll ke bawah
    header.classList.remove("scrolled-up");
    header.classList.add("scrolled-down");
  } else {
    // Scroll ke atas
    header.classList.remove("scrolled-down");
    header.classList.add("scrolled-up");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// kode coba:



// KODE UJICOBA

// import "../styles/main.css";
// import "./router/router.js";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import DetailPage from "../scripts/pages/detail cerita/detail-page.js";
// import { initMap } from "./map.js";
// import { BASE_IMAGE_URL } from './api/api.js';

// AOS.init();

// if (
//   localStorage.getItem("isLoggedIn") === "true" &&
//   window.location.hash === ""
// ) {
//   const userData = JSON.parse(localStorage.getItem("userData"));
//   const role = userData?.role;

//   if (role === "admin") {
//     window.location.hash = "#/admin";
//   } else {
//     window.location.hash = "#/beranda";
//   }
// }

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('service-worker.js')
//       .then((reg) => console.log('✅ Service Worker registered:', reg))
//       .catch((err) => console.error('❌ Service Worker registration failed:', err));
//   });
// }

// export function updateNavbar() {
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const role = localStorage.getItem("role");
//   const navbar = document.getElementById("navbar");

//   if (!navbar) return;

//   const currentHash = window.location.hash;
//   const header = document.querySelector(".header");
//   if (currentHash.startsWith("#/detail")) {
//     header.style.display = "none";
//     return;
//   } else {
//     navbar.style.display = "flex";
//   }

//   if (!isLoggedIn) {
//     navbar.innerHTML = `
//       <a href="#beranda">Budaya</a>
//       <a href="#sorotan_budaya">Sorotan Budaya</a>
//       <a href="#keunggulan">Keunggulan</a>
//       <a href="#tentang_kami">Tentang Kami</a>
//       <a href="#visi_misi">Visi Misi</a>
//       <a href="#/login" class="btn-login-navbar">Login</a>
//     `;
//   } else if (role === "admin") {
//     navbar.innerHTML = `
//       <a href="#/admin">Beranda</a>
//       <a href="#/manajemen">Manajemen Konten</a>
//       <div class="profile-dropdown">
//         <img src="images/default_profile.png" alt="Foto Profil" class="profile-img" id=".profile-img" />
//         <div class="dropdown-menu" id="dropdownMenu">
//           <a href="#/profil" id="linkProfil">Profil Saya</a>
//           <a href="#">Pengaturan</a>
//           <a href="#" id="logout">Logout</a>
//         </div>
//       </div>
//     `;
//   } else {
//     navbar.innerHTML = `
//       <a href="#/beranda">Beranda</a>
//       <a href="#/cerita-budaya">Cerita Budaya</a>
//       <a href="#/jelajah">Jelajah</a>
//       <a href="#/ringkasan">Ringkasan</a>
//       <a href="#/add-cerita" class="btn-tambah-cerita">Tambah Cerita</a>
//       <div class="profile-dropdown">
//         <img src="images/default_profile.png" alt="Foto Profil" class="profile-img" id=".profile-img" />
//         <div class="dropdown-menu" id="dropdownMenu">
//           <a href="#/profil" id="linkProfil">Profil Saya</a>
//           <a href="#">Pengaturan</a>
//           <a href="#" id="logout">Logout</a>
//         </div>
//       </div>
//     `;
//   }

//   const userId = localStorage.getItem("user_id");

//   if (userId) {
//     import('./models/addprofileModel.js').then(async ({ default: AddProfileModel }) => {
//       const model = new AddProfileModel();
//       const result = await model.getProfile(userId);

//       if (result.success && result.data && result.data.photo_profile) {
//         const photoUrl = `${BASE_IMAGE_URL}/${result.data.photo_profile}`;
//         const profileImg = document.querySelector(".profile-img");

//         if (profileImg) {
//           profileImg.src = photoUrl;

//           profileImg.onerror = () => {
//             profileImg.src = "images/default_profile.png";
//           };
//         }
//       }
//     });
//   }

//   const logoutButton = document.getElementById("logout");
//   if (logoutButton) {
//     logoutButton.addEventListener("click", (e) => {
//       e.preventDefault();
//       localStorage.removeItem("isLoggedIn");
//       localStorage.removeItem("role");
//       localStorage.removeItem("user_id");
//       localStorage.removeItem("token");
//       updateNavbar();

//       const targetHash = "#/";
//       if (window.location.hash === targetHash) {
//         router();
//       } else {
//         window.location.hash = targetHash;
//       }
//     });
//   }

//   const profileBtn = document.getElementById(".profile-img");
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

//   const tambahCeritaBtn = document.querySelector(".btn-tambah-cerita");
//   if (tambahCeritaBtn) {
//     tambahCeritaBtn.addEventListener("click", (e) => {
//       e.preventDefault();
//       window.location.hash = "#/add-cerita";
//     });
//   }
// }

// function updateActiveNav() {
//   const currentHash = window.location.hash || "#/beranda";
//   const links = document.querySelectorAll(".navbar a");
//   links.forEach((link) => {
//     if (link.getAttribute("href") === currentHash) {
//       link.classList.add("active");
//     } else {
//       link.classList.remove("active");
//     }
//   });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   updateNavbar();
//   updateActiveNav();

//   const hamburger = document.querySelector(".hamburger");
//   const navbarLinks = document.querySelector(".navbar-link");

//   if (hamburger && navbarLinks) {
//     function toggleMenu() {
//       hamburger.classList.toggle("active");
//       navbarLinks.classList.toggle("active");
//       const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
//       hamburger.setAttribute("aria-expanded", !isExpanded);
//       document.body.style.overflow = navbarLinks.classList.contains("active")
//         ? "hidden"
//         : "";
//     }

//     hamburger.addEventListener("click", toggleMenu);

//     document.addEventListener("click", function (e) {
//       if (
//         !e.target.closest(".navbar") &&
//         navbarLinks.classList.contains("active")
//       ) {
//         toggleMenu();
//       }
//     });

//     window.addEventListener("resize", function () {
//       if (window.innerWidth > 768 && navbarLinks.classList.contains("active")) {
//         toggleMenu();
//       }
//     });
//   }
// });

// const appContainer = document.getElementById("main-content");

// async function router() {
//   const hash = window.location.hash || "#/beranda";

//   if (document.startViewTransition) {
//     document.startViewTransition(async () => {
//       await handleRouting(hash);
//     });
//   } else {
//     await handleRouting(hash);
//   }
// }

// async function handleRouting(hash) {
//   if (hash.startsWith("#/detail")) {
//     appContainer.innerHTML = await DetailPage.render();
//     await DetailPage.afterRender?.();
//   } else if (hash === "#/beranda") {
//     const { default: BerandaPage } = await import('./pages/beranda/beranda-page.js');
//     await BerandaPage.render(appContainer);
//   } else if (hash === "#/ringkasan") {
//     const { default: RingkasanPage } = await import('./pages/ringkasan/ringkasan-page.js');
//     await RingkasanPage.render(appContainer);
//   } else {
//     appContainer.innerHTML = "<p>Halaman tidak ditemukan.</p>";
//   }
// }

// window.addEventListener("load", router);
// window.addEventListener("hashchange", router);

// let lastScrollTop = 0;
// const header = document.querySelector(".header");

// window.addEventListener("scroll", function () {
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//   if (scrollTop > lastScrollTop) {
//     header.classList.remove("scrolled-up");
//     header.classList.add("scrolled-down");
//   } else {
//     header.classList.remove("scrolled-down");
//     header.classList.add("scrolled-up");
//   }

//   lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
// });

