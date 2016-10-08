'use strict';

import { combineReducers } from 'redux';
import chatReducer from './chat';
import playlistReducer from './playlist';
import postareaReducer from './postarea';
import snackbarReducer from './snackbar';

const rootReducer = combineReducers({
  chat: chatReducer,
  playlist: playlistReducer,
  postarea: postareaReducer,
  snackbar: snackbarReducer
});

export default rootReducer;
