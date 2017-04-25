'use strict';

import {
  SET_ONLINE_COUNTER
} from '../actionTypes';

export default function (state = '0', action) {
  const { type, data } = action;
  switch (type) {
    case SET_ONLINE_COUNTER:
      return data;
    default:
      return state;
  }
}
