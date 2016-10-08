'use strict';

import { updateState } from '../utils';
import {
  POSTAREA_SET_MESSAGE,
  POSTAREA_SET_FILE,
  POSTAREA_SET_PREVIEW,
  POSTAREA_SET_PROCESSING,
  POSTAREA_RESET
} from '../actionTypes';

const initialState = {
  message: '',
  file: null,
  preview: null,
  processing: false
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case POSTAREA_SET_MESSAGE:
      return updateState(state, {
        message: data
      });
    case POSTAREA_SET_FILE:
      return updateState(state, {
        file: data
      });
    case POSTAREA_SET_PREVIEW:
      return updateState(state, {
        preview: data
      });
    case POSTAREA_SET_PROCESSING:
      return updateState(state, {
        processing: true
      });
    case POSTAREA_RESET:
      return initialState;
    default:
      return state;
  }
}
