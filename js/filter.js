'use strict';

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
  return ad.offer.type === typeFilter.value || typeFilter.value === FILTER_ANY_VALUE;
};

const filterByPrice = (ad) => {
  switch (priceFilter.value) {
    case PriceFilterValues.LOW:
      return ad.offer.price < PriceFilterPrices.MIN;
    case PriceFilterValues.MIDDLE:
      return ad.offer.price >= PriceFilterPrices.MIN && ad.offer.price < PriceFilterPrices.MAX;
    case PriceFilterValues.HIGH:
      return ad.offer.price >= PriceFilterPrices.MAX;
    case FILTER_ANY_VALUE:
      return true;
    default:
      return false;
  }
};

const filterByRoomsCount = (ad) => {
  return ad.offer.rooms === +roomsCountFilter.value || roomsCountFilter.value === FILTER_ANY_VALUE;
};

const filterByGuestsCount = (ad) => {
  return ad.offer.guests >= +guestsCountFilter.value || guestsCountFilter.value === FILTER_ANY_VALUE;
};

const filterByFeatures = (ad) => {
  const selectedFeatures = Array.from(featuresFilter.querySelectorAll(`input:checked`));

  return selectedFeatures.every((feature) => ad.offer.features.includes(feature.value));
};

const getFilteredData = (data) => {
  const filteredData = [];

  for (let i = 0; i < data.length; i++) {
    if (filterByType(data[i]) && filterByPrice(data[i]) && filterByRoomsCount(data[i])
      && filterByGuestsCount(data[i]) && filterByFeatures(data[i])) {
      filteredData.push(data[i]);
    }

    if (filteredData.length === MAX_PINS_COUNT) {
      return filteredData;
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
