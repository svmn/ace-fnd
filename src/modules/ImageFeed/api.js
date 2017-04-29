'use strict';

import io from 'socket.io-client';
import { MEMEFEED_ENDPOINT } from '../../config';

let socket;

export function connect(receiveHandler) {
  socket = io(MEMEFEED_ENDPOINT);
  socket.on('post', receiveHandler);
  socket.on('error', console.error);
}

export function disconnect() {
  socket.disconnect();
  socket = null;
}
