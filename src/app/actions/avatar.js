'use strict';

import {
  load,
  set,
  upload
} from '../api/avatar';

import {
  AVATAR_LOAD,
  AVATAR_SET_UPLOADING
} from '../actionTypes';

export function avatarLoad() {
  return (dispatch) => {
    load()
    .then(data => dispatch({
      type: AVATAR_LOAD,
      data
    }))
    .catch(console.error);
  };
}

export function avatarUpload(file) {
  return (dispatch) => {
    dispatch({ type: AVATAR_SET_UPLOADING, data: true });
    upload(file)
      .then(data => {
        dispatch({ type: AVATAR_LOAD, data });
        dispatch({ type: AVATAR_SET_UPLOADING, data: false });
        localStorage.setItem('avatar', data.avatar);
      })
      .catch(console.error);
  };
}

export function avatarSet(avatar) {
  return (dispatch) => {
    set(avatar)
      .then(data => {
        dispatch({ type: AVATAR_LOAD, data });
      })
      .catch(console.error);
  };
}
