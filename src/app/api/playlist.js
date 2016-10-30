'use strict';

import fetch from 'isomorphic-fetch';
import { PLAYLIST_ENDPOINT } from '../config';

export function load() {
  return fetch(PLAYLIST_ENDPOINT, {
    credentials: 'same-origin'
  })
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });
}

export function upload() {

}
