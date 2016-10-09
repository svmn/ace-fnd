/* global FileReader */
'use strict';

import {
  POSTAREA_SET_MESSAGE,
  POSTAREA_SET_FILE,
  POSTAREA_SET_PREVIEW,
  POSTAREA_SET_PROCESSING,
  POSTAREA_RESET,
  SNACKBAR_OPEN
} from '../actionTypes';

import { chatUpdate } from './chat';

import { post } from '../api/chat';

import { fixMimeType } from '../utils';

export function postareaSetMessage(message) {
  return {
    type: POSTAREA_SET_MESSAGE,
    data: message
  };
}

export function postareaSetReply(id) {
  return (dispatch, getState) => {
    const { message } = getState().postarea;
    dispatch({
      type: POSTAREA_SET_MESSAGE,
      data: `@${id} ${message}`
    });
  };
}

export function postareaSetFile(file) {
  return (dispatch) => {
    dispatch({
      type: POSTAREA_SET_FILE,
      data: file
    });

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      dispatch({
        type: POSTAREA_SET_PREVIEW,
        data: fixMimeType(file.name, e.target.result)
      });
    };
  };
}

export function postareaResetFile() {
  return (dispatch) => {
    dispatch({
      type: POSTAREA_SET_FILE,
      data: null
    });
    dispatch({
      type: POSTAREA_SET_PREVIEW,
      data: null
    });
  };
}

export function postareaSend() {
  return (dispatch, getState) => {
    const { message, file } = getState().postarea;
    if (!message && !file) return;

    dispatch({ type: POSTAREA_SET_PROCESSING });

    post(message, file)
      .then(response => {
        if (response) {
          let alert;
          try {
            const json = JSON.parse(response);
            alert = json.msg;
          } catch (e) {
            alert = response;
          }
          dispatch({
            type: SNACKBAR_OPEN,
            data: alert
          });
        } else {
          dispatch({ type: POSTAREA_RESET });
          chatUpdate();
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: SNACKBAR_OPEN,
          data: 'Проблемы с соединением'
        });
      });
  };
}
