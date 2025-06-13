import { BASE_URL } from "../api/api";

export default class CeritaBudayaModel {
  async fetchCeritaBudaya() {
    try {
      const response = await fetch(`${BASE_URL}/semua-cerita`);
      const result = await response.json();

      const gambarBaseUrl = BASE_URL.replace('/api/auth', '') + '/uploads/';

      const cerita = result.data.map(item => ({
        id: item.id,
        judul: item.judul,
        isi: item.deskripsi,
        gambar: `${gambarBaseUrl}${item.gambar}`,
        lokasi: item.lokasi,
        kategori: item.kategori,
        namaUser: item.nama_user.trim(),
        tanggalDibuat: new Date(item.created_at),
      }));

      return {
        success: true,
        message: 'Berhasil mengambil semua cerita',
        data: cerita,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Gagal memuat cerita',
        data: [],
      };
    }
  }
}
