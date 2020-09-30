'use strict';

const OFFERS_COUNT = 8;
const PIN_OFFSET_X = 50;
const PIN_OFFSET_Y = 70;
// const MIN_PIN_POS_Y = 130; // temporarily not used
// const MAX_PIN_POS_Y = 630; // temporarily not used
const PINS_POS_INTERVAL_X = 220;
const PINS_POS_INTERVAL_Y = 100;
const APARTMENT_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 3;
const MIN_GUESTS_COUNT = 1;
const MAX_GUESTS_COUNT = 3;
const TIMES = [`12:00`, `13:00`, `14:00`];
const TITLES = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`
];
const FEATURES = [
  // `wifi`,
  // `dishwasher`,
  // `parking`,
  // `washer`,
  // `elevator`,
  // `conditioner`
];
const PHOTOS_SRC = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const typesMap = {
  'palace': `Дворец`,
  'flat': `Квартира`,
  'house': `Дом`,
  'bungalow': `Бунгало`
};

const map = document.querySelector(`.map`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const mainPin = document.querySelector(`.map__pin--main`);
const mainPinTop = parseInt((getComputedStyle(mainPin, null).top), 10);
const mainPinLeft = parseInt((getComputedStyle(mainPin, null).left), 10);
const mapPinsContainer = document.querySelector(`.map__pins`);
const mapPinTemplate = document.querySelector(`#pin`)
  .content.querySelector(`.map__pin`);
const popupCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const pinsPosLimits = {
  x: {
    min: mainPinLeft - PINS_POS_INTERVAL_X - PIN_OFFSET_X / 2,
    max: mainPinLeft + PINS_POS_INTERVAL_X - PIN_OFFSET_X / 2
  },
  y: {
    min: mainPinTop - PINS_POS_INTERVAL_Y - PIN_OFFSET_Y,
    max: mainPinTop + PINS_POS_INTERVAL_Y - PIN_OFFSET_Y
  }
};

const shuffleArray = function (arr) {
  const newArr = arr.slice();

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
};

const getRandomPrice = function () {
  return Math.floor(Math.random() * 100) * 100;
};

const getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomInRange = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomArr = function (arr) {
  const selectedElements = [];

  if (arr.length !== 0) {
    const randomElementsCount = getRandomInRange(1, arr.length);
    const allElements = shuffleArray(arr);

    for (let i = 0; i < randomElementsCount; i++) {
      selectedElements.push(allElements[i]);
    }
  }

  return selectedElements;
};

const renderPins = function (count) {
  const pins = [];

  for (let i = 0; i < count; i++) {
    const locationX = getRandomInRange(pinsPosLimits.x.min, pinsPosLimits.x.max);
    const locationY = getRandomInRange(pinsPosLimits.y.min, pinsPosLimits.y.max);
    const time = getRandomElement(TIMES);

    pins.push({
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: `${getRandomElement(TITLES)}`,
        address: `${locationX}, ${locationY}`,
        price: getRandomPrice(), // Temporary random value
        type: `${getRandomElement(APARTMENT_TYPES)}`,
        rooms: getRandomInRange(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT), // Temporary value
        guests: getRandomInRange(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT), // Temporary value
        checkin: `${time}`, // Temporary value
        checkout: `${time}`, // Temporary value
        features: getRandomArr(FEATURES),
        description: `Здесь должно быть описание квартиры`,
        photos: PHOTOS_SRC,
        location: {
          x: locationX,
          y: locationY
        }
      }
    });
  }

  return pins;
};

const createPin = function (pin) {
  const mapPin = mapPinTemplate.cloneNode(true);
  const {author, offer} = pin;
  const {avatar} = author;
  const {title, location} = offer;

  mapPin.style = `left: ${location.x}px; top: ${location.y}px;`;
  mapPin.querySelector(`img`).src = avatar;
  mapPin.querySelector(`img`).alt = title;

  return mapPin;
};

const createCard = function (pin) {
  const {offer} = pin;
  const {title, address, price, type, features, photos, checkin, checkout, description} = offer;
  const popupCard = popupCardTemplate.cloneNode(true);
  const popupCardChilds = popupCard.children;
  const featureList = popupCard.querySelector(`.popup__features`);
  const photosContainer = popupCard.querySelector(`.popup__photos`);
  const img = popupCard.querySelector(`.popup__photo`);
  let capacity = ``;
  let time = ``;

  if (pin.offer.rooms === 1 && pin.offer.guests === 1) {
    capacity = `${pin.offer.rooms} комната для ${pin.offer.guests} гостя`;
  } else if (pin.offer.rooms === 1 && pin.offer.guests > 1) {
    capacity = `${pin.offer.rooms} комната для ${pin.offer.guests} гостей`;
  } else if (pin.offer.rooms > 1 && pin.offer.guests === 1) {
    capacity = `${pin.offer.rooms} комнаты для ${pin.offer.guests} гостя`;
  } else {
    capacity = `${pin.offer.rooms} комнаты для ${pin.offer.guests} гостей`;
  }

  popupCard.querySelector(`.popup__title`).textContent = title;
  popupCard.querySelector(`.popup__text--address`).textContent = address;
  popupCard.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь`;
  popupCard.querySelector(`.popup__type`).textContent = `${typesMap[type]}`;
  popupCard.querySelector(`.popup__text--capacity`).textContent = capacity;
  popupCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  popupCard.querySelector(`.popup__description`).textContent = `${description}`;

  featureList.innerHTML = ``;
  for (let i = 0; i < features.length; i++) {
    if (features.length !== 0) {
      const feature = document.createElement(`li`);
      feature.classList.add(`popup__feature`, `popup__feature--${features[i]}`);
      featureList.appendChild(feature);
    }
  }

  for (let i = 0; i < photos.length - 1; i++) {
    photosContainer.appendChild(img.cloneNode(true));
  }

  const images = popupCard.querySelectorAll(`.popup__photo`);

  for (let i = 0; i < photos.length; i++) {
    images[i].src = photos[i];
  }

  for (let i = 0; i < popupCardChilds.length; i++) {
    if (popupCardChilds[i].tagName === `P` || popupCardChilds[i].tagName === `H4`) {
      if (popupCardChilds[i].textContent === 0 || popupCardChilds[i].textContent === ``) {
        popupCardChilds[i].remove();
      }
    }
    if (popupCardChilds[i].tagName === `UL` || popupCardChilds[i].tagName === `DIV`) {
      if (popupCardChilds[i].children.length === 0) {
        popupCardChilds[i].remove();
      }
    }
  }

  return popupCard;
};

const pins = renderPins(OFFERS_COUNT);
const pinFragment = document.createDocumentFragment();

for (let i = 0; i < pins.length; i++) {
  pinFragment.appendChild(createPin(pins[i]));
}

mapPinsContainer.appendChild(pinFragment);

const cardFragment = document.createDocumentFragment();
cardFragment.appendChild(createCard(pins[0]));
map.insertBefore(cardFragment, mapFiltersContainer);

map.classList.remove(`map--faded`);
