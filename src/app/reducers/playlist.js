'use strict';

import {
  PLAYLIST_UPDATE,
  PLAYLIST_SELECT
} from '../actionTypes';
import {
  updateState
} from '../utils';

const initialState = {
  items: [],
  selected: null
};

export default function (state = initialState, action) {
  const { data, type } = action;

  switch (type) {
    case PLAYLIST_UPDATE:
      return updateState(state, {
        items: data
      });
    case PLAYLIST_SELECT:
      return updateState(state, {
        selected: data
      });
    default:
      return state;
  }
}
