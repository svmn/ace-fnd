'use strict';

import {
  LOAD_TOPIC
} from '../../actionTypes';

import * as api from './api';

export function loadTopic() {
  return (dispatch) => {
    api.loadTopic()
      .then(data => dispatch({ type: LOAD_TOPIC, data: data.topic }))
      .catch(console.log);
  };
}
