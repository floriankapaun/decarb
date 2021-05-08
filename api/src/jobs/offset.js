import { parentPort } from 'worker_threads';

console.log('OFFSETTING JOB IS NOT DEFINED YET');

if (parentPort) parentPort.postMessage('done');
else process.exit(0);