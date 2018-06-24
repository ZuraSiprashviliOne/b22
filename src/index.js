
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';

import Store from './store';

import App from './Containers/App';
import Application from './Application';

ReactDOM.render(
  <Provider
    store={Store}>
    <Application />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
