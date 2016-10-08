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

export function post(message, file) {
  const formdata = new FormData();
  formdata.append('text', message);
  if (file) {
    formdata.append('filedata', file);
  }

  return fetch(`${CHAT_ENDPOINT}&act=post`, {
    method: 'POST',
    body: formdata
  })
    .then(response => response.text());
}
