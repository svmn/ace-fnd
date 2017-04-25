'use strict';

import {
  LOAD_TOPIC
} from '../../actionTypes';

import * as api from './api';

//eslint-disable-next-line
export function loadTopic() {
  return (dispatch) => {
    api.loadTopic()
      .then(data => dispatch({ type: LOAD_TOPIC, data: data.topic }))
      .catch(err => console.log(err));
  };
}
