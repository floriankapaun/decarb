import * as argon2 from 'argon2';

import PrismaService from './PrismaService';

class AuthService {
    async setPassword(id, password, options) {
        const userData = {
            password: await argon2.hash(password),
        };
        const updatedUser = await PrismaService.update('user', id, userData, options);
        return updatedUser
    }
}

export default new AuthService();
