import EventEmitter from '../utils/eventEmitter.js';
import { EVENTS } from '../config/index.js';
import { createDomainSubscriber, updateDomainSubscriber, deleteDomainSubscriber } from './domainSubscribers.js';
import { createManyPagesSubscriber } from './pageSubscribers.js';

EventEmitter.on(EVENTS.create.domain, createDomainSubscriber);
EventEmitter.on(EVENTS.update.domain, updateDomainSubscriber);
EventEmitter.on(EVENTS.delete.domain, deleteDomainSubscriber);

EventEmitter.on(EVENTS.createMany.page, createManyPagesSubscriber);

export default EventEmitter;