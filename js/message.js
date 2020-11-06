'use strict';

const onErrorEscPress = (evt) => {
  const error = document.querySelector(`.error`);
  const errorRemove = () => error.remove();

  window.util.checkPressEsc(evt, errorRemove);
  document.removeEventListener(`keydown`, onErrorEscPress);
};

const onSuccessEscPress = (evt) => {
  const success = document.querySelector(`.success`);
  const successRemove = () => success.remove();

  window.util.checkPressEsc(evt, successRemove);
  document.removeEventListener(`keydown`, onSuccessEscPress);
};

const renderSuccessMessage = () => {
  const success = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
  const main = document.querySelector(`main`);

  main.insertAdjacentElement(`afterbegin`, success);

  success.addEventListener(`click`, () => {
    success.remove();
  });

  document.addEventListener(`keydown`, onSuccessEscPress);
};

const renderErrorMessage = (errorText) => {
  const error = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
  const main = document.querySelector(`main`);
  const errorMessage = error.querySelector(`.error__message`);

  if (errorText) {
    errorMessage.textContent = errorText;
  }

  main.insertAdjacentElement(`afterbegin`, error);

  error.addEventListener(`click`, () => {
    error.remove();
  });

  document.addEventListener(`keydown`, onErrorEscPress);
};

window.message = {
  error: renderErrorMessage,
  success: renderSuccessMessage,
};
