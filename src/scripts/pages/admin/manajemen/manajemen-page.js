const ManajemenPage = {
  async render() {
    return `
      <section class="manajemen-wrapper">
        <div class="manajemen-inner"
          <!-- Navigasi tab -->
          <nav class="tab-menu" role="tablist">
            <a href="#" id="showWelcome" class="tab-link active" role="tab" aria-selected="true">Manajemen Konten</a>
            <a href="#" id="showWaiting" class="tab-link" role="tab" aria-selected="false">Waiting List</a>
          </nav>

          <!-- Isi konten tab -->
          <div class="manajemen-content">
            <!-- Tampilan Beranda -->
            <div id="welcomeView" class="view-section" role="tabpanel">
              <div class="view-content">
                <h2>Manajemen Konten</h2>
                <p>Selamat datang di halaman admin. Silakan kelola data cerita rakyat dari sini.</p>
              </div>
            </div>

            <!-- Tampilan Waiting List -->
            <div id="waitingView" class="view-section hidden" role="tabpanel" aria-hidden="true">
              <div class="view-content">
                <h2>Daftar Cerita Menunggu Persetujuan</h2>
                <p>(Belum ada cerita masuk)</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    `;
  },

  async afterRender() {
    const welcomeBtn = document.getElementById("showWelcome");
    const waitingBtn = document.getElementById("showWaiting");
    const welcomeView = document.getElementById("welcomeView");
    const waitingView = document.getElementById("waitingView");

    welcomeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      welcomeView.classList.remove("hidden");
      waitingView.classList.add("hidden");

      welcomeBtn.classList.add("active");
      waitingBtn.classList.remove("active");

      welcomeBtn.setAttribute("aria-selected", "true");
      waitingBtn.setAttribute("aria-selected", "false");

      welcomeView.setAttribute("aria-hidden", "false");
      waitingView.setAttribute("aria-hidden", "true");
    });

    waitingBtn.addEventListener("click", (e) => {
      e.preventDefault();
      welcomeView.classList.add("hidden");
      waitingView.classList.remove("hidden");

      welcomeBtn.classList.remove("active");
      waitingBtn.classList.add("active");

      welcomeBtn.setAttribute("aria-selected", "false");
      waitingBtn.setAttribute("aria-selected", "true");

      welcomeView.setAttribute("aria-hidden", "true");
      waitingView.setAttribute("aria-hidden", "false");
    });
  },
};

export default ManajemenPage;
