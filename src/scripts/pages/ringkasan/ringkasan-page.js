import { html, render } from 'lit-html';
import RingkasanPresenter from './ringkasan-presenter.js';

const RingkasanPage = {
  render(container) {
    const template = html`
      <div class="ringkasan-container">
        <h1>Ringkasan</h1>
        <div class="tabs">
          <button class="tab-button" @click="${() => this.showTab('favorit')}">Favorit</button>
          <button class="tab-button" @click="${() => this.showTab('minat')}">Minat Anda</button>
          <button class="tab-button" @click="${() => this.showTab('riwayat')}">Riwayat</button>
        </div>

        <div class="tab-content" id="favorit">
          <h2>Favorit</h2>
          <p>Konten favorit Anda...</p>
        </div>

        <div class="tab-content" id="minat" style="display:none">
          <h2>Minat Anda</h2>
          <p>Konten minat Anda...</p>
        </div>

        <div class="tab-content" id="riwayat" style="display:none">
          <h2>Riwayat</h2>
          <p>Konten riwayat Anda...</p>
        </div>
      </div>
    `;

    render(template, container);
  },

  showTab(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.style.display = 'none');

    const activeTab = document.getElementById(tabName);
    activeTab.style.display = 'block';
  }
};

export default RingkasanPage;
