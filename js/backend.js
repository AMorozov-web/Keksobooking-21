'use strict';

(() => {
  const API_URL = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 3000;
  const POST = `POST`;
  const GET = `GET`;

  const StatusCode = {
    OK: 200
  };

  const getServerResponse = (url, httpMethod, onSuccess, onError, data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(httpMethod, url);
    xhr.send(data);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Ошибка. Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });
  };

  const makeRequest = (onSuccess, onError) => {
    getServerResponse(`${API_URL}/data`, GET, onSuccess, onError, null);
  };

  const upload = (data, onSuccess, onError) => {
    getServerResponse(`${API_URL}`, POST, onSuccess, onError, data);
  };

  window.backend = {
    makeRequest,
    upload,
  };
})();
