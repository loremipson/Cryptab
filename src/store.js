import { createStore, compose } from 'redux';
import { batchedSubscribe } from 'redux-batched-subscribe';
import { unstable_batchedUpdates } from 'react-dom';

import rootReducer from './reducers/index';

const defaultState = {
  currencies: {},
};
const obj = {};

if (localStorage.getItem('cachedCurrencies')) {
  let cached = JSON.parse(localStorage.getItem('cachedCurrencies'));
  defaultState.currencies = cached;
}

export default createStore(rootReducer, defaultState, batchedSubscribe(unstable_batchedUpdates));
