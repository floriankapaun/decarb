import EventEmitter from '../utils/eventEmitter.js';
import { EVENTS } from '../config/index.js';
import { createDomainSubscriber } from './domain.js';

EventEmitter.on(EVENTS.CREATE.DOMAIN, createDomainSubscriber);

export default EventEmitter;