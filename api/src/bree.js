import Bree from 'bree';

import jobs from './jobs/index.js';

const bree = new Bree({
    root: false,
    jobs,
});

bree.start();

export default bree;