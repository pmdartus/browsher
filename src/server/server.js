// @flow

import path from 'path';
import express from 'express';
import socketIO from 'socket.io';
import {
  Server,
} from 'http';

import setupSocket from './socket';
import {
  DEFAULT_PORT as PORT,
} from '../shared/config';

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

export default function (): Server {
  const app = express();
  const http = Server(app);

  const io = socketIO(http);
  setupSocket(io);

  app.get('/', (req, res) => res.send(HTML_TEMPLATE));
  app.get('/client.js', (req, res) => res.sendFile(CLIENT_FILE_PATH));

  http.listen(PORT, () => (
    console.log(`Ready to listen on ${PORT}`)
  ));

  return http;
}
