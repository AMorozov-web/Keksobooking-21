'use strict';

const map = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const mapPinsContainer = document.querySelector(`.map__pins`);

const onMainPinPressEnter = (evt) => {
  window.util.checkPressEnter(evt, activatePage);
};

const activatePage = () => {
  window.form.isPageActive = true;
  map.classList.remove(`map--faded`);

  window.form.enableForm();

  mainPin.removeEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      activatePage();
    }
  });

  mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
  mapPinsContainer.addEventListener(`click`, window.pin.onMapPinsClick);
};

const deactivatePage = () => {
  window.form.isPageActive = false;

  if (!map.classList.contains(`map--faded`)) {
    map.classList.add(`map--faded`);
  }

  window.form.disableForm();

  mainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      activatePage();
    }
  });

  mainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      window.move.onMainPinMove(evt);
    }
  });

  mainPin.addEventListener(`keydown`, onMainPinPressEnter);
  mapPinsContainer.removeEventListener(`click`, window.pin.onMapPinsClick);
};

deactivatePage();
