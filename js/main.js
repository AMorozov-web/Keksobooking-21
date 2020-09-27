'use strict';

const SIMILAR_AD_MAX_COUNT = 8;
const PIN_OFFSET_X = 25;
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
const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
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

const body = document.querySelector(`body`);
const offset = parseInt((getComputedStyle(body, true).marginLeft), 10);
const map = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const mapPinsList = document.querySelector(`.map__pins`);
const mapPinTemplate = document.querySelector(`#pin`)
  .content.querySelector(`.map__pin`);

const getRandomCount = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getCoordinates = function (element) {
  let box = element.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset - offset
  };
};

const getPinLocationX = function () {
  let minPosX = getCoordinates(mainPin).left - PINS_POS_INTERVAL_X + PIN_OFFSET_X;
  let maxPosX = getCoordinates(mainPin).left + PINS_POS_INTERVAL_X + PIN_OFFSET_X;

  return getRandomCount(minPosX, maxPosX);
};

const getPinLocationY = function () {
  let minPosY = getCoordinates(mainPin).top - PINS_POS_INTERVAL_Y - PIN_OFFSET_Y;
  let maxPosY = getCoordinates(mainPin).top + PINS_POS_INTERVAL_Y - PIN_OFFSET_Y;

  return getRandomCount(minPosY, maxPosY);
};

const getSimilarPins = function (count) {
  const similarPins = [];

  for (let i = 0; i < count; i++) {
    similarPins.push({
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: `title`,
        address: `${getPinLocationX()}, ${getPinLocationY()}`,
        price: `{{price}}`, // Temporary value
        type: `${getRandomElement(APARTMENT_TYPES)}`,
        rooms: `${getRandomCount(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT)}`, // Temporary value
        guests: `${getRandomCount(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT)}`, // Temporary value
        checkin: `${getRandomElement(CHECKIN_TIMES)}`, // Temporary value
        checkout: `${getRandomElement(CHECKOUT_TIMES)}`, // Temporary value
        features: `${getRandomElement(FEATURES)}`, // Need a shuffle function
        description: ``,
        photos: `${PHOTOS_SRC}`,
        location: {
          x: `${getPinLocationX()}`,
          y: `${getPinLocationY()}`
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

const pins = getSimilarPins(SIMILAR_AD_MAX_COUNT);
const fragment = document.createDocumentFragment();

for (let i = 0; i < pins.length; i++) {
  fragment.appendChild(createPins(pins[i]));
}

mapPinsList.appendChild(fragment);

map.classList.remove(`map--faded`);
