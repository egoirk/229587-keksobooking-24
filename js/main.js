import { changeFormState, setFormDefault, setFormSubmit } from './form.js';
import { addMap, addMainPin, makeMarkers, MAP } from './map.js';
import { selectFilters, filterCards } from './filters.js';
import { getData } from './api.js';
import { alert } from './util.js';
import { debounce } from './debounce.js';

const RERENDER_DELAY = 500;

changeFormState();
addMap();
addMainPin();

MAP.whenReady(() => {
  getData((pins) => {
    makeMarkers(filterCards(pins));
    selectFilters(debounce(() => makeMarkers(filterCards(pins)), RERENDER_DELAY));
    changeFormState(false);
    setFormSubmit(setFormDefault);
  }, alert);
});
