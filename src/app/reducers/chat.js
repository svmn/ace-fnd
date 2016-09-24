'use strict';

import unionBy from 'lodash/unionBy';
import {
  CHAT_UPDATE,
  CHAT_START,
  CHAT_STOP
} from '../actionTypes';

const initialState = {
  messages: [],
  lastMessageId: 0,
  online: 0,
  timer: null
};

export default function (state = initialState, action) {
  const { data, type } = action;

  switch (type) {

    case CHAT_UPDATE:
      const { data: messages } = data;
      const lastMessage = messages[messages.length - 1];
      return Object.assign(
        {},
        state,
        {
          lastMessageId: lastMessage ? Number(lastMessage.id) : state.lastMessageId,
          online: data.user_cnt,
          messages: unionBy(state.messages, messages, 'id')
        }
      );

    case CHAT_START:
      return Object.assign({}, state, { timer: data });

    case CHAT_STOP:
      return Object.assign({}, state, { timer: null });

    default:
      return state;
  }
}
