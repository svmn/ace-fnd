'use strict';

import 'isomorphic-fetch';
import { CHAT_ENDPOINT } from '../config.js';

export function load(lastMessageId) {
  return fetch(`${CHAT_ENDPOINT}&last=${lastMessageId}`)
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });
}
