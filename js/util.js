const ALERT_SHOW_TIME = 5000;
const KEY_ESC = 'Escape';
const checkKeydownEsc = (evt) => evt.key === KEY_ESC;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = '580px';
  alertContainer.style.height = '100px';
  alertContainer.style.top = '10%';
  alertContainer.style.left = '35%';
  alertContainer.style.padding = '20px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'black';
  alertContainer.style.backgroundColor = 'yellow';
  alertContainer.style.borderStyle = 'double';
  alertContainer.style.borderWidth = '5px';
  alertContainer.style.borderColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { checkKeydownEsc, showAlert, debounce };

