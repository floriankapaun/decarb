import cluster from 'cluster';
import os from 'os';

import runExpressServer from './app.js';

// Check if current process is primary
if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    // Get total of CPU cores
    const numberOfCpuCores = os.cpus().length;
    // Spawn a worker for every CPU core
    for (let i = 0; i < numberOfCpuCores; i++) {
        cluster.fork();
    }
    // Log if a worker dies
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log(`Staring a new one...`);
        cluster.fork();
    });
} else {
    // Since this is not the primary process, spawn a worker
    runExpressServer();
}
