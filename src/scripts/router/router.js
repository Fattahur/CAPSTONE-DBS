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


export const renderPage = async () => {
  const path = window.location.hash.split("?")[0] || "#/";

  const isAllowed = protectedRoute(path);
  if (!isAllowed) return; // keluar sebelum transisi

  const Page = routes[path] || LandingPage;
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
      const transition = document.startViewTransition(async () => {
        if (Page.render.length > 0) {
          await Page.render(container);
        }
        if (Page.afterRender) {
          await Page.afterRender(container);
        }
      });
      await transition.ready;
    } else {
      if (Page.render.length > 0) {
        await Page.render(container);
      }
      if (Page.afterRender) {
        await Page.afterRender(container);
      }
    }
  } catch (error) {
    if (error.name === "AbortError") {
      console.warn("⚠️ View transition dibatalkan:", error.message);
    } else {
      console.error("❌ Error rendering page:", error);
    }
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
