'use strict';

import * as api from './api';

import {
  AVATAR_LOAD,
  AVATAR_SET_UPLOADING
} from '../../actionTypes';

export function load() {
  return (dispatch) => {
    api.load()
    .then(data => dispatch({
      type: AVATAR_LOAD,
      data
    }))
    .catch(console.error);
  };
}

export function upload(file) {
  return (dispatch) => {
    dispatch({ type: AVATAR_SET_UPLOADING, data: true });
    api.upload(file)
      .then(data => {
        dispatch({ type: AVATAR_LOAD, data });
        dispatch({ type: AVATAR_SET_UPLOADING, data: false });
        localStorage.setItem('avatar', data.avatar);
      })
      .catch(console.error);
  };
}

export function set(avatar) {
  return (dispatch) => {
    api.set(avatar)
      .then(data => {
        dispatch({ type: AVATAR_LOAD, data });
      })
      .catch(console.error);
  };
}
