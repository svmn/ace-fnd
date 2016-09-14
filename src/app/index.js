'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './containers/App';
import reducer from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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
