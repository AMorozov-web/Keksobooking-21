'use strict';

const MainPinDefaultCoords = {
  TOP: 375,
  LEFT: 570,
};

const MOUSE_LEFT_BUTTON_KEYCODE = 0;

const map = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const mapPinsContainer = document.querySelector(`.map__pins`);
const adForm = document.querySelector(`.ad-form`);
const adFormResetButton = adForm.querySelector(`.ad-form__reset`);

const onMainPinPressEnter = (evt) => {
  window.util.checkPressEnter(evt, activatePage);
};

const onMainPinMouseDown = (evt) => {
  if (evt.button === MOUSE_LEFT_BUTTON_KEYCODE) {
    activatePage();
  }
};

const setMainPinDefault = () => {
  mainPin.style.top = `${MainPinDefaultCoords.TOP}px`;
  mainPin.style.left = `${MainPinDefaultCoords.LEFT}px`;
};

const onLoadDataSuccess = (data) => {
  window.data = window.util.setIdToElements(data);
  const randomPins = window.filter.getFilteredData(window.data);

  window.filter.enable();
  window.pin.render(randomPins);
};

const onFormSubmitSuccess = () => {
  window.message.success();
  adForm.reset();
  deactivatePage();
};

const onError = (errorText) => {
  window.message.error(errorText);
};

const activatePage = () => {
  map.classList.remove(`map--faded`);

  window.form.isPageActive = true;

  window.form.enable();
  window.backend.load(onLoadDataSuccess, onError);

  mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
  mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
  mapPinsContainer.addEventListener(`click`, window.pin.click);
};

const deactivatePage = () => {
  if (!map.classList.contains(`map--faded`)) {
    map.classList.add(`map--faded`);
  }

  window.form.isPageActive = false;

  setMainPinDefault();
  window.form.disable();
  window.filter.disable();
  window.card.close();
  window.pin.remove();

  mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  mainPin.addEventListener(`keydown`, onMainPinPressEnter);
  mapPinsContainer.removeEventListener(`click`, window.pin.click);
};

adFormResetButton.addEventListener(`mousedown`, () => {
  deactivatePage();
});

adForm.addEventListener(`submit`, (evt) => {
  const data = new FormData(adForm);

  window.backend.upload(data, onFormSubmitSuccess, onError);
  evt.preventDefault();
});

deactivatePage();
