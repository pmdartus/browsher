// @flow

import express from 'express';
import httpProxy from 'http-proxy';
import replaceStream from 'replacestream';
import * as portscanner from 'portscanner';

const TO_PROXY = 'https://facebook.github.io/';
const DEFAULT_PROXY_OPTIONS = {
  changeOrigin: true,
  autoRewrite: true,
  secure: true,
  ws: true,
};

function errorHandler(err: Error) {
  console.error(err);
}

function proxyReq(reqProxy) {
  console.log('[Network]', reqProxy.path);
}

export default function createProxyServer(target: string) {
  const options = Object.assign({}, DEFAULT_PROXY_OPTIONS, { target });
  const proxy = httpProxy.createProxyServer(options);

  proxy.on('error', errorHandler);
  proxy.on('proxyReq', proxyReq);

  const app = express();

  app.use((req, res) => {
    const replace = replaceStream('React', 'REACT');
    const _write = res.write;
    const _end = res.end;

    replace.on('data', buf => _write.call(res, buf));
    replace.on('end', () => _end.call(res));

    res.write = data => replace.write(data);
    res.end = () => replace.end();
  });

  app.use((req, res) => (
    proxy.web(req, res)
  ));

  return app;
}

portscanner.findAPortNotInUse(3000, 4000).then((port) => {
  const proxy = createProxyServer(TO_PROXY);

  console.log('ready on port', port);
  proxy.listen(port);
});
