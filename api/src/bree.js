import Bree from 'bree';

import jobs from './jobs.js';

const bree = new Bree({
    root: false,
    jobs,
});

bree.start();
