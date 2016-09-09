'use strict';

import { CHAT_UPDATE } from '../actionTypes';

const initialState = {
  messages: [],
  lastMsgId: 0,
  online: 0
};

export default function (state = initialState, action) {
  const { data, type } = action;

  switch (type) {
    case CHAT_UPDATE:
      return Object.assign(
        {},
        state,
        {
          lastMsgId: data.lastMsgId,
          online: data.online,
          messages: [...state.messages, data.data]
        }
      );
    default:
      return state;
  }
}
