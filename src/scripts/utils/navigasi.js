// src/scripts/utils/navigation.js
import { renderPage } from "../router/router.js"; // pastikan path ke router.js sesuai

export function navigateTo(hash) {
  if (window.location.hash !== hash) {
    window.location.hash = hash;
  } else {
    renderPage(); // paksa render ulang jika hash sudah sama
  }
}
