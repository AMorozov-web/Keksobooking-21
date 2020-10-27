'use strict';

(() => {
  const MAIN_PIN_OFFSET_X = 65;
  const MAIN_PIN_OFFSET_Y = 65;
  const MAIN_PIN_ACTIVE_OFFSET_Y = 84;
  const map = document.querySelector(`.map`);
  const mapFiltersForm = document.querySelector(`.map__filters`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const mainPinTop = parseInt(mainPin.style.top, 10);
  const mainPinLeft = parseInt(mainPin.style.left, 10);
  const adForm = document.querySelector(`.ad-form`);
  const inputTitle = adForm.querySelector(`#title`);
  const titleMinLength = inputTitle.minLength;
  const titleMaxLength = inputTitle.maxLength;
  const inputAddress = adForm.querySelector(`#address`);
  const inputPrice = adForm.querySelector(`#price`);
  const typeSelect = adForm.querySelector(`#type`);
  const checkInSelect = adForm.querySelector(`#timein`);
  const checkOutSelect = adForm.querySelector(`#timeout`);
  const roomNumberSelect = adForm.querySelector(`#room_number`);
  const guestsNumberSelect = adForm.querySelector(`#capacity`);

  const typeToMinPrice = {
    palace: 10000,
    house: 5000,
    flat: 1000,
    bungalow: 0,
  };

  const validityErrorMap = {
    badInput: `Только числовое значение`,
    rangeOverflow: `Максимальная цена - ${inputPrice.max}`,
    rangeUnderflow: `Минимальная цена - ${inputPrice.min}`,
    valueMissing: `Заполните это поле`,
  };

  let isPageActive = false;

  const setAddress = () => {
    const x = Math.floor(mainPinLeft + MAIN_PIN_OFFSET_X / 2);
    const y = (window.form.isPageActive) ? mainPinTop + MAIN_PIN_ACTIVE_OFFSET_Y : Math.floor(mainPinTop + MAIN_PIN_OFFSET_Y / 2);
    inputAddress.value = `${x}, ${y}`;
  };

  const onTitleValidation = () => {
    let valueLength = inputTitle.value.length;

    if (valueLength < titleMinLength) {
      inputTitle.setCustomValidity(`Минимум 30 символов, добавьте ещё ${titleMinLength - valueLength}`);
    } else if (valueLength > titleMaxLength) {
      inputTitle.setCustomValidity(`Максимум 100 символов, удалите лишние ${valueLength - titleMaxLength}`);
    } else {
      inputTitle.setCustomValidity(``);
    }
    inputTitle.reportValidity();
  };

  const onPriceValidation = () => {
    const errorValue = Object.keys(validityErrorMap).find((value) => inputPrice.validity[value]);
    inputPrice.setCustomValidity(errorValue ? validityErrorMap[errorValue] : ``);
  };

  const setMinPrice = (minPrice) => {
    inputPrice.setAttribute(`min`, minPrice);
    inputPrice.setAttribute(`placeholder`, minPrice);
  };

  const onPriceSelectChange = () => {
    setMinPrice(typeToMinPrice[typeSelect.value]);
  };

  const setCheckIn = (checkInTime) => {
    checkInSelect.value = checkInTime;
  };

  const setCheckOut = (checkOutTime) => {
    checkOutSelect.value = checkOutTime;
  };

  const onCheckInChange = () => {
    setCheckOut(checkInSelect.value);
  };

  const onCheckOutChange = () => {
    setCheckIn(checkOutSelect.value);
  };

  const onRoomsCapacityValidation = () => {
    const rooms = roomNumberSelect.value;
    const guests = guestsNumberSelect.value;

    if ((rooms === `100` && guests !== `0`) || (rooms !== `100` && guests === `0`)) {
      guestsNumberSelect.setCustomValidity(`Возможен только вариант: 100 комнат - не для гостей`);
    } else if (rooms !== `100` && rooms < guests) {
      guestsNumberSelect.setCustomValidity(`Количество комнат не может быть меньше числа гостей`);
    } else {
      guestsNumberSelect.setCustomValidity(``);
    }
    guestsNumberSelect.reportValidity();
  };

  const enableForm = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    window.util.toggleFormElements(mapFiltersForm);
    window.util.toggleFormElements(adForm);
    setAddress();
  };

  const disableForm = () => {
    if (!map.classList.contains(`map--faded`)) {
      map.classList.add(`map--faded`);
    }

    if (!adForm.classList.contains(`ad-form--disabled`)) {
      adForm.classList.add(`ad-form--disabled`);
    }

    window.util.toggleFormElements(mapFiltersForm, true);
    window.util.toggleFormElements(adForm, true);
    setAddress();
  };

  setMinPrice(typeToMinPrice[typeSelect.value]);

  inputTitle.addEventListener(`change`, onTitleValidation);
  inputPrice.addEventListener(`change`, onPriceValidation);
  typeSelect.addEventListener(`change`, onPriceSelectChange);
  checkInSelect.addEventListener(`change`, onCheckInChange);
  checkOutSelect.addEventListener(`change`, onCheckOutChange);
  roomNumberSelect.addEventListener(`change`, onRoomsCapacityValidation);
  guestsNumberSelect.addEventListener(`change`, onRoomsCapacityValidation);

  window.form = {
    isPageActive,
    enableForm,
    disableForm,
  };
})();
