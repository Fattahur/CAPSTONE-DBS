export default class CeritaBudayaPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async loadCeritaBudaya() {
    const response = await this.model.fetchCeritaBudaya();

    if (response.success) {
      this.view.showStories(response.data);
    } else {
      this.view.showError(response.message);
    }
  }
}
