'use strict';

(() => {
  const MAP_TOP_MOVE_LIMIT = 130;
  const MAP_BOTTOM_MOVE_LIMIT = 630;
  const MAP_LEFT_MOVE_LIMIT = 0;
  const MAP_RIGHT_MOVE_LIMIT = 1200;

  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const moveLimits = {
    top: map.offsetTop + MAP_TOP_MOVE_LIMIT - window.form.MAIN_PIN_ACTIVE_OFFSET_Y,
    bottom: MAP_BOTTOM_MOVE_LIMIT - window.form.MAIN_PIN_ACTIVE_OFFSET_Y,
    left: MAP_LEFT_MOVE_LIMIT + Math.ceil(window.form.MAIN_PIN_OFFSET_X / 2) - mainPin.offsetWidth,
    right: MAP_RIGHT_MOVE_LIMIT + Math.ceil(window.form.MAIN_PIN_OFFSET_X / 2) - mainPin.offsetWidth,
  };

  const onMainPinMove = (evt) => {

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const newCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (newCoords.y < moveLimits.top) {
        newCoords.y = moveLimits.top;
      } else if (newCoords.y > moveLimits.bottom) {
        newCoords.y = moveLimits.bottom;
      }

      if (newCoords.x < moveLimits.left) {
        newCoords.x = moveLimits.left;
      } else if (newCoords.x > moveLimits.right) {
        newCoords.x = moveLimits.right;
      }

      mainPin.style.left = `${newCoords.x}px`;
      mainPin.style.top = `${newCoords.y}px`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      window.pin.placePins();
      window.form.setAddress();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.move = {
    onMainPinMove,
  };
})();
