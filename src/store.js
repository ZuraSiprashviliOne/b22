
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
import CommonReducer from './Reducers/CommonReducer';

import SliderReducer from './Reducers/SliderReducer';
import SalesReducer from './Reducers/SalesReducer';
import CollectionsReducer from './Reducers/CollectionsReducer';
// import AddonsReducer from './Reducers/AddonsReducer';

import FlowersReducer from './Reducers/FlowersReducer';
import FlowerReducer from './Reducers/FlowerReducer';

export default createStore(
  combineReducers({
    LocaleReducer,
    NavigationReducer,
    SliderReducer,
    CommonReducer,
    SalesReducer,
    CollectionsReducer,
    // AddonsReducer,
    FlowersReducer,
    FlowerReducer
  }),
  {},
  applyMiddleware(
    Logger,
    Promise(),
    Thunk
  )
);