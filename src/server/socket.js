// @flow

import {
  IO_CONNECT,
  IO_DISCONNECT,
  IO_EVENT_CONSOLE,
  IO_EVENT_ERROR,
} from '../shared/config';

function setupSocket(io: Object) {
  io.on(IO_CONNECT, (socket) => {
    console.log('[socket.io] Client connected');

    socket.on(IO_EVENT_CONSOLE, ({ level, args }) => {
      console[level]('[browser]', `[console - ${level}]`, ...args);
    });

    socket.on(IO_EVENT_ERROR, (err) => {
      console.error('[browser] [error]', err);
    });

    socket.on(IO_DISCONNECT, () => {
      console.log('[socket.io] Client disconnected');
    });
  });
}

export default setupSocket;
