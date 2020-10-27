'use strict';

(() => {
  const mapPinsContainer = document.querySelector(`.map__pins`);
  const mapPinTemplate = document.querySelector(`#pin`)
    .content.querySelector(`.map__pin`);

  const createPin = (pin) => {
    const mapPin = mapPinTemplate.cloneNode(true);

    if (!pin.offer) {
      return false;
    }

    mapPin.style = `left: ${pin.offer.location.x}px; top: ${pin.offer.location.y}px;`;
    mapPin.querySelector(`img`).src = pin.author.avatar;
    mapPin.querySelector(`img`).alt = pin.offer.title;
    mapPin.dataset.id = pin.id;

    return mapPin;
  };

  const placePins = () => {
    const pinFragment = document.createDocumentFragment();

    window.data.pins.forEach((elem) => {
      pinFragment.appendChild(createPin(elem));
    });

    mapPinsContainer.appendChild(pinFragment);
  };

  const onMapPinsClick = (evt) => {
    const pinButton = evt.target.closest(`button[type="button"]`);

    if (pinButton && !evt.target.classList.contains(`map__pin--main`) && !pinButton.classList.contains(`map__pin--active`)) {
      const buttonId = parseInt(pinButton.dataset.id, 10);
      const currentCardData = window.data.pins.find((item) => (item.id === buttonId));

      window.card.placeCard(currentCardData);

      pinButton.classList.add(`map__pin--active`);
    }
  };

  window.pin = {
    placePins,
    onMapPinsClick,
  };
})();
