'use strict';

(() => {
  const DEBOUNCE_INTERVAL = 500;

  const debounceFunction = (callback) => {
    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(() => {
        callback(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  const toggleFormElements = (parentElem, state = false) => {
    for (let elem of parentElem.children) {
      elem.disabled = state;
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

  const checkPressEnter = (evt, action) => {
    if (evt.key === `Enter`) {
      action();
    }
  };

  const checkPressEsc = (evt, action) => {
    if (evt.key === `Escape`) {
      action();
    }
  };

  const setIdToElements = (arr) => {
    return arr.map((elem, index) => Object.assign({id: index}, elem));
  };

  window.util = {
    toggleFormElements,
    shuffleArray,
    getRandomElement,
    getRandomInRange,
    getRandomArr,
    declTextByNumber,
    checkPressEnter,
    checkPressEsc,
    setIdToElements,
    debounceFunction,
  };
})();
