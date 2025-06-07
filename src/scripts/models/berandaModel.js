
import { BASE_URL } from '../api/api.js';

export default class BerandaModel {
  // Ambil cerita populer (default: 10)
  async fetchCeritaPopuler(limit = 10) {
    try {
      const response = await fetch(`${BASE_URL}/cerita/populer?limit=${limit}`);
      const result = await response.json();

      const gambarBaseUrl = BASE_URL.replace('/api/auth', '') + '/uploads/';

      const cerita = result.data.map(item => ({
        id: item.id,
        judul: item.judul,
        isi: item.isi,
        gambar: `${gambarBaseUrl}${item.gambar}`,
        lokasi: item.lokasi,
        namaUser: item.nama_user.trim(),
        tanggalDibuat: new Date(item.created_at),
        totalLike: item.total_like,
      }));

      return {
        success: true,
        message: 'Berhasil mengambil cerita populer',
        data: cerita,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Gagal memuat cerita populer',
        data: [],
      };
    }
  }

  // Ambil cerita mingguan (7 hari terakhir)
  async fetchCeritaMingguan() {
    try {
      const response = await fetch(`${BASE_URL}/semua-cerita`);
      const result = await response.json();

      const sekarang = new Date();
      const tujuhHariLalu = new Date(sekarang);
      tujuhHariLalu.setDate(sekarang.getDate() - 7);

      const gambarBaseUrl = BASE_URL.replace('/api/auth', '') + '/uploads/';

      const cerita = result.data
        .filter(item => new Date(item.created_at) >= tujuhHariLalu)
        .map(item => ({
          id: item.id,
          judul: item.judul,
          isi: item.deskripsi,
          gambar: `${gambarBaseUrl}${item.gambar}`,
          lokasi: item.lokasi,
          namaUser: item.nama_user.trim(),
          tanggalDibuat: new Date(item.created_at),
        }));

      return {
        success: true,
        message: 'Berhasil mengambil cerita mingguan',
        data: cerita,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Gagal memuat cerita mingguan',
        data: [],
      };
    }
  }
}
