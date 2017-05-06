'use strict';

import { TOPIC_ENDPOINT } from '../../config';

export function loadTopic() {
  return fetch(TOPIC_ENDPOINT)
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });
}
