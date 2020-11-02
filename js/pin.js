'use strict';

(() => {
  const MAX_PINS_COUNT = 5;
  const mapPinsContainer = document.querySelector(`.map__pins`);
  const mapPinTemplate = document.querySelector(`#pin`)
    .content.querySelector(`.map__pin`);

  const createPin = (pin) => {
    const mapPin = mapPinTemplate.cloneNode(true);

    if (!pin.offer) {
      return false;
    }

    mapPin.style = `left: ${pin.location.x}px; top: ${pin.location.y}px;`;
    mapPin.querySelector(`img`).src = pin.author.avatar;
    mapPin.querySelector(`img`).alt = pin.offer.title;
    mapPin.dataset.id = pin.id;

    return mapPin;
  };

  const placePins = (data) => {
    const pinFragment = document.createDocumentFragment();

    for (let i = 0; i < MAX_PINS_COUNT; i++) {
      const pin = data[i];
      pinFragment.appendChild(createPin(pin));
    }

    mapPinsContainer.appendChild(pinFragment);
  };

  const onMapPinsClick = (evt) => {
    const pinButton = evt.target.closest(`button[type="button"]`);

    if (pinButton && !evt.target.classList.contains(`map__pin--main`) && !pinButton.classList.contains(`map__pin--active`)) {
      const buttonId = parseInt(pinButton.dataset.id, 10);
      const currentCardData = window.data.find((item) => (item.id === buttonId));

      window.card.placeCard(currentCardData);

      pinButton.classList.add(`map__pin--active`);
    }
  };

  const removePins = () => {
    const pins = mapPinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    pins.forEach((pin) => {
      pin.remove();
    });
  };

  window.pin = {
    placePins,
    onMapPinsClick,
    removePins,
  };
})();
