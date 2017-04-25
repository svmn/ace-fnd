'use strict';

import {
  SHOW_PREVIEW,
  HIDE_PREVIEW
} from '../actionTypes';

import { updateState } from '../utils';

const initialState = {
  message: null
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
    default:
      return state;
  }
}
