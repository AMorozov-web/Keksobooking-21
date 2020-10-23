'use strict';

const MAIN_PIN_OFFSET_X = 65;
const MAIN_PIN_OFFSET_Y = 65;
const MAIN_PIN_ACTIVE_OFFSET_Y = 84;

const map = document.querySelector(`.map`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);
const inputAddress = adForm.querySelector(`input[name="address"]`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const mainPin = document.querySelector(`.map__pin--main`);
const mainPinTop = parseInt(mainPin.style.top, 10);
const mainPinLeft = parseInt(mainPin.style.left, 10);
const mapPinsContainer = document.querySelector(`.map__pins`);
let isPageActive = false;

const placePins = () => {
  const pinFragment = document.createDocumentFragment();

  window.data.pins.forEach((elem) => {
    pinFragment.appendChild(window.pin.createPin(elem));
  });

  mapPinsContainer.appendChild(pinFragment);
};

const placeCard = (elem) => {
  window.card.closeCard();

  const card = window.card.createCard(elem);
  map.insertBefore(card, mapFiltersContainer);
  document.addEventListener(`keydown`, onCardPressEsc);
};

const setAddress = () => {
  const x = Math.floor(mainPinLeft + MAIN_PIN_OFFSET_X / 2);
  const y = (isPageActive) ? mainPinTop + MAIN_PIN_ACTIVE_OFFSET_Y : Math.floor(mainPinTop + MAIN_PIN_OFFSET_Y / 2);
  inputAddress.value = `${x}, ${y}`;
};

const onMainPinPressEnter = (evt) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    activatePage();
  }
};

const activatePage = (evt) => {
  if (evt.which === 1) {
    isPageActive = true;
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    window.util.toggleFormElements(mapFiltersForm);
    window.util.toggleFormElements(adForm);
    setAddress();
    placePins();

    mainPin.removeEventListener(`mousedown`, activatePage);
    mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
    mapPinsContainer.addEventListener(`click`, onPinClick);
  }
};

const deactivatePage = () => {
  isPageActive = false;

  if (!map.classList.contains(`map--faded`)) {
    map.classList.add(`map--faded`);
  }

  if (!adForm.classList.contains(`ad-form--disabled`)) {
    adForm.classList.add(`ad-form--disabled`);
  }

  window.util.toggleFormElements(mapFiltersForm, true);
  window.util.toggleFormElements(adForm, true);
  setAddress();

  mainPin.addEventListener(`mousedown`, activatePage);
  mainPin.addEventListener(`keydown`, onMainPinPressEnter);
  mapPinsContainer.removeEventListener(`click`, onPinClick);
};

const onPinClick = (evt) => {
  const pinButton = evt.target.closest(`button[type="button"]`);

  if (pinButton && !evt.target.classList.contains(`map__pin--main`) && !pinButton.classList.contains(`map__pin--active`)) {
    const buttonId = parseInt(pinButton.dataset.id, 10);
    const currentCardData = window.data.pins.find((item) => (item.id === buttonId));

    placeCard(currentCardData);

    pinButton.classList.add(`map__pin--active`);
  }
};

const onCardPressEsc = (evt) => {
  if (evt.key === `Escape`) {
    window.card.closeCard();
  }

  document.removeEventListener(`keydown`, onCardPressEsc);
};

deactivatePage();
