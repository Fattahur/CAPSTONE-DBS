import { BASE_URL } from '../api/api.js';

export const favoritCeritaModel = async () => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await fetch(`${BASE_URL}/favorit`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data favorit. Status: ${response.status}`);
    }

    const result = await response.json();

    const data = result.data.map(item => {
      const [lat, lng] = item.lokasi.split(',').map(Number);

      return {
        id: item.id,
        judul: item.judul,
        deskripsi: item.deskripsi,
        gambar: item.gambar,
        lokasi: { lat, lng },
        tanggal: new Date(item.tanggal),
        kategori: item.kategori?.toLowerCase(),
        tanggalFavorit: new Date(item.tanggal_favorit)
      };
    });

    return data;
  } catch (error) {
    console.error('Gagal memuat cerita favorit:', error);
    return [];
  }
};
