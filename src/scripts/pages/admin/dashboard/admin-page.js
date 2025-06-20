
import { html, render } from 'lit-html';
import AdminPresenter from "../dashboard/admin-presenter.js";
import { BASE_URL } from '../../../api/api.js';

const AdminPage = {
  weeklyData: [],
  allStories: [],
  chartInstance: null,
  autoRefreshInterval: null,

  async render() {
    const totalCerita = await AdminPresenter.getTotalCerita();
    const totalWaiting = await AdminPresenter.getTotalWaitingList();

    // Ambil semua cerita
    this.allStories = await AdminPresenter.getAllStories();

    // Ambil 2 cerita terbaru berdasarkan tanggal
    const recentStories = this.allStories
      .slice()
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 2);

    // Template cerita terbaru
    const recentHtml = recentStories.length > 0
      ? recentStories.map(story => {
          const shortDesc = story.deskripsi || "Deskripsi tidak tersedia";
          const imageUrl = `${BASE_URL.replace('/api/auth', '')}/uploads/${story.gambar}`;
          return html`
            <div class="recent-card">
              <img src="${imageUrl}" alt="Gambar cerita ${story.judul}" class="recent-image" />
              <h4>${story.judul}</h4>
              <p class="region">${story.lokasi}</p>
              <p class="desc">${shortDesc}</p>
            </div>
          `;
        })
      : html`<p>Tidak ada cerita terbaru</p>`;

    // Template utama halaman admin
    return html`
      <section class="admin-dashboard">
        <!-- Statistik Garis -->
        <div class="chart-section">
          <h2 class="chart-title">Statistik Mingguan</h2>
          <div class="chart-wrapper">
            <canvas id="weeklyChart"></canvas>  
          </div>
        </div>

        <!-- Statistik Angka -->
        <div class="stat-grid-1">
          <a href="#/manajemen?tab=konten" class="stat-card stat-link">
            <div class="stat-content">
              <div>
                <h3>Jumlah Cerita</h3>
                <p class="stat-value">${totalCerita}</p>
              </div>
              <svg class="arrow-circle-icon" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 8l4 4-4 4" />
              </svg>
            </div>
          </a>
          <a href="#/manajemen?tab=waiting" class="stat-card stat-link">
            <div class="stat-content">
               <div>
                <h3>Cerita Masuk (Waiting)</h3>
                <p class="stat-value">${totalWaiting}</p>
              </div>
              <svg class="arrow-circle-icon" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 8l4 4-4 4" />
              </svg>
            </div>
          </a>
        </div>
        
        <div class="stat-grid-2">
          <div class="stat-card">
            <h3>User Aktif</h3>
            <p class="stat-value">85</p>
          </div>
          <div class="stat-card">
            <h3>Penulis Aktif</h3>
            <p class="stat-value">20</p>
          </div>
        </div>

        <!-- Cerita Terbaru -->
        <div class="recent-section">
          <h2 class="recent-title">Cerita Terbaru (ACC)</h2>
          <div class="recent-grid">
            ${recentHtml}
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // Render awal ke container
    
    const container = document.getElementById('main-content');
    render(await this.render(), container);

    // Tunggu canvas siap
    await new Promise((resolve) => {
      const check = () => {
        const canvas = document.getElementById("weeklyChart");
        if (canvas && canvas.offsetParent !== null) resolve();
        else setTimeout(check, 50);
      };
      check();
    });

    // Ambil data tanggal cerita untuk chart statistik
    const tanggalCerita = await AdminPresenter.getWeeklyCeritaData();
    this.weeklyData = this.processWeeklyData(tanggalCerita);

    // Load Chart.js kalau belum ada
    if (!window.Chart) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js";
      script.onload = () => this.renderChart();
      document.head.appendChild(script);
    } else {
      this.renderChart();
    }

    this.startAutoRefresh();
  },

  async refreshData() {
    // Update data cerita
    this.allStories = await AdminPresenter.getAllStories();
    
    // Re-render dengan data terbaru
    const container = document.getElementById('main-content');
    render(await this.render(), container);

    // Render ulang chart data
    const tanggalCerita = await AdminPresenter.getWeeklyCeritaData();
    this.weeklyData = this.processWeeklyData(tanggalCerita);
    this.renderChart();
  },

  processWeeklyData(tanggalCerita) {
    const counts = new Array(7).fill(0);
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(now.getDate() - diffToMonday);

    tanggalCerita.forEach((isoDateStr) => {
      const date = new Date(isoDateStr);
      date.setHours(0, 0, 0, 0);
      if (date >= monday && date <= new Date(monday.getTime() + 6 * 86400000)) {
        const index = (date.getDay() + 6) % 7; // Senin index 0
        counts[index]++;
      }
    });

    return counts;
  },

  renderChart() {
    const canvas = document.getElementById("weeklyChart");
    if (!canvas) return;

    if (this.chartInstance) this.chartInstance.destroy();

    const ctx = canvas.getContext("2d");
    this.chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
        datasets: [{
          label: "Cerita Masuk",
          data: this.weeklyData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.3,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "top" } },
        scales: { y: { beginAtZero: true } },
      },
    });
  },

  startAutoRefresh() {
    if (this.autoRefreshInterval) clearInterval(this.autoRefreshInterval);

    this.autoRefreshInterval = setInterval(async () => {
      console.log("Auto refresh data...");
      await this.refreshData();
    }, 30000);
  }
};

export default AdminPage;










// import { html, render } from 'lit-html';
// import AdminPresenter from "../dashboard/admin-presenter.js";
// import { BASE_URL } from '../../../api/api.js';

// const AdminPage = {
//   weeklyData: [],
//   allStories: [],
//   chartInstance: null,
//   autoRefreshInterval: null,

//   async render() {
//     const totalCerita = await AdminPresenter.getTotalCerita();
//     const totalWaiting = await AdminPresenter.getTotalWaitingList();

//     // Ambil semua cerita dan filter hanya yang approved
//     const all = await AdminPresenter.getAllStories();
//     this.allStories = all.filter(story => story.status === "approved");

//     // Ambil 2 cerita terbaru berdasarkan tanggal
//     const recentStories = this.allStories
//       .slice()
//       .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//       .slice(0, 2);

//     // Template cerita terbaru
//     const recentHtml = recentStories.length > 0
//       ? recentStories.map(story => {
//           const shortDesc = story.deskripsi || "Deskripsi tidak tersedia";
//           const imageUrl = `${BASE_URL.replace('/api/auth', '')}/uploads/${story.gambar}`;
//           return html`
//             <div class="recent-card">
//               <img src="${imageUrl}" alt="Gambar cerita ${story.judul}" class="recent-image" />
//               <h4>${story.judul}</h4>
//               <p class="region">${story.lokasi}</p>
//               <p class="desc">${shortDesc}</p>
//             </div>
//           `;
//         })
//       : html`<p>Tidak ada cerita terbaru</p>`;

//     // Template utama halaman admin
//     return html`
//       <section class="admin-dashboard">
//         <!-- Statistik Garis -->
//         <div class="chart-section">
//           <h2 class="chart-title">Statistik Mingguan</h2>
//           <div class="chart-wrapper">
//             <canvas id="weeklyChart"></canvas>  
//           </div>
//         </div>

//         <!-- Statistik Angka -->
//         <div class="stat-grid-1">
//           <a href="#/manajemen?tab=konten" class="stat-card stat-link">
//             <div class="stat-content">
//               <div>
//                 <h3>Jumlah Cerita</h3>
//                 <p class="stat-value">${totalCerita}</p>
//               </div>
//               <svg class="arrow-circle-icon" xmlns="http://www.w3.org/2000/svg" fill="none"
//                 viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//                 <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none"/>
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M10 8l4 4-4 4" />
//               </svg>
//             </div>
//           </a>
//           <a href="#/manajemen?tab=waiting" class="stat-card stat-link">
//             <div class="stat-content">
//                <div>
//                 <h3>Cerita Masuk (Waiting)</h3>
//                 <p class="stat-value">${totalWaiting}</p>
//               </div>
//               <svg class="arrow-circle-icon" xmlns="http://www.w3.org/2000/svg" fill="none"
//                 viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//                 <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none"/>
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M10 8l4 4-4 4" />
//               </svg>
//             </div>
//           </a>
//         </div>
        
//         <div class="stat-grid-2">
//           <div class="stat-card">
//             <h3>User Aktif</h3>
//             <p class="stat-value">85</p>
//           </div>
//           <div class="stat-card">
//             <h3>Penulis Aktif</h3>
//             <p class="stat-value">20</p>
//           </div>
//         </div>

//         <!-- Cerita Terbaru -->
//         <div class="recent-section">
//           <h2 class="recent-title">Cerita Terbaru (ACC)</h2>
//           <div class="recent-grid">
//             ${recentHtml}
//           </div>
//         </div>
//       </section>
//     `;
//   },

//   async afterRender() {
//     const container = document.getElementById('main-content');
//     render(await this.render(), container);

//     await new Promise((resolve) => {
//       const check = () => {
//         const canvas = document.getElementById("weeklyChart");
//         if (canvas && canvas.offsetParent !== null) resolve();
//         else setTimeout(check, 50);
//       };
//       check();
//     });

//     const tanggalCerita = await AdminPresenter.getWeeklyCeritaData();
//     this.weeklyData = this.processWeeklyData(tanggalCerita);

//     if (!window.Chart) {
//       const script = document.createElement("script");
//       script.src = "https://cdn.jsdelivr.net/npm/chart.js";
//       script.onload = () => this.renderChart();
//       document.head.appendChild(script);
//     } else {
//       this.renderChart();
//     }

//     this.startAutoRefresh();
//   },

//   async refreshData() {
//     const all = await AdminPresenter.getAllStories();
//     this.allStories = all.filter(story => story.status === "approved");

//     const container = document.getElementById('main-content');
//     render(await this.render(), container);

//     const tanggalCerita = await AdminPresenter.getWeeklyCeritaData();
//     this.weeklyData = this.processWeeklyData(tanggalCerita);
//     this.renderChart();
//   },

//   processWeeklyData(tanggalCerita) {
//     const counts = new Array(7).fill(0);
//     const now = new Date();
//     const dayOfWeek = now.getDay();
//     const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
//     const monday = new Date(now);
//     monday.setHours(0, 0, 0, 0);
//     monday.setDate(now.getDate() - diffToMonday);

//     tanggalCerita.forEach((isoDateStr) => {
//       const date = new Date(isoDateStr);
//       date.setHours(0, 0, 0, 0);
//       if (date >= monday && date <= new Date(monday.getTime() + 6 * 86400000)) {
//         const index = (date.getDay() + 6) % 7;
//         counts[index]++;
//       }
//     });

//     return counts;
//   },

//   renderChart() {
//     const canvas = document.getElementById("weeklyChart");
//     if (!canvas) return;

//     if (this.chartInstance) this.chartInstance.destroy();

//     const ctx = canvas.getContext("2d");
//     this.chartInstance = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
//         datasets: [{
//           label: "Cerita Masuk",
//           data: this.weeklyData,
//           borderColor: "rgba(75, 192, 192, 1)",
//           backgroundColor: "rgba(75, 192, 192, 0.2)",
//           tension: 0.3,
//           fill: true,
//         }],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: { legend: { position: "top" } },
//         scales: { y: { beginAtZero: true } },
//       },
//     });
//   },

//   startAutoRefresh() {
//     if (this.autoRefreshInterval) clearInterval(this.autoRefreshInterval);

//     this.autoRefreshInterval = setInterval(async () => {
//       console.log("Auto refresh data...");
//       await this.refreshData();
//     }, 30000);
//   }
// };

// export default AdminPage;
