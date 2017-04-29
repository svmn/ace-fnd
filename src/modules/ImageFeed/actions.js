'use strict';

import {
  connect,
  disconnect
} from './api';

import {
  IMAGEFEED_ADD
} from '../../actionTypes';

export function start() {
  return (dispatch) => {
    connect(posts => {
      dispatch({ type: IMAGEFEED_ADD, data: posts });
    });
  };
}

export function stop() {
  disconnect();
}
