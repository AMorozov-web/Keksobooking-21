'use strict';

(() => {
  const mapPinTemplate = document.querySelector(`#pin`)
    .content.querySelector(`.map__pin`);

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

  window.pin = {
    createPin,
  };
})();
