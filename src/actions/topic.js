'use strict';

import {
  LOAD_TOPIC
} from '../actionTypes';

import {
  get
} from '../api/topic';

//eslint-disable-next-line
export function loadTopic() {
  return (dispatch) => {
    get()
      .then(data => dispatch({ type: LOAD_TOPIC, data: data.topic }))
      .catch(err => console.log(err));
  };
}
