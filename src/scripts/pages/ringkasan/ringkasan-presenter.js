import { html, render } from 'lit-html';
import RingkasanPage from './ringkasan-page.js';

const RingkasanPresenter = {
  init(container) {
    RingkasanPage.render(container);
  }
};

export default RingkasanPresenter;
