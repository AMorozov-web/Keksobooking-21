'use strict';

const mainPin = document.querySelector(`.map__pin--main`);
const mapPinsContainer = document.querySelector(`.map__pins`);

const onMainPinPressEnter = (evt) => {
  window.util.checkPressEnter(evt, activatePage);
};

const activatePage = () => {
  window.form.isPageActive = true;

  window.form.enableForm();
  window.pin.placePins();

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

  window.form.disableForm();

  mainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      activatePage();
    }
  });

  mainPin.addEventListener(`keydown`, onMainPinPressEnter);
  mapPinsContainer.removeEventListener(`click`, window.pin.onMapPinsClick);
};

deactivatePage();
