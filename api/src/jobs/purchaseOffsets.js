import { parentPort } from 'worker_threads';
import OffsetService from '../services/OffsetService';

(async () => {
    const now = new Date();
    const offsets = await OffsetService.getAllCurrent(now);
    for (const offset of offsets) {
        if (now < offset.until) continue;
        // If Offset is already due, make a Purchase for it
        const updatedOffset = await OffsetService.makePurchase(offset);
        console.log(`📝 Job "purchaseOffsets" purchased Offsets: `, updatedOffset);
    }
    if (parentPort) parentPort.postMessage('done');
    else process.exit(0);
})();