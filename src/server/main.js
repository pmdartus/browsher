// @flow

import opn from 'opn';
import httpProxy from 'http-proxy';

import Browsher from './browsher';
import createServer from './server';

import type {
  BrowsherConfig,
} from '../shared/types';

export default function (config: BrowsherConfig) {
  const server = createServer();
  const { port } = server.address();

  httpProxy.createProxyServer({
    target: 'http://getbootstrap.com/',
  }).listen(3001);

  return opn(`http://localhost:${port}/#${config.url}`, {
    app: [
      '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
      '--disable-web-security',
      '--user-data-dir',
    ],
    wait: false,
  }).then((childProcess) => {
    return new Browsher(config, server, childProcess);
  });
}
