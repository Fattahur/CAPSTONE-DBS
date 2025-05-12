
import LoginModel from '../../../models/loginModel.js';

export default class LoginPresenter {
  #view;
  #model;

  constructor({ view }) {
    this.#view = view;
    this.#model = new LoginModel();
  }

  async getLogin({ email, password }) {
    try {
      this.#view.showSubmitLoadingButton();

      const result = await this.#model.login({ email, password });

      if (!result.success) {
        this.#view.loginFailed(result.message);
        return;
      }

      this.#view.loginSuccessfully('Login berhasil!');
    } catch (error) {
      this.#view.loginFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
