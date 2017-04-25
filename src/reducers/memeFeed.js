'use strict';

import uniq from 'lodash/uniq';
import {
  MEMEFEED_ADD
} from '../actionTypes';

export default function (state = [], action) {
  const { type, data } = action;
  switch (type) {
    case MEMEFEED_ADD:
      return uniq([...data, ...state]);
    default:
      return state;
  }
}
