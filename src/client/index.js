// @flow

import socketIOClient from 'socket.io-client';
import serializeError from 'serialize-error';

import {
  IO_CONNECT,
  IO_DISCONNECT,

  IO_EVENT_CONSOLE,
  CONSOLE_LEVELS,

  IO_EVENT_ERROR,
} from '../shared/config';

const socket = socketIOClient(window.location.host);

socket.on(IO_CONNECT, () => {
  console.log('[socket.io] connected');
});

socket.on(IO_DISCONNECT, () => {
  console.log('[socket.io] disconnected');
});

const originalConsole = window.console;
window.console = {};

CONSOLE_LEVELS.forEach((level) => {
  window.console[level] = (...args) => {
    socket.emit(IO_EVENT_CONSOLE, { level, args });
    originalConsole[level](...args);
  };
});

window.onerror = (msg, url, line, col, err) => {
  socket.emit(IO_EVENT_ERROR, serializeError(err));
};
