'use strict';

(() => {
  const MAX_PINS_COUNT = 8;
  const PIN_OFFSET_X = 50;
  const PIN_OFFSET_Y = 70;
  const PINS_POS_INTERVAL_X = 220;
  const PINS_POS_INTERVAL_Y = 100;
  const MIN_ROOMS_COUNT = 1;
  const MAX_ROOMS_COUNT = 3;
  const MIN_GUESTS_COUNT = 1;
  const MAX_GUESTS_COUNT = 3;
  const APARTMENT_TYPES = [
    `palace`,
    `flat`,
    `house`,
    `bungalow`
  ];
  const TIMES = [
    `12:00`,
    `13:00`,
    `14:00`
  ];
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
  const typesMap = {
    'palace': `Дворец`,
    'flat': `Квартира`,
    'house': `Дом`,
    'bungalow': `Бунгало`
  };
  const titlesMap = {
    'Дворец': [
      `Огромный прекрасный дворец`,
      `Маленький ужасный дворец`
    ],
    'Квартира': [
      `Большая уютная квартира`,
      `Маленькая неуютная квартира`
    ],
    'Дом': [
      `Красивый гостевой домик`,
      `Некрасивый негостеприимный домик`
    ],
    'Бунгало': [
      `Уютное бунгало далеко от моря`,
      `Неуютное бунгало по колено в воде`
    ]
  };
  const mainPin = document.querySelector(`.map__pin--main`);
  const mainPinTop = parseInt(mainPin.style.top, 10);
  const mainPinLeft = parseInt(mainPin.style.left, 10);
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

  const getRandomPrice = () => {
    return Math.floor(Math.random() * 100) * 100;
  };

  const generateData = (count) => {
    const pinsData = [];

    for (let i = 0; i < count; i++) {
      const locationX = window.util.getRandomInRange(pinsPosLimits.x.min, pinsPosLimits.x.max);
      const locationY = window.util.getRandomInRange(pinsPosLimits.y.min, pinsPosLimits.y.max);
      const time = window.util.getRandomElement(TIMES);
      const type = window.util.getRandomElement(APARTMENT_TYPES);
      const apartmentType = typesMap[type];

      pinsData.push({
        author: {
          avatar: `img/avatars/user0${i + 1}.png`
        },
        offer: {
          title: `${window.util.getRandomElement(titlesMap[apartmentType])}`,
          address: `${locationX}, ${locationY}`,
          price: getRandomPrice(), // Temporary random value
          type: `${type}`,
          rooms: window.util.getRandomInRange(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT), // Temporary value
          guests: window.util.getRandomInRange(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT), // Temporary value
          checkin: `${time}`, // Temporary value
          checkout: `${time}`, // Temporary value
          features: window.util.getRandomArr(FEATURES),
          description: `Здесь должно быть описание`,
          photos: window.util.getRandomArr(PHOTOS_SRC),
          location: {
            x: locationX,
            y: locationY
          }
        }
      });
    }

    return pinsData;
  };

  const setIdToPins = (pinsArr) => {
    const newArr = pinsArr.map((elem, index) => Object.assign({id: index}, elem));

    return newArr;
  };

  const pinsData = generateData(MAX_PINS_COUNT);
  const pins = setIdToPins(pinsData);

  window.data = {
    pins,
  };
})();

