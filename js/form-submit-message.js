import { checkKeydownEsc } from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successButton = successMessageTemplate.querySelector('.success__button');
const errorButton = errorMessageTemplate.querySelector('.error__button');

let activeMessage;

const closeMessage = () => {
  document.body.removeChild(activeMessage);
  window.removeEventListener('keydown',onKeydown, true);
  window.removeEventListener('click',onClickMessageForm);
};

function onClickMessageForm (evt) {
  if (evt.target === activeMessage){
    closeMessage();
  }
}

function onKeydown(evt) {
  if(checkKeydownEsc(evt)){
    evt.stopImmediatePropagation();
    closeMessage();
  }
}

const showSuccessMessage = () => {
  activeMessage = successMessageTemplate;
  document.body.appendChild(successMessageTemplate);

  successButton.addEventListener('click', closeMessage, { once:true });
  window.addEventListener('keydown',onKeydown);
  window.addEventListener('click',onClickMessageForm);
};

const showErrorMessage = () => {
  activeMessage = errorMessageTemplate;
  document.body.appendChild(errorMessageTemplate);

  errorButton.addEventListener('click', closeMessage, { once:true });
  window.addEventListener('keydown',onKeydown);
  window.addEventListener('click',onClickMessageForm);
};

export { showSuccessMessage, showErrorMessage };
