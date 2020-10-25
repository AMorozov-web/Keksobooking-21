'use strict';

(() => {
  const MAIN_PIN_OFFSET_X = 65;
  const MAIN_PIN_OFFSET_Y = 65;
  const MAIN_PIN_ACTIVE_OFFSET_Y = 84;
  const mainPin = document.querySelector(`.map__pin--main`);
  const mainPinTop = parseInt(mainPin.style.top, 10);
  const mainPinLeft = parseInt(mainPin.style.left, 10);
  const adForm = document.querySelector(`.ad-form`);
  const inputAddress = adForm.querySelector(`input[name="address"]`);


  const setAddress = () => {
    const x = Math.floor(mainPinLeft + MAIN_PIN_OFFSET_X / 2);
    const y = (isPageActive) ? mainPinTop + MAIN_PIN_ACTIVE_OFFSET_Y : Math.floor(mainPinTop + MAIN_PIN_OFFSET_Y / 2);
    inputAddress.value = `${x}, ${y}`;
  };

  window.form = {
    setAddress,
  };
})();
