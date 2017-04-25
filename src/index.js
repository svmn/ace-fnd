'use strict';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store';
import { Component as Main } from './modules/Main';
import { chatStart, ignoreLoad } from './actions/chat';
import { playlistStart } from './actions/playlist';
import { loadTopic } from './actions/topic';
import { avatarLoad, avatarSet } from './actions/avatar';
import './css/index.less'; // TODO

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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
    <Main />
  </Provider>,
  rootElement
);
