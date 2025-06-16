// src/scripts/router/renderPage.js
import { getCurrentPage } from "../router/router.js";
import { updateNavbar } from "../app.js";
import AOS from "aos"; // pastikan sudah terinstall dan diinisialisasi di app.js

export async function renderPage() {
  const container = document.getElementById("main-content");
  if (!container) return;

  const current = getCurrentPage();
  if (!current) return;

  const { Page } = current;

  const doRender = async () => {
    container.innerHTML = await Page.render();
    if (Page.afterRender) await Page.afterRender();
    updateNavbar();
    AOS.refresh(); // ini penting agar animasi scroll tetap aktif setelah ganti halaman
  };

  if (document.startViewTransition) {
    document.startViewTransition(doRender);
  } else {
    await doRender();
  }
}
