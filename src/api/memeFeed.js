'use strict';

import io from 'socket.io-client';
import { MEMEFEED_ENDPOINT } from '../config';

let socket;

export function connect(receiveHandler) {
  socket = io(MEMEFEED_ENDPOINT);
  socket.on('post', receiveHandler);
  socket.on('error', (err) => console.log(err));
}

export function disconnect() {
  socket.disconnect();
  socket = null;
}
