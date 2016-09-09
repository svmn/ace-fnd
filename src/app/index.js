'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './containers/App';
import reducer from './reducers';

const logger = createLogger();
const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
);
const rootElement = document.getElementById('application');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
