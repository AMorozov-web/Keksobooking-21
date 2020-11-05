'use strict';

const ROOMS_DECLENSION = [
  `комната`,
  `комнаты`,
  `комнат`,
];

const GUESTS_DECLENSION = [
  `гостя`,
  `гостей`,
  `гостей`,
];

const popupCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const map = document.querySelector(`.map`);
const mapPinsContainer = document.querySelector(`.map__pins`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);

const typesMap = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`,
};

const createFeatures = (featuresArr, parentElement) => {
  if (featuresArr.length === 0) {
    parentElement.remove();
    return;
  }

  featuresArr.forEach((elem) => {
    const feature = document.createElement(`li`);
    feature.classList.add(`popup__feature`, `popup__feature--${elem}`);
    parentElement.appendChild(feature);
  });
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

const closeCard = () => {
  const popupCard = map.querySelector(`.popup`);

  if (popupCard) {
    popupCard.remove();
    mapPinsContainer.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);
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

const onCardPressEsc = (evt) => {
  window.util.checkPressEsc(evt, closeCard);

  document.removeEventListener(`keydown`, onCardPressEsc);
};

const placeCard = (elem) => {
  closeCard();

  const card = createCard(elem);
  map.insertBefore(card, mapFiltersContainer);
  document.addEventListener(`keydown`, onCardPressEsc);
};

window.card = {
  placeCard,
  closeCard,
};
