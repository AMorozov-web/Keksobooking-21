'use strict';

const map = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const mapPinsContainer = document.querySelector(`.map__pins`);
const adForm = document.querySelector(`.ad-form`);

const onMainPinPressEnter = (evt) => {
  window.util.checkPressEnter(evt, activatePage);
};

const onMainPinMouseDown = (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
};

const onErrorEscPress = (evt) => {
  const error = document.querySelector(`.error`);

  window.util.checkPressEsc(evt, error.remove());
  document.removeEventListener(`keydown`, onErrorEscPress);
};

const onSuccessEscPress = (evt) => {
  const success = document.querySelector(`.success`);

  window.util.checkPressEsc(evt, success.remove());
  document.removeEventListener(`keydown`, onSuccessEscPress);
};

const onLoadSuccess = (data) => {
  window.data = window.util.setIdToElements(data);
  window.pin.placePins(window.data);
};

const onSubmitSuccess = () => {
  const success = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
  document.body.insertAdjacentElement(`afterbegin`, success);

  success.addEventListener(`click`, () => {
    success.remove();
  });

  document.addEventListener(`keydown`, onSuccessEscPress);

  adForm.reset();
  deactivatePage();
};

const onError = (errorText) => {
  const error = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
  const errorMessage = error.querySelector(`.error__message`);

  if (errorText) {
    errorMessage.textContent = errorText;
  }

  document.body.insertAdjacentElement(`afterbegin`, error);

  error.addEventListener(`click`, () => {
    error.remove();
  });

  document.addEventListener(`keydown`, onErrorEscPress);
};

const activatePage = () => {
  map.classList.remove(`map--faded`);

  window.form.enableForm();
  window.backend.load(onLoadSuccess, onError);

  mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
  mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
  mapPinsContainer.addEventListener(`click`, window.pin.onMapPinsClick);

  window.form.isPageActive = true;
};

const deactivatePage = () => {
  if (!map.classList.contains(`map--faded`)) {
    map.classList.add(`map--faded`);
  }

  window.form.disableForm();
  window.pin.removePins();

  mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  mainPin.addEventListener(`keydown`, onMainPinPressEnter);
  mapPinsContainer.removeEventListener(`click`, window.pin.onMapPinsClick);

  window.form.isPageActive = false;
};

adForm.addEventListener(`submit`, (evt) => {
  const data = new FormData(adForm);

  window.backend.upload(data, onSubmitSuccess, onError);
  evt.preventDefault();
});

deactivatePage();
