const ManajemenPage = {
  async render() {
    return `
      <section class="manajemen-wrapper">
        <div class="manajemen-inner">
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
              <div class="view-content-header">
              </div>
              <div class="view-content-table">
                <table id="waitingTable" class="display" style="width:100%">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Judul Cerita</th>
                      <th>Pengirim</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Kosong dulu, nanti isi dinamis -->
                  </tbody>
                </table>
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

    function switchTab(activeBtn, inactiveBtn, showView, hideView) {
      showView.classList.remove("hidden");
      hideView.classList.add("hidden");

      activeBtn.classList.add("active");
      inactiveBtn.classList.remove("active");

      activeBtn.setAttribute("aria-selected", "true");
      inactiveBtn.setAttribute("aria-selected", "false");

      showView.setAttribute("aria-hidden", "false");
      hideView.setAttribute("aria-hidden", "true");
    }

    welcomeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      switchTab(welcomeBtn, waitingBtn, welcomeView, waitingView);
    });

    waitingBtn.addEventListener("click", (e) => {
      e.preventDefault();
      switchTab(waitingBtn, welcomeBtn, waitingView, welcomeView);
    });

    // Inisialisasi DataTables
    $('#waitingTable').DataTable({
      language: {
        emptyTable: "Belum ada cerita yang menunggu persetujuan."
      }
    });
  },
};

export default ManajemenPage;
