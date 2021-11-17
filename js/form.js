import { sendData } from './api.js';
import { resetMainPin, closeOpenedPopup } from './map.js';
import { successMessage, errorMessage } from './util.js';
import { MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, MAX_PRICE, FILE_TYPES, DEFAULT_AVATAR } from './data.js';

const roomsCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const typesMinPrice = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const btnReset = adForm.querySelector('.ad-form__reset');
const activeElements = document.querySelectorAll('.ad-form fieldset, .map__filter, .map__filters fieldset');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const roomsNumberSelect = adForm.querySelector('#room_number');
const capacityOptions = adForm.querySelectorAll('#capacity option');
const typesSelect = adForm.querySelector('#type');
const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');
const avatarInput = adForm.querySelector('.ad-form__field input[type=file]');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const photoInput = adForm.querySelector('.ad-form__upload input[type=file]');
const photoPreview = adForm.querySelector('.ad-form__photo');

const changeFormState = (isDisabled = true) => {
  if (isDisabled) {
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
  } else {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  }

  activeElements.forEach((activeElement) => {
    activeElement.disabled = isDisabled;
  });
};

const onTypesChange = () => {
  priceInput.min = typesMinPrice[typesSelect.value];
  priceInput.placeholder = priceInput.min;
};

const setFormDefault = () => {
  adForm.reset();
  mapFilters.reset();
  onTypesChange();
  avatarPreview.src = DEFAULT_AVATAR;
  photoPreview.innerHTML = '';
  resetMainPin();
  closeOpenedPopup();
};

const setFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        onSuccess();
        successMessage();
      },
      errorMessage,
      new FormData(evt.target),
    );
  });
};

const changeSelected = () => {
  for (const capacityOption of capacityOptions) {
    if (!capacityOption.disabled) {
      capacityOption.selected = true;
      return;
    }
  }
};

const onRoomsNumberChange = () => {
  capacityOptions.forEach((capacityOption) => {
    capacityOption.disabled = !roomsCapacity[roomsNumberSelect.value].includes(capacityOption.value);
  });
  changeSelected();
};

const getPhotoFromUser = (input, preview) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH || valueLength >= MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Заголовка не может быть длиной менее ${MIN_TITLE_LENGTH} символов и более ${MAX_TITLE_LENGTH} символов`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  const priceValue = priceInput.value;

  if (priceValue > MAX_PRICE || priceValue < priceInput.min) {
    priceInput.setCustomValidity(`Цена за ночь не может быть менее ${priceInput.min} рублей и более ${MAX_PRICE} рублей`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

typesSelect.addEventListener('change', onTypesChange);

roomsNumberSelect.addEventListener('change', onRoomsNumberChange);
timeinSelect.addEventListener('change', () => timeoutSelect.value = timeinSelect.value);
timeoutSelect.addEventListener('change', () => timeinSelect.value = timeoutSelect.value);

btnReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  setFormDefault();
});

avatarInput.addEventListener('change', () => getPhotoFromUser(avatarInput, avatarPreview));
photoInput.addEventListener('change', () => {
  const photo = document.createElement('img');
  photo.alt = 'Фотография жилья';
  photo.width = 70;
  photo.height = 70;
  getPhotoFromUser(photoInput, photo);
  photoPreview.append(photo);
});

onRoomsNumberChange();

export { changeFormState, setFormSubmit, setFormDefault };
