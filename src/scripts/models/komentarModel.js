import { BASE_URL } from "../api/api";

const KomentarModel = {
  async kirimKomentar(ceritaId, isiKomentar, token) {
    const response = await fetch(`${BASE_URL}/komentar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        cerita_id: ceritaId,
        isi_komentar: isiKomentar
      })
    });

    if (!response.ok) {
      throw new Error('Gagal mengirim komentar');
    }

    return response.json(); // { message: "Berhasil menambahkan komentar" }
  },


  async ubahKomentar(idKomentar, { cerita_id, isi_komentar }, token) {
    try {
      const response = await fetch(`${BASE_URL}/${idKomentar}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cerita_id, isi_komentar })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Gagal mengubah komentar');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async hapusKomentar(idCerita, komentar_id, token) {
    try {
      const response = await fetch(`${BASE_URL}/${idCerita}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ komentar_id })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Gagal menghapus komentar');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default KomentarModel;
