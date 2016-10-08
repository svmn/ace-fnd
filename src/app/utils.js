'use strict';

import padStart from 'lodash/padStart';
import range from 'lodash/range';

export function padTime(time) {
  return padStart(time, 2, '0');
}

export function getAvatarIcon(userId) {
  const charCodes = range(19968, 21007 + 1);
  const num = parseInt(userId.slice(-4), 16) % charCodes.length;
  const char = String.fromCharCode(charCodes[num]);
  return char;
}

export function getAvatarColor(userId) {
  const colorCode = parseInt(userId.slice(-3), 16) % 360;
  const color = `hsl(${colorCode},50%,50%)`;
  return color;
}

export function getAvatar(userId) {
  return {
    color: getAvatarColor(userId),
    icon: getAvatarIcon(userId)
  };
}

export function updateState(prevState, nextState) {
  return Object.assign({}, prevState, nextState);
}
