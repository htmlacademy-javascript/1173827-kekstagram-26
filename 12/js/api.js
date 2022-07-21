const getData = (onSuccess,onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((picture) => onSuccess(picture))
    .catch(() => onFail('Не удалось получить данные'));
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method:'POST',
      body,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму');
      }
    })
    .catch(() => onFail('Не удалось отправить форму'));
};

export {getData,sendData};
