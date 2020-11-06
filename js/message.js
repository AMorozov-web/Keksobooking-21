'use strict';

const main = document.querySelector(`main`);

const renderMessage = (messageTemplate, messageText = false) => {
  if (messageText && messageTemplate.querySelector(`.error__message`)) {
    messageTemplate.querySelector(`.error__message`).textContent = messageText;
  }

  const closeMessage = () => {
    messageTemplate.remove();
    document.removeEventListener(`keydown`, onDocumentKeydown);
  };

  const onDocumentKeydown = (evt) => {
    window.util.checkPressEsc(evt, closeMessage);
  };

  main.insertAdjacentElement(`afterbegin`, messageTemplate);
  document.addEventListener(`keydown`, onDocumentKeydown);

  messageTemplate.addEventListener(`click`, () => {
    closeMessage();
  });
};

window.message = {
  show: renderMessage,
};
