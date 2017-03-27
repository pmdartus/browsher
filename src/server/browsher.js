// @flow

import EventEmitter from 'events';

import type { ChildProcess } from 'child_process';
import type { Server } from 'http';
import type { BrowsherConfig } from '../shared/types';

class Browsher extends EventEmitter {
  config: BrowsherConfig;
  server: Server;
  cp: ChildProcess;

  constructor(
    config: BrowsherConfig,
    server: Server,
    cp: ChildProcess,
  ) {
    super();

    this.config = config;
    this.cp = cp;
    this.server = server;
  }
}

export default Browsher;
