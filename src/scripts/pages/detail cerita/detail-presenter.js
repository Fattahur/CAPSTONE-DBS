
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
