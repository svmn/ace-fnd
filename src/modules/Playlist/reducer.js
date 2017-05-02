'use strict';

import {
  PLAYLIST_UPDATE,
  PLAYLIST_SELECT,
  PLAYLIST_DESELECT,
  PLAYLIST_PREVIOUS,
  PLAYLIST_NEXT,
  PLAYLIST_UPLOAD_PROGRESS
} from '../../actionTypes';

import {
  updateState
} from '../../utils';

const initialState = {
  items: [],
  selected: null,
  uploadProgress: null
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
    case PLAYLIST_DESELECT:
      return updateState(state, {
        selected: null
      });
    case PLAYLIST_PREVIOUS: {
      const i = state.items.findIndex(item => item.id === state.selected);
      if (i === 0) return state;
      const selected = state.items[i - 1].id;
      return updateState(state, {
        selected
      });
    }
    case PLAYLIST_NEXT: {
      const i = state.items.findIndex(item => item.id === state.selected);
      if (i === state.items.length - 1) return state;
      const selected = state.items[i + 1].id;
      return updateState(state, {
        selected
      });
    }
    case PLAYLIST_UPLOAD_PROGRESS:
      return updateState(state, {
        uploadProgress: data
      });
    default:
      return state;
  }
}
