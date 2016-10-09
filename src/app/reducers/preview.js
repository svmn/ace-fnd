'use strict';

import {
  SHOW_PREVIEW,
  MOVE_PREVIEW,
  HIDE_PREVIEW
} from '../actionTypes';

import { updateState } from '../utils';

const initialState = {
  message: null,
  positionX: null,
  positionY: null
};

export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case SHOW_PREVIEW:
      return updateState(state, {
        message: data
      });
    case HIDE_PREVIEW:
      return initialState;
    case MOVE_PREVIEW:
      return updateState(state, {
        positionX: data.clientX,
        positionY: data.clientY
      });
    default:
      return state;
  }
}
