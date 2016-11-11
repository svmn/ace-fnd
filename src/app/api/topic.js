'use strict';

import fetch from 'isomorphic-fetch';
import { TOPIC_ENDPOINT } from '../config';

// eslint-disable-next-line
export function get() {
  return fetch(TOPIC_ENDPOINT)
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });
}
