'use strict';

const MAX_PINS_COUNT = 5;
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

const onLoadSuccess = (data) => {
  window.data = window.util.setIdToElements(data);
  const randomPins = window.data.slice(0, MAX_PINS_COUNT);

  window.form.enableFilters();
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
  window.form.disableFilters();
  window.card.closeCard();
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
