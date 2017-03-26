import type {
  ChildProcess,
} from 'child_process';

import type {
  Server,
} from 'http';

const SIGINT = 'SIGINT';

const childProcess: Array<ChildProcess> = [];
const servers: Array<Server> = [];

export function registerChildProcess(cp: ChildProcess) {
  childProcess.push(cp);
}

export function registerServer(server: Server) {
  servers.push(server);
}

function cleanup() {
  console.log('Cleanup');

  childProcess.forEach(cp => cp.kill(SIGINT));
  servers.forEach(server => server.close());
}

process.stdin.resume();

// process.on('exit', () => cleanup());
process.on('SIGINT', () => cleanup());
process.on('uncaughtException', () => cleanup());
