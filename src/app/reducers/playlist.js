'use strict';

import { PLAYLIST_UPDATE } from '../actionTypes';

const initialState = [];

export default function (state = initialState, action) {
  const { data, type } = action;

  switch (type) {
    case PLAYLIST_UPDATE:
      return data;
    default:
      return state;
  }
}
