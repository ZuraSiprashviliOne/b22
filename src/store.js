
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';

import Thunk from 'redux-thunk';
import Promise from 'redux-promise-middleware';
import Logger from 'redux-logger';

import LocaleReducer from './Reducers/LocaleReducer';
import NavigationReducer from './Reducers/NavigationReducer';

import SliderReducer from './Reducers/SliderReducer';

export default createStore(
  combineReducers({
    LocaleReducer,
    NavigationReducer,
    SliderReducer
  }),
  {},
  applyMiddleware(
    Logger,
    Promise(),
    Thunk
  )
);