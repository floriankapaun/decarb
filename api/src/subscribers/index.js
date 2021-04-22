import EventEmitter from '../utils/eventEmitter.js';
import { EVENTS } from '../config/index.js';
import {
    createDomainSubscriber,
    updateDomainSubscriber,
    deleteDomainSubscriber
} from './domainSubscribers.js';
import { createOffsetSubscriber } from './offsetSubscriber.js';
import { createManyPagesSubscriber, createInitialPageIndexSubscriber } from './pageSubscribers.js';
import { createUserSubscriber } from './userSubscribers.js';

EventEmitter.on(EVENTS.create.domain, createDomainSubscriber);
EventEmitter.on(EVENTS.update.domain, updateDomainSubscriber);
EventEmitter.on(EVENTS.delete.domain, deleteDomainSubscriber);

EventEmitter.on(EVENTS.create.offset, createOffsetSubscriber);

EventEmitter.on(EVENTS.createMany.page, createManyPagesSubscriber);

EventEmitter.on(EVENTS.create.initialPageIndex, createInitialPageIndexSubscriber);

EventEmitter.on(EVENTS.create.user, createUserSubscriber);

export default EventEmitter;