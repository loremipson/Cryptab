import { createStore } from 'redux';
import { batchedSubscribe } from 'redux-batched-subscribe';
import { unstable_batchedUpdates } from 'react-dom';

import rootReducer from './reducers/index';

const storedTheme = localStorage.getItem('lightTheme');

const defaultState = {
  currencies: {},
  lightTheme: {
    enabled: storedTheme ? JSON.parse(storedTheme) : false,
  },
};

const now = Date.now();
const then = localStorage.getItem('lastGathered');

// If we haven't gathered data in over a day...
if (now - 86400000 > then) {
  fetch('https://coincap.io/front')
    .then(res => res.json())
    .then(data => {
      const obj = {};
      for (let i = 0; i <= 19; i++) {
        obj[data[i].short] = data[i];
      }
      localStorage.setItem('cachedCurrencies', JSON.stringify(obj));
      localStorage.setItem('lastGathered', Date.now());
    })
    .then(() => {
      defaultState.currencies = JSON.parse(localStorage.getItem('cachedCurrencies'));
    });
} else {
  defaultState.currencies = JSON.parse(localStorage.getItem('cachedCurrencies'));
}

export default createStore(rootReducer, defaultState, batchedSubscribe(unstable_batchedUpdates));
