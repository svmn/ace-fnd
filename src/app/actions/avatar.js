'use strict';

import {
  load,
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
      data: data.avatar
    }))
    .catch(err => console.log(err));
  };
}

export function avatarUpload(file) {
  return (dispatch) => {
    dispatch({ type: AVATAR_SET_UPLOADING, data: true });
    upload(file)
      .then(data => {
        dispatch({ type: AVATAR_LOAD, data: data.avatar });
        dispatch({ type: AVATAR_SET_UPLOADING, data: false });
      })
      .catch(err => console.log(err));
  };
}
