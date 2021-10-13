const getRandomInt = function (min, max) {
  if(max <= min) {
    throw new Error('Ошибка! Некорректные данные. Начальное число, не должно быть больше последнего.');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInt (1, 100);

const getRandomСoordinates = function (min, max, afterTheComma) {
  if(max <= min){
    throw new Error('Ошибка! Некорректные данные. Начальное число, не должно быть больше последнего.');
  }
  return Number((Math.random() * (max - min + 1) + min).toFixed(afterTheComma));
};

getRandomСoordinates(1, 1000, 2);
