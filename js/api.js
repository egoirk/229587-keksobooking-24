const getData = (onSuccess, onFail) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((offers) => {
            onSuccess(offers);
          });
      } else {
        onFail('Ошибка! Данные с сервера не получены. Попробуйте, пожалуйста,позже.');
      }
    })
    .catch(() => {
      onFail('Ошибка! Данные с сервера не получены. Попробуйте, пожалуйста,позже.');
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить данные. Попробуйте, пожалуйста, ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить данные. Попробуйте, пожалуйста, ещё раз');
    });
};

export { getData, sendData };
