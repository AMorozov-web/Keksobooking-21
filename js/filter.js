'use strict';

(() => {
  const MAX_PINS_COUNT = 5;
  const FILTER_ANY_VALUE = `any`;
  const filtersContainer = document.querySelector(`.map__filters`);
  const typeFilter = filtersContainer.querySelector(`#housing-type`);
  const priceFilter = filtersContainer.querySelector(`#housing-price`);
  const roomsCountFilter = filtersContainer.querySelector(`#housing-rooms`);
  const guestsCountFilter = filtersContainer.querySelector(`#housing-guests`);
  const featuresFilter = filtersContainer.querySelector(`#housing-features`);

  const PriceFilterValues = {
    LOW: `low`,
    MIDDLE: `middle`,
    HIGH: `high`,
  };

  const PriceFilterPrices = {
    MIN: 10000,
    MAX: 50000,
  };

  const filterByType = (ad) => {
    if (ad.offer.type === typeFilter.value || typeFilter.value === FILTER_ANY_VALUE) {
      return true;
    }

    return false;
  };

  const filterByPrice = (ad) => {
    if ((priceFilter.value === PriceFilterValues.LOW && ad.offer.price < PriceFilterPrices.MIN)
      || (priceFilter.value === PriceFilterValues.MIDDLE && ad.offer.price >= PriceFilterPrices.MIN
        && ad.offer.price < PriceFilterPrices.MAX)
      || (priceFilter.value === PriceFilterValues.HIGH && ad.offer.price >= PriceFilterPrices.MAX)
      || priceFilter.value === FILTER_ANY_VALUE) {
      return true;
    }

    return false;
  };

  const filterByRoomsCount = (ad) => {
    if (ad.offer.rooms === +roomsCountFilter.value || roomsCountFilter.value === FILTER_ANY_VALUE) {
      return true;
    }

    return false;
  };

  const filterByGuestsCount = (ad) => {
    if (ad.offer.guests >= +guestsCountFilter.value || guestsCountFilter.value === FILTER_ANY_VALUE) {
      return true;
    }

    return false;
  };

  const filterByFeatures = (ad) => {
    const selectedFeatures = Array.from(featuresFilter.querySelectorAll(`input:checked`));
    const adFeatures = ad.offer.features;

    return selectedFeatures.every((feature) => adFeatures.includes(feature.value));
  };

  const getFilteredData = (data) => {
    const filteredData = [];

    for (let i = 0; i < data.length; i++) {
      if (filteredData.length >= MAX_PINS_COUNT) {
        return filteredData;
      }

      if (filterByType(data[i]) && filterByPrice(data[i]) && filterByRoomsCount(data[i])
        && filterByGuestsCount(data[i]) && filterByFeatures(data[i])) {
        filteredData.push(data[i]);
      }
    }

    return filteredData;
  };

  const onFiltersChange = () => {
    const selectedData = getFilteredData(window.data);

    window.pin.updatePins(selectedData);
  };

  filtersContainer.addEventListener(`change`, onFiltersChange);

  window.filter = getFilteredData;
})();
