'use strict';

import {
  connect,
  disconnect
} from '../api/memeFeed';

import {
  MEMEFEED_ADD
} from '../actionTypes';

export function feedStart() {
  return (dispatch) => {
    connect(posts => {
      dispatch({ type: MEMEFEED_ADD, data: posts });
    });
  };
}

export function feedStop() {
  disconnect();
}
