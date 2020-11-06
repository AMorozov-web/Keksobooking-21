'use strict';

const MapMoveLimits = {
  TOP: 130,
  BOTTOM: 630,
  LEFT: 0,
  RIGHT: 1200,
};

const map = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);

const pinMoveLimits = {
  top: map.offsetTop + MapMoveLimits.TOP - window.form.MAIN_PIN_ACTIVE_OFFSET_Y,
  bottom: MapMoveLimits.BOTTOM - window.form.MAIN_PIN_ACTIVE_OFFSET_Y,
  left: MapMoveLimits.LEFT + Math.ceil(window.form.MAIN_PIN_OFFSET_X / 2) - mainPin.offsetWidth,
  right: MapMoveLimits.RIGHT + Math.ceil(window.form.MAIN_PIN_OFFSET_X / 2) - mainPin.offsetWidth,
};

const onMainPinMouseMove = (evt) => {

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };

  const onDocumentMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY,
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY,
    };

    const newCoords = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y,
    };

    if (newCoords.y < pinMoveLimits.top) {
      newCoords.y = pinMoveLimits.top;
    } else if (newCoords.y > pinMoveLimits.bottom) {
      newCoords.y = pinMoveLimits.bottom;
    }

    if (newCoords.x < pinMoveLimits.left) {
      newCoords.x = pinMoveLimits.left;
    } else if (newCoords.x > pinMoveLimits.right) {
      newCoords.x = pinMoveLimits.right;
    }

    mainPin.style.left = `${newCoords.x}px`;
    mainPin.style.top = `${newCoords.y}px`;
  };

  const onDocumentMouseUp = (upEvt) => {
    upEvt.preventDefault();

    window.form.setAddress();
    document.removeEventListener(`mousemove`, onDocumentMouseMove);
    document.removeEventListener(`mouseup`, onDocumentMouseUp);
  };

  document.addEventListener(`mousemove`, onDocumentMouseMove);
  document.addEventListener(`mouseup`, onDocumentMouseUp);
};

mainPin.addEventListener(`mousedown`, onMainPinMouseMove);
