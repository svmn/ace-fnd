'use strict';

import {
  LOAD_TOPIC
} from '../actionTypes';

export default function (state = '', action) {
  const { type, data } = action;
  switch (type) {
    case LOAD_TOPIC:
      return data;
    default:
      return state;
  }
}
