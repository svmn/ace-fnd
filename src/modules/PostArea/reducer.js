'use strict';

import {
  POSTAREA_SET_PROCESSING
} from '../../actionTypes';

import { updateState } from '../../utils';

const initialState = {
  processing: false
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case POSTAREA_SET_PROCESSING:
      return updateState(state, {
        processing: data
      });
    default:
      return state;
  }
}
