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
const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];
const PHOTOS_SRC = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

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
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
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
  const randomElementsCount = getRandomInRange(1, arr.length);
  const allElements = arr.slice();
  const selectedElements = [];

  shuffleArray(allElements);

  for (let i = 0; i < randomElementsCount; i++) {
    selectedElements.push(allElements[i]);
  }

  return selectedElements;
};

const getTypeText = function (type) {
  const selectedType = type;

  switch (selectedType) {
    case `palace`: return `Дворец`;
    case `flat`: return `Квартира`;
    case `house`: return `Дом`;
    case `bungalow`: return `Бунгало`;
  }

  return selectedType;
};

const getSimilarPins = function (count) {
  const similarPins = [];

  for (let i = 0; i < count; i++) {
    const locationX = getRandomInRange(pinsPosLimits.x.min, pinsPosLimits.x.max);
    const locationY = getRandomInRange(pinsPosLimits.y.min, pinsPosLimits.y.max);
    const time = getRandomElement(TIMES);

    similarPins.push({
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: `Здесь должен быть заголовок объявления`,
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

  return similarPins;
};

const createPins = function (pin) {
  const mapPin = mapPinTemplate.cloneNode(true);

  mapPin.style = `left: ${pin.offer.location.x}px; top: ${pin.offer.location.y}px;`;
  mapPin.querySelector(`img`).src = pin.author.avatar;
  mapPin.querySelector(`img`).alt = pin.offer.title;

  return mapPin;
};

const createCard = function (pin) {
  const popupCard = popupCardTemplate.cloneNode(true);
  const featureList = popupCard.querySelector(`.popup__features`);
  const features = pin.offer.features;
  const photosContainer = popupCard.querySelector(`.popup__photos`);
  const photos = pin.offer.photos;

  popupCard.querySelector(`.popup__title`).textContent = pin.offer.title;
  popupCard.querySelector(`.popup__text--address`).textContent = pin.offer.address;
  popupCard.querySelector(`.popup__text--price`).textContent = `${pin.offer.price}₽/ночь`;
  popupCard.querySelector(`.popup__type`).textContent = `${getTypeText(pin.offer.type)}`;
  popupCard.querySelector(`.popup__text--capacity`).textContent = `${pin.offer.rooms} комнаты для ${pin.offer.guests} гостей`;
  popupCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}`;
  popupCard.querySelector(`.popup__description`).textContent = `${pin.offer.description}`;

  featureList.innerHTML = ``;
  for (let i = 0; i < features.length; i++) {
    const feature = document.createElement(`li`);
    feature.classList.add(`popup__feature`, `popup__feature--${features[i]}`);
    featureList.appendChild(feature);
  }

  photosContainer.innerHTML = ``;
  for (let i = 0; i < photos.length; i++) {
    const photo = document.createElement(`img`);
    photo.classList.add(`popup__photo`);
    photo.src = `${photos[i]}`;
    photo.width = 45;
    photo.height = 40;
    photo.alt = `Фотография жилья`;
    photosContainer.appendChild(photo);
  }

  return popupCard;
};

const pins = getSimilarPins(OFFERS_COUNT);
const pinFragment = document.createDocumentFragment();

for (let i = 0; i < pins.length; i++) {
  pinFragment.appendChild(createPins(pins[i]));
}

mapPinsContainer.appendChild(pinFragment);

const cardFragment = document.createDocumentFragment();
cardFragment.appendChild(createCard(pins[0]));
map.insertBefore(cardFragment, mapFiltersContainer);

map.classList.remove(`map--faded`);
