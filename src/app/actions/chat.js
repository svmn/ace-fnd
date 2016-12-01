'use strict';

import {
  CHAT_UPDATE,
  CHAT_START,
  CHAT_STOP,
  SHOW_PREVIEW,
  HIDE_PREVIEW,
  SET_ONLINE_COUNTER,
  POSTAREA_SET_PROCESSING,
  SNACKBAR_OPEN,
  IGNORE_ADD,
  IGNORE_CLEAR,
  IGNORE_LOAD
} from '../actionTypes';

import { load, post, control } from '../api/chat';

export function chatUpdate() {
  return (dispatch, getState) => {
    const lastMessageId = getState().chat.lastMessageId;
    return load(lastMessageId)
      .then(data => {
        const { data: messages } = data;
        if (messages && messages.length) {
          dispatch({
            type: CHAT_UPDATE,
            data: messages
          });
        }
        dispatch({
          type: SET_ONLINE_COUNTER,
          data: data.user_cnt
        });
      });
  };
}

export function chatStart() {
  return (dispatch) => {
    dispatch(chatUpdate());
    const timer = setInterval(() => {
      dispatch(chatUpdate());
    }, 7000);
    dispatch({
      type: CHAT_START,
      data: timer
    });
  };
}

export function chatStop() {
  return (dispatch, getState) => {
    const timer = getState().chat.timer;
    clearInterval(timer);
    dispatch({ type: CHAT_STOP });
  };
}

export function showPreview(id) {
  return (dispatch, getState) => {
    const message = getState().chat.messages.find(msg => msg.id === id);
    dispatch({
      type: SHOW_PREVIEW,
      data: message
    });
  };
}

export function hidePreview() {
  return {
    type: HIDE_PREVIEW
  };
}

export function chatSend(message, file) {
  return (dispatch) => {
    if (!message && !file) return;

    if (file) {
      dispatch({ type: POSTAREA_SET_PROCESSING, data: true });
    }

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
        }
        dispatch(chatUpdate());
        if (file) {
          dispatch({ type: POSTAREA_SET_PROCESSING, data: false });
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

export function ignoreAdd(messageId) {
  return (dispatch, getState) => {
    const targetUserId = getState().chat.messages.find(msg => msg.id === messageId).user_id;
    dispatch({ type: IGNORE_ADD, data: targetUserId });
    const { ignoreList } = getState().chat;
    localStorage.setItem('ignoreList', JSON.stringify(ignoreList));
    dispatch({
      type: SNACKBAR_OPEN,
      data: `Автор поста #${messageId} добавлен в игнор`
    });
  };
}

export function ignoreClear() {
  localStorage.removeItem('ignoreList');
  return (dispatch) => {
    dispatch({ type: IGNORE_CLEAR });
    dispatch({
      type: SNACKBAR_OPEN,
      data: 'Игнор-лист очищен'
    });
  };
}

export function ignoreLoad() {
  const ignoreList = JSON.parse(localStorage.getItem('ignoreList'));
  return { type: IGNORE_LOAD, data: ignoreList };
}

export function chatControl(method, messageId) {
  return (dispatch) => {
    control(method, messageId)
      .then(response => {
        dispatch({
          type: SNACKBAR_OPEN,
          data: response
        });
      })
      .catch(err => console.log(err));
  };
}
