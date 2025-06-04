import ManajemenPresenter from '../manajemen/manajemen-presenter.js';

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
            <!-- Tampilan Manajemen Konten -->
            <div id="welcomeView" class="view-section" role="tabpanel">
              <div class="view-content">
                <!-- DataTable untuk Manajemen Konten -->
                <div class="view-content-table">
                  <table id="kontenTable" class="display" style="width:100%">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Gambar</th>
                        <th>Judul</th>
                        <th>Penulis</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- Data dinamis akan diisi DataTable -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Tampilan Waiting List -->
            <div id="waitingView" class="view-section hidden" role="tabpanel" aria-hidden="true">
              <div class="view-content-header"></div>
              <div class="view-content-table">
                <table id="waitingTable" class="display" style="width:100%">
                  <thead>
                    <tr>
                      <th>Id Cerita</th>
                      <th>Judul Cerita</th>
                      <th>Pengirim</th>
                      <th>Pengirim</th>
                      <th>Pengirim</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Data dinamis nanti diisi di presenter jika ada -->
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

  // Cek query param tab dari URL hash
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
  const tab = urlParams.get("tab");

  if (tab === "waiting") {
    switchTab(waitingBtn, welcomeBtn, waitingView, welcomeView);
  } else {
    switchTab(welcomeBtn, waitingBtn, welcomeView, waitingView);
  }

  // Ambil data cerita dan inisialisasi DataTable
  const dataCerita = await ManajemenPresenter.fetchDataCerita();
  ManajemenPresenter.generateDataTable(dataCerita);

  // Ambil data waiting list dan inisialisasi DataTable
  const waitingData = await ManajemenPresenter.fetchWaitingList();
  ManajemenPresenter.generateWaitingTable(waitingData);
},

};

export default ManajemenPage;


