'use strict';

const map = document.querySelector(`.map`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const mainPin = document.querySelector(`.map__pin--main`);
const mapPinsContainer = document.querySelector(`.map__pins`);

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

const onMainPinPressEnter = (evt) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    activatePage();
  }
};

const activatePage = (evt) => {
  if (evt.which === 1) {
    window.form.isPageActive = true;
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    window.util.toggleFormElements(mapFiltersForm);
    window.util.toggleFormElements(adForm);
    window.form.setAddress();
    window.form.activateForm();
    placePins();

    mainPin.removeEventListener(`mousedown`, activatePage);
    mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
    mapPinsContainer.addEventListener(`click`, onPinClick);
  }
};

const deactivatePage = () => {
  window.form.isPageActive = false;

  if (!map.classList.contains(`map--faded`)) {
    map.classList.add(`map--faded`);
  }

  if (!adForm.classList.contains(`ad-form--disabled`)) {
    adForm.classList.add(`ad-form--disabled`);
  }

  window.util.toggleFormElements(mapFiltersForm, true);
  window.util.toggleFormElements(adForm, true);
  window.form.setAddress();
  window.form.deactivateForm();

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
