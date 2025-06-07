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


const routes = {
  "#/": LandingPage, // sebelum login landing page
  "#/landing": LandingPage, // sebelum login landing page
  "#/login": LoginPage, // login page
  "#/beranda": BerandaPage, // ini halaman beranda  setelah login
  "#/cerita-budaya": CeritaBudayaPage, // halaman cerita budaya
  "#/jelajah": JelajahPage, // halaman jelajah
  "#/ringkasan": RingkasanPage, // halaman ringkasan
  "#/admin": AdminPage,
  "#/manajemen": ManajemenPage,
  "#/profil": ProfilPenggunaPage,
  "#/add-cerita": AddCeritaPage,
  "#/detail": DetailPage,
};

export const renderPage = async () => {
  // const path = window.location.hash || "#/";
  const path = window.location.hash.split("?")[0] || "#/";
  const Page = routes[path] || LandingPage;

  const container = document.getElementById("main-content");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  if (!container) {
    console.error("Container element not found!");
    return;
  }

  // Semua halaman selain login dan signup tidak menampilkan header dan footer
  const isAuthPage = path === "#/login" || path === "#/signup";
  if (header) header.style.display = isAuthPage ? "none" : ""; // hide header/navbar
  if (footer) footer.style.display = isAuthPage ? "none" : ""; // hide footer

  try {
    if (Page.render.length > 0) {
      await Page.render(container);
    } else {
      container.innerHTML = await Page.render();
    }

    if (Page.afterRender) {
      await Page.afterRender(container); // Pass container here
    }
  } catch (error) {
    console.error("Error rendering page:", error);
    container.innerHTML = "<h1>Error loading page</h1>";
  }
};

// Enhanced navigation setup
const setupNavigation = () => {
  // Handle login button
  document
    .querySelector(".btn-login-navbar")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = "#/login";
    });

  // Handle back button in login page
  document.addEventListener("click", (e) => {
    if (e.target.closest("#back-to-landing")) {
      e.preventDefault();
      window.location.hash = "#/";
    }
  });
};

window.addEventListener("hashchange", renderPage);
window.addEventListener("load", () => {
  renderPage();
  setupNavigation();
});