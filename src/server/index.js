// @flow

import path from 'path';
import express from 'express';
import { Server } from 'http';
import socketIO from 'socket.io';
import opn from 'opn';

import setupSocket from './socket';
import {
  registerServer,
  registerChildProcess,
} from './cleanup';

const app = express();
const http = Server(app);
registerServer(http);

const io = socketIO(http);
setupSocket(io);

app.get('/', (req, res) => res.send(HTML_TEMPLATE));
app.get('/client.js', (req, res) => res.sendFile(CLIENT_FILE_PATH));

http.listen(PORT, () => (
  console.log(`[server] App running on port ${PORT}`)
));

opn('http://localhost:3000', {
  app: 'firefox',
  wait: false,
}).then((cp) => {
  registerChildProcess(cp);
});
