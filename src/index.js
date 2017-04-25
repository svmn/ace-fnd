'use strict';

import './style/index.less';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store';
import { Component as Main } from './modules/Main';
import { actions as chat } from './modules/Chat';
import { actions as playlist } from './modules/Playlist';
import { actions as header } from './modules/RightHeader';
import { actions as avatar } from './modules/SelfAvatar';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const rootElement = document.getElementById('application');

store.dispatch(header.loadTopic());
store.dispatch(chat.ignoreLoad());
store.dispatch(chat.start());
store.dispatch(playlist.start());
if (localStorage.avatar) {
  store.dispatch(avatar.set(localStorage.avatar));
} else {
  store.dispatch(avatar.load());
}

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  rootElement
);
