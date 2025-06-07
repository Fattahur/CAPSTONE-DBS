// detail-presenter.js
const API_URL = "https://ceritanusantara.site/api/auth/cerita/detail";

const detailPresenter = {
  async fetchCerita(id) {
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        headers: {
          // Authorization: `Bearer your_access_token`, // Uncomment if needed
        },
      });

      if (!response.ok) throw new Error("Gagal ambil data cerita");

      const data = await response.json();

      if (!data.data || data.data.length === 0) {
        throw new Error("Cerita tidak ditemukan");
      }

      return data.data[0];
    } catch (error) {
      console.error("DetailPresenter Error:", error);
      return null;
    }
  },
};

export default detailPresenter;