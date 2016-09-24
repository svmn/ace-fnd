'use strict';

import {
  CHAT_UPDATE,
  CHAT_START,
  CHAT_STOP
} from '../actionTypes';

import { load } from '../api/chat';

export const chatUpdate = () => {
  return (dispatch, getState) => {
    const lastMessageId = getState().chat.lastMessageId;
    return load(lastMessageId)
      .then(data => {
        dispatch({
          type: CHAT_UPDATE,
          data
        });
      });
  };
};

export const chatStart = () => {
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
};

export const chatStop = () => {
  return (dispatch, getState) => {
    const timer = getState().chat.timer;
    clearInterval(timer);
    dispatch({ type: CHAT_STOP });
  };
};
