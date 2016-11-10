'use strict';

import {
  load,
  upload,
  vote
} from '../api/playlist';
import {
  PLAYLIST_UPDATE,
  PLAYLIST_SELECT,
  PLAYLIST_DESELECT,
  PLAYLIST_PREVIOUS,
  PLAYLIST_NEXT,
  PLAYLIST_UPLOAD_PROGRESS,
  SNACKBAR_OPEN
} from '../actionTypes';

let timer;

export function playlistUpdate() {
  return (dispatch) => {
    load()
      .then(data => dispatch({ type: PLAYLIST_UPDATE, data: data.songs }))
      .catch(err => console.log(err));
  };
}

export function playlistStart() {
  return (dispatch) => {
    dispatch(playlistUpdate());
    timer = setInterval(() => {
      dispatch(playlistUpdate());
    }, 20000);
  };
}

export function playlistStop() {
  clearInterval(timer);
  return { type: null };
}

export function playlistSelect(id) {
  return {
    type: PLAYLIST_SELECT,
    data: id
  };
}

export function playlistDeselect() {
  return { type: PLAYLIST_DESELECT };
}

export function playlistPrevious() {
  return { type: PLAYLIST_PREVIOUS };
}

export function playlistNext() {
  return { type: PLAYLIST_NEXT };
}

export function playlistUpload(file) {
  return (dispatch) => {
    const onProgress = e => {
      const progress = (e.loaded / e.total) * 100;
      dispatch({ type: PLAYLIST_UPLOAD_PROGRESS, data: progress });
    };
    upload(file, onProgress)
      .then(response => {
        let alert;
        try {
          const json = JSON.parse(response);
          alert = json.msg;
        } catch (e) {
          alert = response;
        }
        dispatch({ type: PLAYLIST_UPLOAD_PROGRESS, data: null });
        dispatch({ type: SNACKBAR_OPEN, data: alert });
        dispatch(playlistUpdate());
      })
      .catch(err => console.log(err));
  };
}

export function playlistVote(id, value) {
  return (dispatch) => {
    vote(id, value)
      .then(response => {
        if (response) {
          let alert;
          try {
            const json = JSON.parse(response);
            alert = json.msg;
          } catch (e) {
            alert = response;
          }
          dispatch({ type: SNACKBAR_OPEN, data: alert });
        }
        dispatch(playlistUpdate());
      });
  };
}
