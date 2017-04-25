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

export function upload(file, onProgress) {
  const body = new FormData();
  body.set('added', file, file.name);
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('post', `${PLAYLIST_ENDPOINT}&act=add`);
    xhr.onload = e => resolve(e.target.responseText);
    xhr.onerror = reject;
    xhr.upload.onprogress = onProgress;
    xhr.send(body);
  });
}

export function vote(id, value) {
  const body = new FormData();
  body.set('id', id);
  body.set('val', value);
  return fetch(`${PLAYLIST_ENDPOINT}&act=vote`, {
    method: 'post',
    credentials: 'same-origin',
    body
  })
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.text();
    });
}
