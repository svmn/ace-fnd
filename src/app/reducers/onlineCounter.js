'use strict';

import {
  SET_ONLINE_COUNTER
} from '../actionTypes';

const initialState = {
  online: 0,
  speed: 0
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case SET_ONLINE_COUNTER:
      return data;
    default:
      return state;
  }
}
