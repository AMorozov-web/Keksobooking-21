'use strict';

(() => {
  const setIdToPins = (pinsArr) => {
    const newArr = pinsArr.map((elem, index) => Object.assign({id: index}, elem));

    return newArr;
  };

  const onSuccess = (data) => {
    window.data = setIdToPins(data);
  };

  const onError = (errorText) => {
    const error = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorMessage = error.querySelector(`.error__message`);
    const errorButton = error.querySelector(`.error__button`);

    errorMessage.textContent = errorText;
    errorButton.textContent = `Закрыть`;

    document.body.insertAdjacentElement(`afterbegin`, error);

    errorButton.addEventListener(`click`, () => {
      error.remove();
    });
  };

  window.backend.makeRequest(onSuccess, onError);
})();

