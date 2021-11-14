import {getRandomPositiveInteger, getRandomPositiveFloat} from './util.js';

const TITLE = [
  'Atlas Hotel',
  'Добрый кот',
  'Eilot',
  'Serenity',
  'Marina Inn at Grande Dunes',
  'Coral Beach Resort',
  'Спа-вилла PANORAMA',
  'Гостиница Северная',
  'Усадьба Онегина',
  'Гостевой дом на Красноармейской',
  'Метрополь Гранд Отель Геленджик',
  'Желтый Дом',
  'Северный Берег',
  'Aдажио на Невском проспекте',
  'Рэдиссон Блу Шереметьево Аэропорт',
  'Лофт Отель Набоков',
  'Гостевой Дом На Мамайке',
  'Гостевой дом Русская Изба',
  'ECO Хостел',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Отель расположен в 3 км от центра города. К услугам гостей бар, бесплатный Wi-Fi на всей территории, а также кафе, где подают блюда европейской кухни.',
  'Номера оформлены в строгом стиле в нейтральных тонах. В числе удобств каждого номера — холодильник, шкаф и рабочий стол. Гостям предоставляются тапочки и набор для приготовления чая.',
  'В распоряжении гостей отеля общая кухня с гостиной зоной для отдыха.',
  'В апартаментах есть телевизор с плоским экраном и спутниковыми каналами, а также полностью оборудованная мини-кухня. В некоторых апартаментах есть терраса.',
  'Апартаменты расположены в 650 м от пляжа. К услугам гостей бесплатный Wi-Fi, сад и кондиционер. Из окон открывается вид на сад.',
  'Дом для отпуска располагает 2 спальнями, телевизором с кабельными каналами, полностью оборудованной кухней с посудомоечной машиной и микроволновой печью, а также стиральной машиной и 2 ванными комнатами с душем.',
  'Отель расположен у причала для яхт, в 2,5 км от прибрежного курорта. В распоряжении гостей бесплатный Wi-Fi, рестораны, 2 бассейна с гидромассажной ванной и возможность заказать спа-услуги непосредственно в номер.',
  'Этот курортный отель расположен рядом с пляжем. На территории отеля функционирует аквапарк, оборудовано 10 бассейнов, аттракцион «ленивая река» и несколько гидромассажных ванн. Поездка от отеля до торговых центров занимает менее 10 минут.',
  'В отеле обустроена развлекательная зона с 8 дорожками для боулинга, игровыми автоматами и настольными играми, а также кафе-мороженым и снэк-баром. Желающие могут посетить фитнес-центр или сауну.',
  'На территории разбит сад с принадлежностями для барбекю. Окрестности прекрасно подходят для велосипедных прогулок.',
  'На территории гостевого дома обустроена собственная бесплатная парковка. Для гостей работает пункт проката лыжного снаряжения.',
  'В распоряжении гостей семейные номера и терраса. Сотрудники экскурсионного бюро будут рады предоставить полезную туристическую информацию.',
  'Этот курортный спа-отель с красивым видом на бухту',
  'В спа-центре отеля с соляной пещерой работает несколько видов саун и лакониум. Также к услугам гостей крытый и открытый бассейны со снэк-баром. Гости могут позаниматься в современном фитнес-центре гостиницы. Профессиональные массажисты и косметологи проводят разнообразные массажные и спа-процедуры. На территории есть круглосуточный лобби-бар, туристическое бюро и детская игровая площадка.',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LISTING_COUNT = 10;

const getLocation = () => ({
  lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
  lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
});

const IMAGE_ID = [];
const getAvatar = () => {
  for (let iter = 1; iter <= 10; iter++) {
    if (iter < 10) {
      IMAGE_ID.push(`0${  iter}`);
    } else {
      IMAGE_ID.push(iter);
    }
  }
  return IMAGE_ID;
};

const getAuthor = (index) => ({
  avatar: `img/avatars/user${  getAvatar()[index]  }.png`,
});

const getOffer = () => ({
  title: TITLE[getRandomPositiveInteger(0, TITLE.length - 1)],
  address: getLocation(),
  price: getRandomPositiveInteger(2000, 10000),
  type: TYPE[getRandomPositiveInteger(0, TYPE.length - 1)],
  rooms: getRandomPositiveInteger(1, 10),
  guests: getRandomPositiveInteger(1, 7),
  checkin: CHECKIN[getRandomPositiveInteger(0, CHECKIN.length - 1)],
  checkout: CHECKOUT[getRandomPositiveInteger(0, CHECKOUT.length - 1)],
  features: FEATURES.slice(getRandomPositiveInteger(0, FEATURES.length - 1)),
  description: DESCRIPTION[getRandomPositiveInteger(0, DESCRIPTION.length - 1)],
  photos: PHOTOS.slice(getRandomPositiveInteger(0, PHOTOS.length - 1)),
});

const createAd = (index) => ({
  auther: getAuthor(index),
  offer: getOffer(),
  location: getLocation(),
});

const LISTING = [];
const createListing = () => {
  for (let index = 0; index < LISTING_COUNT; index++) {
    LISTING.push(createAd(index));
  }
  return LISTING;
};

export {createListing};
