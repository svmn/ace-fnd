'use strict';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './containers/App';
import reducer from './reducers';
import { chatStart, ignoreLoad } from './actions/chat';
import { playlistStart } from './actions/playlist';
import { loadTopic } from './actions/topic';
import { avatarLoad, avatarSet } from './actions/avatar';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const logger = createLogger();
const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
);
const rootElement = document.getElementById('application');

store.dispatch(loadTopic());
store.dispatch(ignoreLoad());
store.dispatch(chatStart());
store.dispatch(playlistStart());
if (localStorage.avatar) {
  store.dispatch(avatarSet(localStorage.avatar));
} else {
  store.dispatch(avatarLoad());
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
