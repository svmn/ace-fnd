'use strict';

import {
  connect,
  disconnect
} from './api';

import {
  MEMEFEED_ADD
} from '../../actionTypes';

export function start() {
  return (dispatch) => {
    connect(posts => {
      dispatch({ type: MEMEFEED_ADD, data: posts });
    });
  };
}

export function stop() {
  disconnect();
}
