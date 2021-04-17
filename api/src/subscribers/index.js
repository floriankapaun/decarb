import EventEmitter from '../utils/eventEmitter.js';
import { EVENTS } from '../config/index.js';
import { createDomainSubscriber, deleteDomainSubscriber } from './domain.js';

EventEmitter.on(EVENTS.create.domain, createDomainSubscriber);
EventEmitter.on(EVENTS.delete.domain, deleteDomainSubscriber);

export default EventEmitter;