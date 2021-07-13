import Bree from 'bree';

import jobs from './jobs/index.js';

// Create Bree Instance to run scheduled Jobs defined in './jobs/index.js'
const bree = new Bree({
    root: false,
    jobs,
});

bree.start();

export default bree;