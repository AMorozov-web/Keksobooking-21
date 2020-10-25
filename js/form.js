'use strict';

(() => {
  const MAIN_PIN_OFFSET_X = 65;
  const MAIN_PIN_OFFSET_Y = 65;
  const MAIN_PIN_ACTIVE_OFFSET_Y = 84;
  const mainPin = document.querySelector(`.map__pin--main`);
  const mainPinTop = parseInt(mainPin.style.top, 10);
  const mainPinLeft = parseInt(mainPin.style.left, 10);
  const adForm = document.querySelector(`.ad-form`);
  const inputTitle = adForm.querySelector(`#title`);
  const titleMinLength = inputTitle.minLength;
  const titleMaxLength = inputTitle.maxLength;
  const inputAddress = adForm.querySelector(`#address`);
  let isPageActive = false;

  const setAddress = () => {
    const x = Math.floor(mainPinLeft + MAIN_PIN_OFFSET_X / 2);
    const y = (window.form.isPageActive) ? mainPinTop + MAIN_PIN_ACTIVE_OFFSET_Y : Math.floor(mainPinTop + MAIN_PIN_OFFSET_Y / 2);
    inputAddress.value = `${x}, ${y}`;
  };

  const onTitleValidation = () => {
    let valueLength = inputTitle.value.length;

    if (valueLength < titleMinLength) {
      inputTitle.setCustomValidity(`Минимум 30 символов, ещё ${titleMinLength - valueLength} символов`);
    } else if (valueLength > titleMaxLength) {
      inputTitle.setCustomValidity(`Максимум 100 символов, удалите лишние ${valueLength - titleMaxLength} символов`);
    } else {
      inputTitle.setCustomValidity(``);
    }
    inputTitle.reportValidity();
  };

  const activateForm = () => {
    inputTitle.addEventListener(`change`, onTitleValidation);
  };

  const deactivateForm = () => {
    inputTitle.removeEventListener(`change`, onTitleValidation);
  };

  window.form = {
    isPageActive,
    activateForm,
    deactivateForm,
    setAddress,
  };
})();
