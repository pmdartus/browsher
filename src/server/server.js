// @flow

import path from 'path';
import express from 'express';
import socketIO from 'socket.io';
import {
  Server,
} from 'http';

import {
  DEFAULT_PORT as PORT,
} from '../shared/config';
import {
  setupSocket,
} from './socket';
import {
  registerServer,
} from './cleanup';

const CLIENT_FILE_PATH = path.resolve(__dirname, '../client.js');
const HTML_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Socket IO test</title>
</head>
<body>
  <script src="client.js"></script>
</body>
</html>
`;

function setupApp(app) {
  app.get('/', (req, res) => res.send(HTML_TEMPLATE));
  app.get('/client.js', (req, res) => res.sendFile(CLIENT_FILE_PATH));
}

export default function () {
  return new Promise((resolve) => {
    const app = express();
    const http = Server(app);
    registerServer(http);

    const io = socketIO(http);
    setupSocket(io);

    setupApp(app);

    http.listen(PORT, () => resolve(http));
  });
}
