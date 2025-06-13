
import { detailCeritaModel } from '../../models/detailCeritaModel.js';

class DetailCeritaPresenter {
  constructor(view) {
    this.view = view;
  }

  async loadDetailCerita(id) {
    try {
      const detailCerita = await detailCeritaModel(id);
      if (detailCerita) {
        this.view.showDetailCerita(detailCerita);
      } else {
        this.view.showError("Gagal mengambil detail cerita.");
      }
    } catch (error) {
      this.view.showError(error.message);
    }
    
  }
}

export default DetailCeritaPresenter;






















// // detail-presenter.js
// const API_URL = "https://ceritanusantara.site/api/auth/cerita/detail";

// const detailPresenter = {
//   async fetchCerita(id) {
//     try {
//       const response = await fetch(`${API_URL}?id=${id}`, {
//         headers: {
//           // Authorization: `Bearer your_access_token`, // Uncomment if needed
//         },
//       });

//       if (!response.ok) throw new Error("Gagal ambil data cerita");

//       const data = await response.json();

//       if (!data.data || data.data.length === 0) {
//         throw new Error("Cerita tidak ditemukan");
//       }

//       return data.data[0];
//     } catch (error) {
//       console.error("DetailPresenter Error:", error);
//       return null;
//     }
//   },
// };

// export default detailPresenter;




