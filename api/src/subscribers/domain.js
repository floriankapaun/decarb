import EventEmitter from '../utils/eventEmitter.js';
import { EVENTS } from '../config/index.js';

EventEmitter.on(EVENTS.CREATE.DOMAIN, (data) => {
    console.log('DOMAIN_EVENT', data);
});

export default EventEmitter;