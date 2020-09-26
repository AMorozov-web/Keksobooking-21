'use strict';

const SIMILAR_AD_MAX_COUNT = 8;
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

const getRandomCount = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getSimilarPins = function (count) {
  const similarPins = [];

  for (let i = 0; i < count; i++) {
    similarPins.push({
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: ``,
        address: `{{location.x}}, {{location.y}}`, // Replace with function
        price: `{{price}}`, // Replace with function
        type: `${getRandomElement(APARTMENT_TYPES)}`,
        rooms: `${getRandomCount(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT)}`, // Must be the same with guests
        guests: `${getRandomCount(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT)}`,
        checkin: `${getRandomElement(CHECKIN_TIMES)}`, // Must be the same with chackout
        checkout: `${getRandomElement(CHECKOUT_TIMES)}`,
        features: `${getRandomElement(FEATURES)}`, // need a shuffle function
        description: ``,
        photos: `${PHOTOS_SRC}`,
        location: {
          x: ``, // Replace with function
          y: `` // Replace with function
        }
      }
    });
  }

  return similarPins;
};

const pins = getSimilarPins(SIMILAR_AD_MAX_COUNT);

console.log(pins);
