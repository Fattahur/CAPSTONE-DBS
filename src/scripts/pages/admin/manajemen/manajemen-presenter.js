import { BASE_URL } from "../../../api/api.js";

const ManajemenPresenter = {
  async fetchDataCerita() {
    try {
      const response = await fetch(`${BASE_URL}/semua-cerita`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Accept: "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response not ok");
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error("Gagal mengambil data cerita:", error);
      return [];
    }
  },

  generateDataTable(data) {
    $("#kontenTable").DataTable({
      language: { emptyTable: "Belum ada konten yang tersedia." },
      destroy: true,
      paging: false,
      info: false,
      lengthChange: false,
      data: data.map((item, index) => [
        index + 1,
        `<img src="${BASE_URL.replace("/api/auth", "")}/uploads/${item.gambar}" alt="${item.judul}" width="200" />`,
        item.judul,
        item.nama_user,
        `<button class="action-btn delete-story" data-id="${item.id}">🗑️ Hapus</button>`,
      ]),
      columns: [
        { title: "No" },
        { title: "Gambar" },
        { title: "Judul" },
        { title: "Penulis" },
        { title: "Aksi" },
      ],
    });

    $("#kontenTable tbody")
      .off("click")
      .on("click", ".delete-story", async function () {
        const id = $(this).data("id");
        const konfirmasi = confirm("Yakin ingin menghapus cerita ini?");
        if (!konfirmasi) return;

        try {
          const response = await fetch(`${BASE_URL}/cerita/${id}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
            },
          });

          if (!response.ok) throw new Error("Gagal menghapus data");
          alert("Cerita berhasil dihapus.");

          const newData = await ManajemenPresenter.fetchDataCerita();
          ManajemenPresenter.generateDataTable(newData);
        } catch (error) {
          console.error("Gagal menghapus:", error);
          alert("Terjadi kesalahan saat menghapus cerita.");
        }
      });
  },

  async fetchWaitingList() {
    try {
      const response = await fetch(`${BASE_URL}/waiting-list`, {
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response not ok");
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error("Gagal mengambil waiting list:", error);
      return [];
    }
  },

  generateWaitingTable(data) {
    const tableBodySelector = "#waitingTable tbody";

    $("#waitingTable").DataTable({
      language: { emptyTable: "Belum ada data waiting list." },
      destroy: true,
      paging: false,
      info: false,
      lengthChange: false,
      data: data.map((item) => [
        item.id_cerita,
        item.judul,
        item.deskripsi,
        item.sentiment,
        `
          <button class="action-btn approve-story" data-id="${item.id_cerita}">✅ Setujui</button>
          <button class="action-btn reject-story" data-id="${item.id_cerita}">❌ Tolak</button>
        `,
      ]),
      columns: [
        { title: "Id Cerita" },
        { title: "Judul Cerita" },
        { title: "Deskripsi" },
        { title: "Sentiment" },
        { title: "Aksi", orderable: false },
      ],
    });

    $(tableBodySelector)
      .off("click")
      .on("click", ".approve-story, .reject-story", async function () {
        const id = $(this).data("id");
        const isApprove = $(this).hasClass("approve-story");
        const row = $(this).closest("tr");
        const sentiment = row.find("td:nth-child(4)").text().trim();

        const statusValue = isApprove ? "approved" : "rejected";
        const konfirmasi = confirm(`Yakin ingin ${statusValue} cerita ini?`);
        if (!konfirmasi) return;

        try {
          const response = await fetch(`${BASE_URL}/cerita/${id}/status`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              status: statusValue,
              sentiment,
              skor: 0.85,
            }),
          });

          if (!response.ok) throw new Error("Gagal update status");
          alert(`Cerita berhasil ${statusValue}.`);

          // Refresh jumlah cerita jika disetujui
          if (isApprove) {
            const jumlahRes = await fetch(`${BASE_URL}/jumlah-cerita`, {
              headers: { Accept: "application/json" },
            });

            if (!jumlahRes.ok) throw new Error("Gagal ambil jumlah cerita");
            const jumlahData = await jumlahRes.json();
            console.log("Jumlah cerita terbaru:", jumlahData.jumlah);

            // Jika kamu punya elemen jumlah di UI
            const elemenJumlah = document.getElementById("jumlah-cerita");
            if (elemenJumlah) {
              elemenJumlah.textContent = jumlahData.jumlah;
            }
          }

          // Refresh tabel waiting list
          const updated = await ManajemenPresenter.fetchWaitingList();
          ManajemenPresenter.generateWaitingTable(updated);
        } catch (err) {
          console.error("Kesalahan saat update status:", err);
          alert("Terjadi kesalahan saat memproses permintaan.");
        }
      });
  },
};

export default ManajemenPresenter;
