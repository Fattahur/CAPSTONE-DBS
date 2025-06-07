const API_URL = 'https://ceritanusantara.site/api/auth/cerita/detail';

const detailPresenter = {
  async fetchCerita(id) {
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        headers: {
          // Hapus Authorization kalau tidak pakai token
          // Authorization: `Bearer your_access_token`,
        },
      });

      if (!response.ok) throw new Error('Gagal ambil data cerita');

      const data = await response.json();

      // ✅ FIX: karena API mengembalikan array di dalam "data"
      if (!data.data || data.data.length === 0) {
        throw new Error('Cerita tidak ditemukan');
      }

      return data.data[0]; // Ambil cerita pertama (karena berbentuk array)
    } catch (error) {
      console.error('DetailPresenter Error:', error);
      return null;
    }
  },
};

export default detailPresenter;
