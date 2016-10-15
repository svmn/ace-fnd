'use strict';

import unionBy from 'lodash/unionBy';
import {
  CHAT_UPDATE,
  CHAT_START,
  CHAT_STOP
} from '../actionTypes';

import { REPLY_REGEXP } from '../constants';

const initialState = {
  messages: [],
  lastMessageId: 0,
  timer: null,
  replies: {}
};

export default function (state = initialState, action) {
  const { data, type } = action;

  switch (type) {

    case CHAT_UPDATE:
      const messages = data;
      const lastMessage = messages[messages.length - 1];
      const addedReplies = {};
      messages.forEach(msg => {
        const ids = msg.text.match(REPLY_REGEXP);
        if (!ids) return;
        ids.forEach(id => {
          const replyId = id.replace('@', '');
          // saving existing replies
          if (!addedReplies[replyId]) {
            addedReplies[replyId] = state.replies[replyId] ? [...state.replies[replyId]] : [];
          }
          addedReplies[replyId].push(msg.id);
        });
      });

      return Object.assign(
        {},
        state,
        {
          lastMessageId: lastMessage ? Number(lastMessage.id) : state.lastMessageId,
          messages: unionBy(state.messages, messages, 'id'),
          replies: Object.assign({}, state.replies, addedReplies)
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
