'use strict';

import unionBy from 'lodash/unionBy';
import uniq from 'lodash/uniq';
import remove from 'lodash/remove';
import { updateState } from '../../utils';
import {
  CHAT_UPDATE,
  CHAT_START,
  CHAT_STOP,
  IGNORE_ADD,
  IGNORE_CLEAR,
  IGNORE_LOAD
} from '../../actionTypes';

import { REPLY_REGEXP } from '../../constants';

const initialState = {
  messages: [],
  lastMessageId: 0,
  timer: null,
  replies: {},
  ignoreList: []
};

export default function (state = initialState, action) {
  const { data, type } = action;

  switch (type) {

    case CHAT_UPDATE: {
      const lastMessage = data.slice(-1).pop();

      // Deleting messages
      data
        .filter(msg => msg.type === 'dlt')
        .forEach(msg => {
          const targetId = msg.text;
          // Mutate state intentionally. This message never existed
          remove(state.messages, (mess) => mess.id === targetId); // eslint-disable-line
          remove(data, (mess) => mess.id === targetId);
        });

      // Filter ignored and system messages
      const messages = data.filter(msg => !state.ignoreList.includes(msg.user_id) && msg.type !== 'dlt');

      // Genetare "answers"
      const replies = {};
      messages.forEach(msg => {
        const targetId = msg.id;
        const matches = msg.text.match(REPLY_REGEXP) || [];
        matches.slice(0, 6).forEach(match => {
          const sourceId = match.replace('@', '');
          // merge existing replies, replies parsed in previous iteration and just parsed reply
          const existing = state.replies[sourceId] || [];
          const current = replies[sourceId] || [];
          replies[sourceId] = [...existing, ...current, targetId];
          // remove duplicates
          replies[sourceId] = uniq(replies[sourceId]);
        });
      });

      return updateState(state, {
        lastMessageId: lastMessage ? Number(lastMessage.id) : state.lastMessageId,
        messages: unionBy(state.messages, messages, 'id'),
        replies: updateState(state.replies, replies)
      });
    }

    case CHAT_START:
      return updateState(state, {
        timer: data
      });

    case CHAT_STOP:
      return updateState(state, {
        timer: null
      });

    case IGNORE_ADD: {
      const targetUserId = data;
      return updateState(state, {
        messages: state.messages.filter(msg => msg.user_id !== targetUserId),
        ignoreList: [...state.ignoreList, targetUserId]
      });
    }

    case IGNORE_CLEAR:
      return updateState(state, {
        ignoreList: []
      });

    case IGNORE_LOAD:
      return updateState(state, {
        ignoreList: data || []
      });

    default:
      return state;
  }
}