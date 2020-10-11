'use strict';

const OFFERS_COUNT = 8;
const MAIN_PIN_OFFSET_X = 62;
const MAIN_PIN_OFFSET_Y = 62;
const MAIN_PIN_ACTIVE_OFFSET_Y = 75;
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
const ROOMS_DECLENSION = [`комната`, `комнаты`, `комнат`];
const GUESTS_DECLENSION = [`гостя`, `гостей`, `гостей`];
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
const mapFiltersForm = document.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);

const disableElements = (parentElem) => {
  for (let i = 0; i < parentElem.children.length; i++) {
    parentElem.children[i].setAttribute(`disabled`, true);
  }
};

const enableElements = (parentElem) => {
  for (let i = 0; i < parentElem.children.length; i++) {
    parentElem.children[i].removeAttribute(`disabled`);
  }
};

const shuffleArray = (arr) => {
  const newArr = arr.slice();

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
};

const getRandomPrice = () => {
  return Math.floor(Math.random() * 100) * 100;
};

const getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomInRange = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomArr = (arr) => {
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

const declTextByNumber = (number, textWordsArr) => {
  const a = Math.abs(number) % 100;
  const b = number % 10;

  if (a > 10 && a < 20) {
    return textWordsArr[2];
  }
  if (b > 1 && b < 5) {
    return textWordsArr[1];
  }
  if (b === 1) {
    return textWordsArr[0];
  }
  return textWordsArr[2];
};

const renderPins = (count) => {
  const pins = [];

  for (let i = 0; i < count; i++) {
    const locationX = getRandomInRange(pinsPosLimits.x.min, pinsPosLimits.x.max);
    const locationY = getRandomInRange(pinsPosLimits.y.min, pinsPosLimits.y.max);
    const time = getRandomElement(TIMES);
    const type = getRandomElement(APARTMENT_TYPES);
    const apartmentType = typesMap[type];

    pins.push({
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: `${getRandomElement(titlesMap[apartmentType])}`,
        address: `${locationX}, ${locationY}`,
        price: getRandomPrice(), // Temporary random value
        type: `${type}`,
        rooms: getRandomInRange(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT), // Temporary value
        guests: getRandomInRange(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT), // Temporary value
        checkin: `${time}`, // Temporary value
        checkout: `${time}`, // Temporary value
        features: getRandomArr(FEATURES),
        description: `Здесь должно быть описание квартиры`,
        photos: getRandomArr(PHOTOS_SRC),
        location: {
          x: locationX,
          y: locationY
        }
      }
    });
  }

  return pins;
};

const createPin = (pin) => {
  const mapPin = mapPinTemplate.cloneNode(true);
  const {author, offer} = pin;
  const {avatar} = author;
  const {title, location} = offer;

  if (!offer) {
    return false;
  }

  mapPin.style = `left: ${location.x}px; top: ${location.y}px;`;
  mapPin.querySelector(`img`).src = avatar;
  mapPin.querySelector(`img`).alt = title;

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
  if (parentElement.children !== 0) {
    for (let i = 0; i < photosArr.length - 1; i++) {
      parentElement.appendChild(parentElement.children[0].cloneNode(true));
    }
  }
  const images = parentElement.children;

  for (let i = 0; i < photosArr.length; i++) {
    images[i].src = photosArr[i];
  }
};

const getPriceValue = (price) => {
  if (price) {
    return `${price}₽/ночь`;
  } else {
    return ``;
  }
};

const checkCardElements = (cardElement) => {
  switch (cardElement.tagName) {
    case `P`:
    case `H3`:
    case `H4`:
      if (cardElement.textContent === ``) {
        cardElement.remove();
      }
      break;
    case `IMG`:
      if (!cardElement.src) {
        cardElement.remove();
      }
      break;
    default:
      break;
  }
};

const createCard = (pin) => {
  const {author, offer} = pin;
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
    description
  } = offer;
  const popupCard = popupCardTemplate.cloneNode(true);
  const popupCardChilds = popupCard.children;
  const featureList = popupCard.querySelector(`.popup__features`);
  const photosContainer = popupCard.querySelector(`.popup__photos`);
  const roomsDecl = declTextByNumber(rooms, ROOMS_DECLENSION);
  const guestsDecl = declTextByNumber(guests, GUESTS_DECLENSION);
  const capacity = `${rooms} ${roomsDecl} для ${guests} ${guestsDecl}`;

  popupCard.querySelector(`.popup__avatar`).src = avatar;
  popupCard.querySelector(`.popup__title`).textContent = title;
  popupCard.querySelector(`.popup__text--address`).textContent = address;
  popupCard.querySelector(`.popup__text--price`).textContent = getPriceValue(price);
  popupCard.querySelector(`.popup__type`).textContent = `${typesMap[type]}`;
  popupCard.querySelector(`.popup__text--capacity`).textContent = capacity;
  popupCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  popupCard.querySelector(`.popup__description`).textContent = `${description}`;

  featureList.innerHTML = ``;
  createFeatures(features, featureList);

  createPhotos(photos, photosContainer);

  for (let i = 0; i < popupCardChilds.length; i++) {
    checkCardElements(popupCardChilds[i]);
  }

  return popupCard;
};

const setAddress = () => {
  const input = adForm.querySelector(`input[name="address"]`);
  const fieldset = input.parentElement;
  if (!fieldset.getAttribute(`disabled`)) {
    input.value = `${mainPinTop + MAIN_PIN_ACTIVE_OFFSET_Y}, ${mainPinLeft + MAIN_PIN_OFFSET_X / 2}`;
  } else {
    input.value = `${mainPinTop + MAIN_PIN_OFFSET_Y / 2}, ${mainPinLeft + MAIN_PIN_OFFSET_X / 2}`;
  }
};

const onMainPinPressEnter = (evt) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    onCLickActivatePage();
  }
};

const onCLickActivatePage = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);

  enableElements(mapFiltersForm);
  enableElements(adForm);
  setAddress();
};

disableElements(mapFiltersForm);
disableElements(adForm);
setAddress();

mainPin.addEventListener(`mousedown`, onCLickActivatePage);
mainPin.addEventListener(`keydown`, onMainPinPressEnter);

// Закомментируй все что ниже перед проверкой

const pins = renderPins(OFFERS_COUNT);
const pinFragment = document.createDocumentFragment();
pins.forEach((elem) => {
  pinFragment.appendChild(createPin(elem));
});
mapPinsContainer.appendChild(pinFragment);

const cardFragment = document.createDocumentFragment();
cardFragment.appendChild(createCard(pins[0]));
map.insertBefore(cardFragment, mapFiltersContainer);
