import { BASE_URL } from '../../../api/api.js';

const AdminPresenter = {
  async getTotalCerita() {
    try {
      const response = await fetch(`${BASE_URL}/jumlah-cerita`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
        },
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return data.total_cerita || 0;
      } else {
        console.error('Respon bukan JSON:', contentType);
        return 0;
      }
    } catch (error) {
      console.error('Gagal fetch total cerita:', error);
      return 0;
    }
  }
};

export default AdminPresenter;
