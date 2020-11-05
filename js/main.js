'use strict';

const MainPinDefaultCoords = {
  TOP: 375,
  LEFT: 570,
};

const map = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const mapPinsContainer = document.querySelector(`.map__pins`);
const adForm = document.querySelector(`.ad-form`);
const adFormResetButton = adForm.querySelector(`.ad-form__reset`);

const onMainPinPressEnter = (evt) => {
  window.util.checkPressEnter(evt, activatePage);
};

const onMainPinMouseDown = (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
};

const setMainPinDefault = () => {
  mainPin.style.top = `${MainPinDefaultCoords.TOP}px`;
  mainPin.style.left = `${MainPinDefaultCoords.LEFT}px`;
};

const onLoadSuccess = (data) => {
  window.data = window.util.setIdToElements(data);
  const randomPins = window.filter.getFilteredData(window.data);

  window.filter.enableFilters();
  window.pin.placePins(randomPins);
};

const onSubmitSuccess = () => {
  window.message.renderSuccessMessage();
  adForm.reset();
  deactivatePage();
};

const onError = (errorText) => {
  window.message.renderErrorMessage(errorText);
};

const activatePage = () => {
  map.classList.remove(`map--faded`);

  window.form.isPageActive = true;

  window.form.enableForm();
  window.backend.load(onLoadSuccess, onError);

  mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
  mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
  mapPinsContainer.addEventListener(`click`, window.pin.onMapPinsClick);
};

const deactivatePage = () => {
  if (!map.classList.contains(`map--faded`)) {
    map.classList.add(`map--faded`);
  }

  window.form.isPageActive = false;

  setMainPinDefault();
  window.form.disableForm();
  window.filter.disableFilters();
  window.card.closeCard();
  window.pin.removePins();

  mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  mainPin.addEventListener(`keydown`, onMainPinPressEnter);
  mapPinsContainer.removeEventListener(`click`, window.pin.onMapPinsClick);
};

adFormResetButton.addEventListener(`mousedown`, () => {
  deactivatePage();
});

adForm.addEventListener(`submit`, (evt) => {
  const data = new FormData(adForm);

  window.backend.upload(data, onSubmitSuccess, onError);
  evt.preventDefault();
});

deactivatePage();
