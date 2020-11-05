'use strict';

const DEBOUNCE_INTERVAL = 500;
const KeyCodes = {
  ENTER: `Enter`,
  ESC: `Escape`,
};

const debounceFunction = (callback, ms = DEBOUNCE_INTERVAL) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(() => {
      callback(...parameters);
    }, ms);
  };
};

const toggleFormElements = (parentElem, state = false) => {
  for (const elem of parentElem.children) {
    elem.disabled = state;
  }
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

const checkPressEnter = (evt, action) => {
  if (evt.key === KeyCodes.ENTER) {
    action();
  }
};

const checkPressEsc = (evt, action) => {
  if (evt.key === KeyCodes.ESC) {
    action();
  }
};

const setIdToElements = (arr) => {
  return arr.map((elem, index) => Object.assign({id: index}, elem));
};

window.util = {
  toggleFormElements,
  declTextByNumber,
  checkPressEnter,
  checkPressEsc,
  setIdToElements,
  debounceFunction,
};
