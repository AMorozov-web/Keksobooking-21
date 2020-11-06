'use strict';

const main = document.querySelector(`main`);
const successMessage = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
const errorMessage = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);

const MessageTypes = {
  ERROR: `error`,
  SUCCESS: `success`,
};

const removeMessage = (messageType) => {
  main.querySelector(`.${messageType}`).remove();
};

const onErrorEscPress = (evt) => {
  window.util.checkPressEsc(evt, removeMessage(MessageTypes.ERROR));
  document.removeEventListener(`keydown`, onErrorEscPress);
};

const onSuccessEscPress = (evt) => {
  window.util.checkPressEsc(evt, removeMessage(MessageTypes.SUCCESS));
  document.removeEventListener(`keydown`, onSuccessEscPress);
};

const renderMessage = (message, messageText = false) => {
  if (messageText && message.querySelector(`.error__message`)) {
    message.querySelector(`.error__message`).textContent = messageText;
  }

  main.insertAdjacentElement(`afterbegin`, message);

  message.addEventListener(`click`, () => {
    message.remove();
  });
};

const renderSuccessMessage = () => {
  renderMessage(successMessage);
  document.addEventListener(`keydown`, onSuccessEscPress);
};

const renderErrorMessage = (errorText) => {
  renderMessage(errorMessage, errorText);
  document.addEventListener(`keydown`, onErrorEscPress);
};

window.message = {
  error: renderErrorMessage,
  success: renderSuccessMessage,
};
