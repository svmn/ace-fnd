'use strict';

import fetch from 'isomorphic-fetch';
import { AVATAR_ENDPOINT } from '../../config';

export function load() {
  return fetch(AVATAR_ENDPOINT, {
    credentials: 'same-origin'
  })
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });
}

export function upload(file) {
  const formdata = new FormData();
  formdata.append('avatar', file);

  return fetch(`${AVATAR_ENDPOINT}&act=upload`, {
    method: 'POST',
    body: formdata,
    credentials: 'same-origin'
  })
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });
}

export function set(avatar) {
  const formdata = new FormData();
  formdata.append('avatar', avatar);
  return fetch(`${AVATAR_ENDPOINT}&act=set`, {
    method: 'POST',
    body: formdata,
    credentials: 'same-origin'
  })
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });
}
