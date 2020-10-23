'use strict';

const MAIN_PIN_OFFSET_X = 65;
const MAIN_PIN_OFFSET_Y = 65;
const MAIN_PIN_ACTIVE_OFFSET_Y = 84;
const ROOMS_DECLENSION = [
  `комната`,
  `комнаты`,
  `комнат`
];
const GUESTS_DECLENSION = [
  `гостя`,
  `гостей`,
  `гостей`
];
const typesMap = {
  'palace': `Дворец`,
  'flat': `Квартира`,
  'house': `Дом`,
  'bungalow': `Бунгало`
};

const map = document.querySelector(`.map`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);
const inputAddress = adForm.querySelector(`input[name="address"]`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const mainPin = document.querySelector(`.map__pin--main`);
const mainPinTop = parseInt(mainPin.style.top, 10);
const mainPinLeft = parseInt(mainPin.style.left, 10);
const mapPinsContainer = document.querySelector(`.map__pins`);
const mapPinTemplate = document.querySelector(`#pin`)
  .content.querySelector(`.map__pin`);
const popupCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
let isPageActive = false;

const createPin = (pin) => {
  const mapPin = mapPinTemplate.cloneNode(true);
  const {
    id,
    author,
    offer
  } = pin;
  const {avatar} = author;
  const {
    title,
    location,
  } = offer;

  if (!offer) {
    return false;
  }

  mapPin.style = `left: ${location.x}px; top: ${location.y}px;`;
  mapPin.querySelector(`img`).src = avatar;
  mapPin.querySelector(`img`).alt = title;
  mapPin.dataset.id = id;

  return mapPin;
};

const createFeatures = (featuresArr, parentElement) => {
  if (featuresArr.length === 0) {
    parentElement.remove();
    return;
  }

  for (let i = 0; i < featuresArr.length; i++) {
    const feature = document.createElement(`li`);
    feature.classList.add(`popup__feature`, `popup__feature--${featuresArr[i]}`);
    parentElement.appendChild(feature);
  }
};

const createPhotos = (photosArr, parentElement) => {
  if (photosArr.length === 0) {
    parentElement.remove();
    return;
  }

  const photo = parentElement.querySelector(`.popup__photo`).cloneNode(true);
  parentElement.innerHTML = ``;

  photosArr.forEach((elem) => {
    parentElement.appendChild(photo);
    photo.src = elem;
  });
};

const checkCardElements = (cardElement) => {
  switch (cardElement.tagName.toLowerCase()) {
    case `p`:
    case `h3`:
    case `h4`:
      if (cardElement.textContent === ``) {
        cardElement.remove();
      }
      break;
    case `img`:
      if (!cardElement.src) {
        cardElement.remove();
      }
      break;
    default:
      break;
  }
};

const createCard = (pin) => {
  const {
    author,
    offer,
  } = pin;
  const {avatar} = author;
  const {
    title,
    address,
    price,
    type,
    features,
    photos,
    rooms,
    guests,
    checkin,
    checkout,
    description,
  } = offer;

  const popupCard = popupCardTemplate.cloneNode(true);
  const popupCardChilds = popupCard.children;
  const popupCloseButton = popupCard.querySelector(`.popup__close`);
  const featureList = popupCard.querySelector(`.popup__features`);
  const photosContainer = popupCard.querySelector(`.popup__photos`);
  const roomsDecl = window.util.declTextByNumber(rooms, ROOMS_DECLENSION);
  const guestsDecl = window.util.declTextByNumber(guests, GUESTS_DECLENSION);
  const capacity = `${rooms} ${roomsDecl} для ${guests} ${guestsDecl}`;

  popupCard.querySelector(`.popup__avatar`).src = avatar;
  popupCard.querySelector(`.popup__title`).textContent = title;
  popupCard.querySelector(`.popup__text--address`).textContent = address;
  popupCard.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь` || ``;
  popupCard.querySelector(`.popup__type`).textContent = `${typesMap[type]}`;
  popupCard.querySelector(`.popup__text--capacity`).textContent = capacity;
  popupCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  popupCard.querySelector(`.popup__description`).textContent = `${description}`;

  featureList.innerHTML = ``;
  createFeatures(features, featureList);

  createPhotos(photos, photosContainer);

  for (let child of popupCardChilds) {
    checkCardElements(child);
  }

  popupCloseButton.addEventListener(`click`, () => {
    closeCard();
  });

  return popupCard;
};

const placePins = () => {
  const pinFragment = document.createDocumentFragment();

  window.data.pins.forEach((elem) => {
    pinFragment.appendChild(createPin(elem));
  });

  mapPinsContainer.appendChild(pinFragment);
};

const placeCard = (elem) => {
  closeCard();

  const card = createCard(elem);
  map.insertBefore(card, mapFiltersContainer);
  document.addEventListener(`keydown`, onCardPressEsc);
};

const closeCard = () => {
  const popupCard = map.querySelector(`.popup`);

  if (popupCard) {
    popupCard.remove();
    mapPinsContainer.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);
  }
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
    closeCard();
  }

  document.removeEventListener(`keydown`, onCardPressEsc);
};

deactivatePage();
