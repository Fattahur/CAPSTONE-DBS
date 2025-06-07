
export default class BerandaPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async loadCeritaPopuler() {
    const response = await this.model.fetchCeritaPopuler();

    if (response.success) {
      this.view.updateCeritaPopuler(response.data);
    } else {
      this.view.showError(response.message);
    }
  }

  async loadCeritaMingguan() {
    const response = await this.model.fetchCeritaMingguan();

    if (response.success) {
      this.view.updateCeritaMingguan(response.data);
    } else {
      this.view.showError(response.message);
    }
  }
}
