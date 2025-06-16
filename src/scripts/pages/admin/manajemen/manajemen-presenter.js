
// import { BASE_URL } from "../../../api/api.js";
// import ModelApiService from "../../../models/sentimentModel.js"; // sesuaikan path sesuai struktur kamu
// import { showPopup, showConfirm } from "../../../toast/popup.js";


// const ManajemenPresenter = {
//   async fetchDataCerita() {
//     try {
//       const response = await fetch(`${BASE_URL}/semua-cerita`, {
//         headers: {
//           "ngrok-skip-browser-warning": "true",
//           Accept: "application/json",
//         },
//       });
//       if (!response.ok) throw new Error("Network response not ok");
//       const result = await response.json();
//       return result.data || [];
//     } catch (error) {
//       showPopup.error("Gagal mengambil data cerita:", error);
//       return [];
//     }
//   },

//   generateDataTable(data) {
//     $("#kontenTable").DataTable({
//       language: { emptyTable: "Belum ada konten yang tersedia." },
//       destroy: true,
//       paging: false,
//       info: false,
//       lengthChange: false,
//       data: data.map((item, index) => [
//         index + 1,
//         `<img src="${BASE_URL.replace("/api/auth", "")}/uploads/${item.gambar}" alt="${item.judul}" width="200" />`,
//         item.judul,
//         item.nama_user,
//         `<button class="action-btn delete-story" data-id="${item.id}">🗑️ Hapus</button>`,
//       ]),
//       columns: [
//         { title: "No" },
//         { title: "Gambar" },
//         { title: "Judul" },
//         { title: "Penulis" },
//         { title: "Aksi" },
//       ],
//     });

//     $("#kontenTable tbody")
//       .off("click")
//       .on("click", ".delete-story", async function () {
//         const id = $(this).data("id");
//         const konfirmasi = confirm("Yakin ingin menghapus cerita ini?");
//         if (!konfirmasi) return;

//         try {
//           const response = await fetch(`${BASE_URL}/cerita/${id}`, {
//             method: "DELETE",
//             headers: {
//               Accept: "application/json",
//             },
//           });

//           if (!response.ok) throw new Error("Gagal menghapus data");
//           showPopup("Cerita berhasil dihapus.");

//           const newData = await ManajemenPresenter.fetchDataCerita();
//           ManajemenPresenter.generateDataTable(newData);
//         } catch (error) {
//           console.error("Gagal menghapus:", error);
//           showPopup("Terjadi kesalahan saat menghapus cerita.");
//         }
//       });
//   },



// async fetchWaitingList() {
//   try {
//     const response = await fetch(`${BASE_URL}/waiting-list`, {
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     if (!response.ok) throw new Error("Network response not ok");
//     const result = await response.json();
//     const waitingList = result.data || [];

//     for (const item of waitingList) {
//       if (!item.sentiment || item.sentiment === "Belum dianalisis") {
//         try {
//           const sentimentResult = await ModelApiService.predictSentiment(item.deskripsi);
//           item.sentiment = sentimentResult.sentiment;
//         } catch (modelErr) {
//           console.error(`Gagal analisis sentimen untuk ID ${item.id_cerita}:`, modelErr);
//           item.sentiment = "Error";
//         }
//       }
//     }

//     return waitingList;
//   } catch (error) {
//     console.error("Gagal mengambil waiting list:", error);
//     return [];
//   }
// }
// ,


//   generateWaitingTable(data) {
//     const tableBodySelector = "#waitingTable tbody";

//     $("#waitingTable").DataTable({
//       language: { emptyTable: "Belum ada data waiting list." },
//       destroy: true,
//       paging: false,
//       info: false,
//       lengthChange: false,
//       data: data.map((item) => [
//         item.id_cerita,
//         item.judul,
//         item.deskripsi,
//         item.sentiment || "Belum dianalisis",
//         `
//           <button class="action-btn approve-story" data-id="${item.id_cerita}" ${!item.sentiment || item.sentiment === "Belum dianalisis" ? 'disabled title="Menunggu analisis sentimen..."' : ''}>✅ Setujui</button>
//           <button class="action-btn reject-story" data-id="${item.id_cerita}" ${!item.sentiment || item.sentiment === "Belum dianalisis" ? 'disabled title="Menunggu analisis sentimen..."' : ''}>❌ Tolak</button>
//         `,
//       ]),
//       columns: [
//         { title: "Id Cerita" },
//         { title: "Judul Cerita" },
//         { title: "Deskripsi" },
//         { title: "Sentiment" },
//         { title: "Aksi", orderable: false },
//       ],
//     });

//     $(tableBodySelector)
//       .off("click")
//       .on("click", ".approve-story, .reject-story", async function () {
//         const id = $(this).data("id");
//         const isApprove = $(this).hasClass("approve-story");
//         const row = $(this).closest("tr");
//         const sentiment = row.find("td:nth-child(4)").text().trim();

//         if (sentiment === "Belum dianalisis" || sentiment === "Error") {
//           showPopup("Sentimen belum tersedia. Harap periksa kembali data.");
//           return;
//         }

//         const statusValue = isApprove ? "approved" : "rejected";
//         const konfirmasi = confirm(`Yakin ingin ${statusValue} cerita ini?`);
//         if (!konfirmasi) return;

//         try {
//           const response = await fetch(`${BASE_URL}/cerita/${id}/status`, {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//             },
//             body: JSON.stringify({
//               status: statusValue,
//               sentiment,
//               skor: 0.85,
//             }),
//           });

//           if (!response.ok) throw new Error("Gagal update status");
//           showPopup(`Cerita berhasil ${statusValue}.`);

//           // Refresh jumlah cerita
//           const jumlahRes = await fetch(`${BASE_URL}/jumlah-cerita`, {
//             headers: { Accept: "application/json" },
//           });

//           if (!jumlahRes.ok) throw new Error("Gagal ambil jumlah cerita");
//           const jumlahData = await jumlahRes.json();
//           const elemenJumlah = document.getElementById("jumlah-cerita");
//           if (elemenJumlah) {
//             elemenJumlah.textContent = jumlahData.jumlah;
//           }

//           // Refresh tabel waiting list
//           const updated = await ManajemenPresenter.fetchWaitingList();
//           ManajemenPresenter.generateWaitingTable(updated);

//           // Refresh tabel konten cerita
//           const dataCeritaBaru = await ManajemenPresenter.fetchDataCerita();
//           ManajemenPresenter.generateDataTable(dataCeritaBaru);

//         } catch (err) {
//           console.error("Kesalahan saat update status:", err);
//           alert("Terjadi kesalahan saat memproses permintaan.");
//         }
//       });
//   },
// };

// export default ManajemenPresenter;







import { BASE_URL } from "../../../api/api.js";
import ModelApiService from "../../../models/sentimentModel.js";
import { showPopup, showConfirm } from "../../../toast/popup.js";

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
      showPopup({ message: "Gagal mengambil data cerita.", type: "danger" });
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

        const konfirmasi = await showConfirm({
          message: "Yakin ingin menghapus cerita ini?",
          confirmText: "Hapus",
          cancelText: "Batal"
        });
        if (!konfirmasi) return;

        try {
          const response = await fetch(`${BASE_URL}/cerita/${id}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
            },
          });

          if (!response.ok) throw new Error("Gagal menghapus data");
          showPopup({ message: "Cerita berhasil dihapus.", type: "success" });

          const newData = await ManajemenPresenter.fetchDataCerita();
          ManajemenPresenter.generateDataTable(newData);
        } catch (error) {
          console.error("Gagal menghapus:", error);
          showPopup({ message: "Terjadi kesalahan saat menghapus cerita.", type: "danger" });
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
      const waitingList = result.data || [];

      for (const item of waitingList) {
        if (!item.sentiment || item.sentiment === "Belum dianalisis") {
          try {
            const sentimentResult = await ModelApiService.predictSentiment(item.deskripsi);
            item.sentiment = sentimentResult.sentiment;
          } catch (modelErr) {
            console.error(`Gagal analisis sentimen untuk ID ${item.id_cerita}:`, modelErr);
            item.sentiment = "Error";
          }
        }
      }

      return waitingList;
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
        item.sentiment || "Belum dianalisis",
        `
          <button class="action-btn approve-story" data-id="${item.id_cerita}" ${!item.sentiment || item.sentiment === "Belum dianalisis" ? 'disabled title="Menunggu analisis sentimen..."' : ''}>✅ Setujui</button>
          <button class="action-btn reject-story" data-id="${item.id_cerita}" ${!item.sentiment || item.sentiment === "Belum dianalisis" ? 'disabled title="Menunggu analisis sentimen..."' : ''}>❌ Tolak</button>
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

        if (sentiment === "Belum dianalisis" || sentiment === "Error") {
          showPopup({ message: "Sentimen belum tersedia. Harap periksa kembali data.", type: "warning" });
          return;
        }

        const statusValue = isApprove ? "approved" : "rejected";
        const konfirmasi = await showConfirm({
          message: `Yakin ingin ${statusValue} cerita ini?`,
          confirmText: isApprove ? "Setujui" : "Tolak",
          cancelText: "Batal"
        });
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
          showPopup({ message: `Cerita berhasil ${statusValue}.`, type: "success" });

          // Refresh jumlah cerita
          const jumlahRes = await fetch(`${BASE_URL}/jumlah-cerita`, {
            headers: { Accept: "application/json" },
          });

          if (!jumlahRes.ok) throw new Error("Gagal ambil jumlah cerita");
          const jumlahData = await jumlahRes.json();
          const elemenJumlah = document.getElementById("jumlah-cerita");
          if (elemenJumlah) {
            elemenJumlah.textContent = jumlahData.jumlah;
          }

          // Refresh tabel waiting list
          const updated = await ManajemenPresenter.fetchWaitingList();
          ManajemenPresenter.generateWaitingTable(updated);

          // Refresh tabel konten cerita
          const dataCeritaBaru = await ManajemenPresenter.fetchDataCerita();
          ManajemenPresenter.generateDataTable(dataCeritaBaru);
        } catch (err) {
          console.error("Kesalahan saat update status:", err);
          showPopup({ message: "Terjadi kesalahan saat memproses permintaan.", type: "danger" });
        }
      });
  },
};

export default ManajemenPresenter;






















// import { BASE_URL } from "../../../api/api.js";

// const ManajemenPresenter = {
//   async fetchDataCerita() {
//     try {
//       const response = await fetch(`${BASE_URL}/semua-cerita`, {
//         headers: {
//           "ngrok-skip-browser-warning": "true",
//           Accept: "application/json",
//         },
//       });
//       if (!response.ok) throw new Error("Network response not ok");
//       const result = await response.json();
//       return result.data || [];
//     } catch (error) {
//       console.error("Gagal mengambil data cerita:", error);
//       return [];
//     }
//   },

//   generateDataTable(data) {
//     $("#kontenTable").DataTable({
//       language: { emptyTable: "Belum ada konten yang tersedia." },
//       destroy: true,
//       paging: false,
//       info: false,
//       lengthChange: false,
//       data: data.map((item, index) => [
//         index + 1,
//         `<img src="${BASE_URL.replace("/api/auth", "")}/uploads/${item.gambar}" alt="${item.judul}" width="200" />`,
//         item.judul,
//         item.nama_user,
//         `<button class="action-btn delete-story" data-id="${item.id}">🗑️ Hapus</button>`,
//       ]),
//       columns: [
//         { title: "No" },
//         { title: "Gambar" },
//         { title: "Judul" },
//         { title: "Penulis" },
//         { title: "Aksi" },
//       ],
//     });

//     $("#kontenTable tbody")
//       .off("click")
//       .on("click", ".delete-story", async function () {
//         const id = $(this).data("id");
//         const konfirmasi = confirm("Yakin ingin menghapus cerita ini?");
//         if (!konfirmasi) return;

//         try {
//           const response = await fetch(`${BASE_URL}/cerita/${id}`, {
//             method: "DELETE",
//             headers: {
//               Accept: "application/json",
//             },
//           });

//           if (!response.ok) throw new Error("Gagal menghapus data");
//           alert("Cerita berhasil dihapus.");

//           const newData = await ManajemenPresenter.fetchDataCerita();
//           ManajemenPresenter.generateDataTable(newData);
//         } catch (error) {
//           console.error("Gagal menghapus:", error);
//           alert("Terjadi kesalahan saat menghapus cerita.");
//         }
//       });
//   },

//   async fetchWaitingList() {
//     try {
//       const response = await fetch(`${BASE_URL}/waiting-list`, {
//         headers: {
//           Accept: "application/json",
//         },
//       });
//       if (!response.ok) throw new Error("Network response not ok");
//       const result = await response.json();
//       return result.data || [];
//     } catch (error) {
//       console.error("Gagal mengambil waiting list:", error);
//       return [];
//     }
//   },

//   generateWaitingTable(data) {
//     const tableBodySelector = "#waitingTable tbody";

//     $("#waitingTable").DataTable({
//       language: { emptyTable: "Belum ada data waiting list." },
//       destroy: true,
//       paging: false,
//       info: false,
//       lengthChange: false,
//       data: data.map((item) => [
//         item.id_cerita,
//         item.judul,
//         item.deskripsi,
//         item.sentiment,
//         `
//           <button class="action-btn approve-story" data-id="${item.id_cerita}">✅ Setujui</button>
//           <button class="action-btn reject-story" data-id="${item.id_cerita}">❌ Tolak</button>
//         `,
//       ]),
//       columns: [
//         { title: "Id Cerita" },
//         { title: "Judul Cerita" },
//         { title: "Deskripsi" },
//         { title: "Sentiment" },
//         { title: "Aksi", orderable: false },
//       ],
//     });

//     $(tableBodySelector)
//       .off("click")
//       .on("click", ".approve-story, .reject-story", async function () {
//         const id = $(this).data("id");
//         const isApprove = $(this).hasClass("approve-story");
//         const row = $(this).closest("tr");
//         const sentiment = row.find("td:nth-child(4)").text().trim();

//         const statusValue = isApprove ? "approved" : "rejected";
//         const konfirmasi = confirm(`Yakin ingin ${statusValue} cerita ini?`);
//         if (!konfirmasi) return;

//         try {
//           const response = await fetch(`${BASE_URL}/cerita/${id}/status`, {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//             },
//             body: JSON.stringify({
//               status: statusValue,
//               sentiment,
//               skor: 0.85,
//             }),
//           });

//           if (!response.ok) throw new Error("Gagal update status");
//           alert(`Cerita berhasil ${statusValue}.`);

//           // Refresh jumlah cerita jika disetujui
//           if (isApprove) {
//             const jumlahRes = await fetch(`${BASE_URL}/jumlah-cerita`, {
//               headers: { Accept: "application/json" },
//             });

//             if (!jumlahRes.ok) throw new Error("Gagal ambil jumlah cerita");
//             const jumlahData = await jumlahRes.json();
//             console.log("Jumlah cerita terbaru:", jumlahData.jumlah);

//             // Jika kamu punya elemen jumlah di UI
//             const elemenJumlah = document.getElementById("jumlah-cerita");
//             if (elemenJumlah) {
//               elemenJumlah.textContent = jumlahData.jumlah;
//             }
//           }

//           // Refresh tabel waiting list
//           const updated = await ManajemenPresenter.fetchWaitingList();
//           ManajemenPresenter.generateWaitingTable(updated);
//         } catch (err) {
//           console.error("Kesalahan saat update status:", err);
//           alert("Terjadi kesalahan saat memproses permintaan.");
//         }
//       });
//   },
// };

// export default ManajemenPresenter;








