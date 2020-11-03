'use strict';

(() => {
  const MAX_PINS_COUNT = 5;
  const FILTER_ANY_VALUE = `any`;
  const filterType = document.querySelector(`#housing-type`);

  filterType.addEventListener(`change`, () => {
    const value = filterType.value;
    const selectedPinsData = [];

    window.data.forEach((current) => {
      if (current.offer.type === value || value === FILTER_ANY_VALUE) {
        selectedPinsData.push(current);
      }
    });

    window.card.closeCard();
    window.pin.updatePins(selectedPinsData.slice(0, MAX_PINS_COUNT));
  });
})();
