'use strict';

import { combineReducers } from 'redux';
import chatReducer from './chat';
import playlistReducer from './playlist';
import postareaReducer from './postarea';
import snackbarReducer from './snackbar';
import previewReducer from './preview';
import onlineCounterReducer from './onlineCounter';
import memeFeedReducer from './memeFeed';
import topicReducer from './topic';
import avatarReducer from './avatar';

const rootReducer = combineReducers({
  chat: chatReducer,
  playlist: playlistReducer,
  postarea: postareaReducer,
  snackbar: snackbarReducer,
  preview: previewReducer,
  onlineCounter: onlineCounterReducer,
  memeFeed: memeFeedReducer,
  topic: topicReducer,
  avatar: avatarReducer
});

export default rootReducer;
