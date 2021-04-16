import events from '../subscribers/events';

export default class AuthService {
    constructor() { }

    async signUp(data) {
        try {
            const salt = 'test';

        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
};