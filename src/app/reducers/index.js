'use strict';

import { combineReducers } from 'redux';
import chatReducer from './chat';
import playlistReducer from './playlist';

const rootReducer = combineReducers({
  chat: chatReducer,
  playlist: playlistReducer
});

export default rootReducer;
