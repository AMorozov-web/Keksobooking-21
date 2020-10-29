'use strict';

const map = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const mapPinsContainer = document.querySelector(`.map__pins`);

const onMainPinPressEnter = (evt) => {
  window.util.checkPressEnter(evt, activatePage);
};

const onMainPinMouseDown = (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
};

const activatePage = () => {
  map.classList.remove(`map--faded`);

  window.form.enableForm();
  window.pin.placePins();

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

  mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  mainPin.addEventListener(`keydown`, onMainPinPressEnter);
  mapPinsContainer.removeEventListener(`click`, window.pin.onMapPinsClick);

  window.form.isPageActive = false;
};

deactivatePage();
