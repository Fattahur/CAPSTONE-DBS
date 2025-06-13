import { BASE_URL } from "../api/api";

class FavoritModel {
  static async tambahFavorit(ceritaId, token) {
    try {
      const response = await fetch(`${BASE_URL}/favorit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cerita_id: ceritaId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menambahkan favorit');
      }

      const data = await response.json();
      return data; // { message: "Berhasil menambahkan ke favorit" }
    } catch (error) {
      throw error;
    }
  }

  static async hapusFavorit(ceritaId, token) {
    try {
      const response = await fetch(`${BASE_URL}/hapus_favorit`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cerita_id: ceritaId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menghapus favorit');
      }

      const data = await response.json();
      return data; // { message: "Berhasil menghapus dari favorit" }
    } catch (error) {
      throw error;
    }
  }
}

export default FavoritModel;
