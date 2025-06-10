import { BASE_URL } from '../api/api.js';

export const detailCeritaModel = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/cerita/detail/${id}`);
    if (!response.ok) {
      throw new Error(`Gagal mengambil detail cerita. Status: ${response.status}`);
    }
    const result = await response.json();
    const {
      id: ceritaId,
      judul,
      isi,
      gambar,
      lokasi,
      nama_user: namaUser,
      komentar = [],
      like = { total: 0, sudahDilikeUser: false },
      favorit = { total: 0, sudahDifavoritkanUser: false }
    } = result.data;

    return {
      id: ceritaId,
      judul,
      isi,
      gambar,
      lokasi,
      namaUser,
      komentar: komentar.map(k => ({
        idKomentar: k.id_komentar,
        isiKomentar: k.isi_komentar,
        tanggal: k.tanggal,
        username: k.username
      })),
      like: {
        total: like.total,
        sudahDilikeUser: like.sudahDilikeUser
      },
      favorit: {
        total: favorit.total,
        sudahDifavoritkanUser: favorit.sudahDifavoritkanUser
      }
    };
  } catch (error) {
    console.error("Gagal mengambil detail cerita:", error);
    return null;
  }
};
