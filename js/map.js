import {getOffer} from './offers.js';
import {MAIN_PIN_LATITUDE, MAIN_PIN_LONGITUDE} from './data.js';

const MAP = L.map('map-canvas');
const MARKER_GROUP = L.layerGroup().addTo(MAP);
const MAP_ZOOM = 13;

const MAIN_PIN_ICON = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: MAIN_PIN_LATITUDE,
    lng: MAIN_PIN_LONGITUDE,
  },
  {
    draggable: true,
    icon: MAIN_PIN_ICON,
  },
);

const adressInput = document.querySelector('#address');

const setAddressInputValue = () => {
  adressInput.value = `${MAIN_PIN_LATITUDE}, ${MAIN_PIN_LONGITUDE}`;
};

const addMap = () => {
  MAP.on('load', () => {
    setAddressInputValue();
  })
    .setView({ lat: MAIN_PIN_LATITUDE, lng: MAIN_PIN_LONGITUDE }, MAP_ZOOM);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(MAP);
};

const addMainPin = () => {
  mainPinMarker
    .on('moveend', (evt) => {
      const markerTarget = evt.target;
      adressInput.value = `${markerTarget.getLatLng().lat.toFixed(5)}, ${markerTarget.getLatLng().lng.toFixed(5)}`;
    })
    .addTo(MAP);
};

const createMarker = (func, point) => {
  const { lat, lng } = point;

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker({
    lat,
    lng,
  }, {
    icon,
  });

  marker
    .addTo(MARKER_GROUP)
    .bindPopup(func);
};

const makeMarkers = (cards) => {

  MARKER_GROUP.clearLayers();
  cards
    .forEach((card) => {
      createMarker(() => getOffer(card), card.location);
    });
};

const resetMainPin = () => {
  mainPinMarker.setLatLng({
    lat:MAIN_PIN_LATITUDE,
    lng: MAIN_PIN_LONGITUDE,
  });
  setAddressInputValue();
  MAP.setView({ lat: MAIN_PIN_LATITUDE, lng: MAIN_PIN_LONGITUDE }, MAP_ZOOM);
};

const closeOpenedPopup = () => {
  MAP.closePopup();
};

export { addMap, addMainPin, makeMarkers, resetMainPin, closeOpenedPopup, MAP };
