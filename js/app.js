'use strict';

import { UI } from '/js/UI.js';

UI.smoothScrolling();
UI.tabbedComponent();
UI.stickyNav();
UI.revealSection();
UI.lazeLoading();
UI.sliderComponent();

const modalOpenAcc = document.querySelector('.modal'),
  overlay = document.querySelector('.overlay'),
  formOpenAcc = document.querySelector('.modal__form'),
  btnOpenAcc = document.querySelector("button[type='submit']");

class Account {
  static showModal() {
    modalOpenAcc.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }

  static closeModal() {
    modalOpenAcc.classList.add('hidden');
    overlay.classList.add('hidden');
  }
}

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn--show-modal')) Account.showModal();
  if (e.target.classList.contains('btn--close-modal')) Account.closeModal();

  e.preventDefault();
});

btnOpenAcc.addEventListener('click', function () {
  const formData = new FormData(formOpenAcc);
  console.log(formData);
});
