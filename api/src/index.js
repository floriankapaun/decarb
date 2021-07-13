import cluster from 'cluster';
import os from 'os';

import runExpressServer from './app.js';
import { MAX_NUMBER_OF_WORKERS } from './config/index.js';

// Check if current process is primary
if (cluster.isPrimary) {
    console.info(`Primary ${process.pid} is running`);
    // Get total of CPU cores
    const numberOfCpuCores = os.cpus().length;
    // Limit number of workers
    const numberOfWorkers = numberOfCpuCores > MAX_NUMBER_OF_WORKERS
        ? MAX_NUMBER_OF_WORKERS
        : numberOfCpuCores;
    // Spawn workers
    for (let i = 0; i < numberOfWorkers; i++) {
        cluster.fork();
    }
    // Log if a worker dies
    cluster.on('exit', (worker, code, signal) => {
        console.error(`worker ${worker.process.pid} died`);
        console.info(`Staring a new one...`);
        cluster.fork();
    });
} else {
    // Since this is not the primary process, spawn a worker
    runExpressServer();
}
