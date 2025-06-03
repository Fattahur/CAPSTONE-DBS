const AdminPage = {
  async render() {
    return `
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
          <div class="stat-card">
            <h3>Jumlah Cerita</h3>
            <p class="stat-value">120</p>
          </div>
          <div class="stat-card">
            <h3>Cerita Masuk</h3>
            <p class="stat-value">15</p>
          </div>
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
            <div class="recent-card">
              <h4>Legenda Gunung Bromo</h4>
              <p class="region">Jawa Timur</p>
              <p class="desc">Cerita tentang asal usul Gunung Bromo yang terkenal di kalangan masyarakat Tengger.</p>
            </div>
            <div class="recent-card">
              <h4>Asal Usul Danau Toba</h4>
              <p class="region">Sumatera Utara</p>
              <p class="desc">Kisah rakyat yang menceritakan terbentuknya Danau Toba dan pulau Samosir.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // Tunggu sampai canvas ada di DOM
    await new Promise((resolve) => {
      const check = () => {
        const canvas = document.getElementById("weeklyChart");
        if (canvas && canvas.offsetParent !== null) resolve();
        else setTimeout(check, 50);
      };
      check();
    });

    // Load Chart.js jika belum ada
    if (!window.Chart) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js";
      script.onload = () => this.renderChart();
      document.head.appendChild(script);
    } else {
      this.renderChart();
    }
  },

  renderChart() {
    const canvas = document.getElementById("weeklyChart");
    if (!canvas) return;

    // Hapus chart lama
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const ctx = canvas.getContext("2d");
    this.chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Senin",
          "Selasa",
          "Rabu",
          "Kamis",
          "Jumat",
          "Sabtu",
          "Minggu",
        ],
        datasets: [
          {
            label: "Cerita Masuk",
            data: [5, 3, 7, 6, 2, 4, 8],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.3,
            fill: true,
          },
          // Kamu bisa tambah dataset lain di sini kalau perlu
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  },
};

export default AdminPage;
