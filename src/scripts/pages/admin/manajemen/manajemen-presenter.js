import { BASE_URL } from '../../../api/api.js';

const ManajemenPresenter = {
  async fetchDataCerita() {
    try {
      const response = await fetch(`${BASE_URL}/semua-cerita`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Network response not ok');
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Gagal mengambil data cerita:', error);
      return [];
    }
  },

  generateDataTable(data) {
    $('#kontenTable').DataTable({
      language: { emptyTable: "Belum ada konten yang tersedia." },
      destroy: true,
      paging: false,       // matikan pagination (hilangin Previous/Next)
      info: false,         // matikan info text "Showing 1 to 1 of 1 entries"
      lengthChange: false, // matikan dropdown "Show entries"
      data: data.map((item, index) => [
        index + 1,
        `<img src="${BASE_URL.replace('/api/auth', '')}/uploads/${item.gambar}" alt="${item.judul}" width="200" />`,
        item.judul,
        item.nama_user,
        `<button class="edit-btn" data-id="${item.id}">Edit</button> <button class="delete-btn" data-id="${item.id}">Hapus</button>`
      ]),
      columns: [
        { title: "No" },
        { title: "Gambar" },
        { title: "Judul" },
        { title: "Penulis" },
        { title: "Aksi" }
      ]
    });
  },

  async fetchWaitingList() {
    try {
      const response = await fetch(`${BASE_URL}/waiting-list`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Network response not ok');
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Gagal mengambil waiting list:', error);
      return [];
    }
  },

  generateWaitingTable(data) {
    $('#waitingTable').DataTable({
      language: { emptyTable: "Belum ada data waiting list." },
      destroy: true,
      paging: false,       // matikan pagination (hilangin Previous/Next)
      info: false,         // matikan info text "Showing 1 to 1 of 1 entries"
      lengthChange: false, // matikan dropdown "Show entries"
      data: data.map(item => [
        item.id_cerita,
        item.judul,
        item.deskripsi,
        item.sentiment,
        `<button class="approve-btn" data-id="${item.id_cerita}">Setujui</button> <button class="reject-btn" data-id="${item.id_cerita}">Tolak</button>`
      ]),
      columns: [
        { title: "Id Cerita" },
        { title: "Judul Cerita" },
        { title: "Deskripsi" },
        { title: "Sentiment" },
        { title: "Aksi" }
      ]
    });
  }
};

export default ManajemenPresenter;
