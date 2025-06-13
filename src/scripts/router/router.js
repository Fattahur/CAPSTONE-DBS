import LandingPage from "../pages/landing-page.js";
import LoginPage from "../pages/auth/login/login-page.js";
import BerandaPage from "../pages/beranda/beranda-page.js";
import CeritaBudayaPage from "../pages/cerita-budaya/ceritabudaya-page.js";
import JelajahPage from "../pages/jelajah/jelajah-page.js";
import RingkasanPage from "../pages/ringkasan/ringkasan-page.js";
import AdminPage from "../pages/admin/dashboard/admin-page.js";
import ManajemenPage from "../pages/admin/manajemen/manajemen-page.js";
import ProfilPenggunaPage from "../pages/profil-pengguna/profilpengguna-page.js";
import AddCeritaPage from "../pages/tambah-cerita/addcerita-page.js";
import DetailPage from "../pages/detail cerita/detail-page.js";

// Cek status login
function isAuthenticated() {
  return localStorage.getItem("isLoggedIn") === "true";
}

// Ambil role dari localStorage
function getUserRole() {
  return localStorage.getItem("role")?.toLowerCase() || null;
}

// Fungsi proteksi route
function protectedRoute(path) {
  const publicRoutes = ["#/", "#/landing", "#/login"];

  const isLoggedIn = isAuthenticated();
  const role = getUserRole();

  // Jika belum login dan ingin akses halaman private
  if (!isLoggedIn && !publicRoutes.includes(path)) {
    window.location.hash = "#/login";
    return false;
  }

  // Jika sudah login, cegah kembali ke login/landing
  if (isLoggedIn && ["#/", "#/login", "#/landing"].includes(path)) {
    if (role === "admin") {
      setTimeout(() => (window.location.hash = "#/admin"), 0);
    } else if (role === "user") {
      setTimeout(() => (window.location.hash = "#/beranda"), 0);
    } else {
      console.warn("Role belum dikenali atau belum disetel.");
    }
    return false;
  }

  // Akses yang dibatasi
  const adminOnlyRoutes = ["#/admin", "#/manajemen"];
  const userOnlyRoutes = [
    "#/beranda",
    "#/cerita-budaya",
    "#/jelajah",
    "#/ringkasan",
    "#/profil",
    "#/add-cerita",
    "#/detail",
  ];

  if (role === "admin" && userOnlyRoutes.includes(path)) {
    setTimeout(() => (window.location.hash = "#/admin"), 0);
    return false;
  }

  if (role === "user" && adminOnlyRoutes.includes(path)) {
    setTimeout(() => (window.location.hash = "#/beranda"), 0);
    return false;
  }

  return true;
}

// Daftar route
const routes = {
  "#/": LandingPage,
  "#/landing": LandingPage,
  "#/login": LoginPage,
  "#/beranda": BerandaPage,
  "#/cerita-budaya": CeritaBudayaPage,
  "#/jelajah": JelajahPage,
  "#/ringkasan": RingkasanPage,
  "#/admin": AdminPage,
  "#/manajemen": ManajemenPage,
  "#/profil": ProfilPenggunaPage,
  "#/add-cerita": AddCeritaPage,
  "#/detail": DetailPage,
};

// Fungsi render halaman
export const renderPage = async () => {
  const path = window.location.hash.split("?")[0] || "#/";

  if (!protectedRoute(path)) return;

  let Page = routes[path] || LandingPage;

  const container = document.getElementById("main-content");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  if (!container) {
    console.error("Container element not found!");
    return;
  }

  const isAuthPage = path === "#/login" || path === "#/signup";
  if (header) header.style.display = isAuthPage ? "none" : "";
  if (footer) footer.style.display = isAuthPage ? "none" : "";

  try {
    if (document.startViewTransition) {
      await document.startViewTransition(async () => {
        if (Page.render.length > 0) {
          await Page.render(container);
        }
        if (Page.afterRender) {
          await Page.afterRender(container);
        }
      }).ready;
    } else {
      if (Page.render.length > 0) {
        await Page.render(container);
      }
      if (Page.afterRender) {
        await Page.afterRender(container);
      }
    }
  } catch (error) {
    console.error("Error rendering page:", error);
  }
};

// Navigasi scroll pada landing page
const setupNavigation = () => {
  document.getElementById("navbar")?.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    const landingHashes = [
      "#beranda",
      "#sorotan_budaya",
      "#keunggulan",
      "#tentang_kami",
      "#visi_misi",
    ];

    if (landingHashes.includes(href)) {
      e.preventDefault();
      if (
        window.location.hash !== "#/" &&
        window.location.hash !== "#/landing"
      ) {
        window.location.hash = "#/landing" + href;
      } else {
        const id = href.substring(1);
        const targetEl = document.getElementById(id);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  });

  document
    .querySelector(".btn-login-navbar")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = "#/login";
    });
};

// Event listener utama
window.addEventListener("hashchange", renderPage);
window.addEventListener("load", () => {
  renderPage();
  setupNavigation();
});















// // kode ini bisa
// import LandingPage from "../pages/landing-page.js";
// import LoginPage from "../pages/auth/login/login-page.js";
// import BerandaPage from "../pages/beranda/beranda-page.js";
// import CeritaBudayaPage from "../pages/cerita-budaya/ceritabudaya-page.js";
// import JelajahPage from "../pages/jelajah/jelajah-page.js";
// import RingkasanPage from "../pages/ringkasan/ringkasan-page.js";
// import AdminPage from "../pages/admin/dashboard/admin-page.js";
// import ManajemenPage from "../pages/admin/manajemen/manajemen-page.js";
// import ProfilPenggunaPage from "../pages/profil-pengguna/profilpengguna-page.js";
// import AddCeritaPage from "../pages/tambah-cerita/addcerita-page.js";
// import DetailPage from "../pages/detail cerita/detail-page.js";

// function isAuthenticated() {
//   return localStorage.getItem("isLoggedIn") === "true";
// }

// function getUserRole() {
//   return localStorage.getItem("role")?.toLowerCase() || null;
// }

// function protectedRoute(path) {
//   const publicRoutes = ["#/", "#/landing", "#/login"];

//   if (!isAuthenticated()) {
//     // Jika belum login dan mencoba akses halaman private
//     if (!publicRoutes.includes(path)) {
//       window.location.hash = "#/login";
//       return false;
//     }
//   } else {
//     const role = getUserRole();

//     // Cegah akses ke halaman login/landing setelah login
//     if (["#/", "#/login", "#/landing"].includes(path)) {
//       window.location.hash = role === "admin" ? "#/admin" : "#/beranda";
//       return false;
//     }

//     const adminOnlyRoutes = ["#/admin", "#/manajemen"];
//     const userOnlyRoutes = [
//       "#/beranda",
//       "#/cerita-budaya",
//       "#/jelajah",
//       "#/ringkasan",
//       "#/profil",
//       "#/add-cerita",
//       "#/detail",
//     ];

//     // Jika admin mencoba akses route user, redirect ke admin dashboard
//     if (role === "admin" && userOnlyRoutes.includes(path)) {
//       window.location.hash = "#/admin";
      
//       return false;
//     }

//     // Jika user mencoba akses route admin, redirect ke beranda
//     if (role === "user" && adminOnlyRoutes.includes(path)) {
//       window.location.hash = "#/beranda";
//       return false;
//     }
//   }

//   return true;
// }

// // Rute aplikasi
// const routes = {
//   "#/": LandingPage, 
//   "#/landing": LandingPage, 
//   "#/login": LoginPage, 
//   "#/beranda": BerandaPage, 
//   "#/cerita-budaya": CeritaBudayaPage,
//   "#/jelajah": JelajahPage,
//   "#/ringkasan": RingkasanPage,
//   "#/admin": AdminPage, 
//   "#/manajemen": ManajemenPage, 
//   "#/profil": ProfilPenggunaPage,
//   "#/add-cerita": AddCeritaPage,
//   "#/detail": DetailPage,
// };



// export const renderPage = async () => {
//   const path = window.location.hash.split("?")[0] || "#/";

//   // Cek akses route (existing functionality preserved)
//   if (!protectedRoute(path)) return;

//   const Page = routes[path] || LandingPage;
//   const container = document.getElementById("main-content");
//   const header = document.querySelector("header");
//   const footer = document.querySelector("footer");

//   if (!container) {
//     console.error("Container element not found!");
//     return;
//   }

//   // Sembunyikan header & footer di halaman login/signup (existing functionality)
//   const isAuthPage = path === "#/login" || path === "#/signup";
//   if (header) header.style.display = isAuthPage ? "none" : "";
//   if (footer) footer.style.display = isAuthPage ? "none" : "";

//   try {
//     // Check if View Transition API is available
//     if (document.startViewTransition) {
//       // Start transition while preserving all existing logic
//       await document.startViewTransition(async () => {
//         // Existing render logic
//         if (Page.render.length > 0) {
//           await Page.render(container);
//         }
//         // Existing afterRender logic
//         if (Page.afterRender) {
//           await Page.afterRender(container);
//         }
//       }).ready; 
//     } else {
//       if (Page.render.length > 0) {
//         await Page.render(container);
//       }

//       if (Page.afterRender) {
//         await Page.afterRender(container);
//       }
//     }
//   } catch (error) {
//     console.error("Error rendering page:", error);
//   }
// };

// const setupNavigation = () => {
//   // Contoh untuk scroll ke bagian tertentu di landing page
//   document.getElementById('navbar').addEventListener('click', (e) => {
//     const anchor = e.target.closest('a');
//     if (!anchor) return;

//     const href = anchor.getAttribute('href');
    
//     // Jika anchor adalah hash bagian landing page
//     const landingHashes = ['#beranda', '#sorotan_budaya', '#keunggulan', '#tentang_kami', '#visi_misi'];

//     if (landingHashes.includes(href)) {
//       e.preventDefault();

//       // Jika bukan sedang di landing page, navigasi ke landing page dulu
//       if (window.location.hash !== '#/' && window.location.hash !== '#/landing') {
//         window.location.hash = '#/landing' + href;
//       } else {
//         // Kalau sudah di landing page, scroll langsung
//         const id = href.substring(1);
//         const targetEl = document.getElementById(id);
//         if (targetEl) {
//           targetEl.scrollIntoView({ behavior: 'smooth' });
//         }
//       }
//     }
//   });

//   // Login button handler, misal:
//   document.querySelector('.btn-login-navbar')?.addEventListener('click', (e) => {
//     e.preventDefault();
//     window.location.hash = '#/login';
//   });
// };


// window.addEventListener("hashchange", renderPage);
// window.addEventListener("load", () => {
//   renderPage();
//   setupNavigation();
// });







































// export const renderPage = async () => {
//   const path = window.location.hash.split("?")[0] || "#/";

//   // Cek akses route
//   if (!protectedRoute(path)) return;

//   const Page = routes[path] || LandingPage;

//   const container = document.getElementById("main-content");
//   const header = document.querySelector("header");
//   const footer = document.querySelector("footer");


//   if (!container) {
//     console.error("Container element not found!");
//     return;
//   }

//   // Sembunyikan header & footer di halaman login/ signup
//   const isAuthPage = path === "#/login" || path === "#/signup";
//   if (header) header.style.display = isAuthPage ? "none" : "";
//   if (footer) footer.style.display = isAuthPage ? "none" : "";

//   try {
//     // Render halaman (fungsi render ada parameter atau tidak)
//     if (Page.render.length > 0) {
//       await Page.render(container);
//     }

//     if (Page.afterRender) {
//       await Page.afterRender(container);
//     }
//   } catch (error) {
//     console.error("Error rendering page:", error);
//   }
// };


// kode coba:

