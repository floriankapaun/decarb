import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { ACCESS_TOKEN_EXPIRES, JWT_SECRET_KEY, REFRESH_TOKEN_EXPIRES } from '../config';
import { addMinutesToDate } from '../utils/date';
import PrismaService from './PrismaService';

class AuthService {
    createJwtToken(user, expiresIn) {
        // TODO: Add role stuff...
        const payload = {
            'x-decarb-user-id': user.id,
            'x-decarb-user-email': user.email,
            'x-decarb-allowed-role': user.role, 
        };
        const options = { expiresIn: `${expiresIn}m` };
        return jwt.sign(payload, JWT_SECRET_KEY, options);
    }

    createAccessToken(user) {
        return {
            accessToken: this.createJwtToken(user, ACCESS_TOKEN_EXPIRES),
            accessTokenExpiry: addMinutesToDate(new Date(), ACCESS_TOKEN_EXPIRES),
        }
    }

    async createRefreshToken(user) {
        const refreshToken = uuidv4();
        const refreshTokenExpiry = addMinutesToDate(new Date(), REFRESH_TOKEN_EXPIRES);
        const updatedUserData = { refreshToken, refreshTokenExpiry };
        const persist = await PrismaService.update('user', user.id, updatedUserData);
        if (!persist.refreshToken || !persist.refreshTokenExpiry) {
            return 'Failed persisting the refresh token to db';
        }
        return { refreshToken, refreshTokenExpiry };
    }

    async login(email, password) {
        // Find user by email
        const user = await PrismaService.findUnique('user', { email });
        // Make sure user is verified
        if (!user.verifiedAt) return { error: `User isn't verified yet.` };
        // Check if password is valid
        const validPassword = await argon2.verify(user.password, password)
        if (!validPassword) return { error: `Password is invalid.` };
        // Create accessToken
        const { accessToken, accessTokenExpiry } = this.createAccessToken(user);
        // Create refreshToken and store in db
        // TODO: Dont do this if already existing to enable double client sessions ???
        const { refreshToken, refreshTokenExpiry } = await this.createRefreshToken(user);
        // Return tokens
        return {
            accessToken,
            accessTokenExpiry,
            refreshToken,
            refreshTokenExpiry,
        };
    }

    async logout(email) {
        // Find user by email
        const user = await PrismaService.findUnique('user', { email });
        // Delete refreshToken
        const updatedUserData = {
            refreshToken: null,
            refreshTokenExpiry: null,
        };
        const save = await PrismaService.update('user', user.id, updatedUserData);
        if (save.refreshToken || save.refreshTokenExpiry) {
            console.log('LOGOUT FAILED');
            return `Wasn't able to logout ${email}.`;
        }
        return `Logged out ${email}.`;
    }

    async refreshToken(email, givenRefreshToken) {
        // Validate givenRefreshToken
        const user = await PrismaService.findUnique('user', { email });
        if (!user.refreshToken || user.refreshToken !== givenRefreshToken) {
            return `Provided refresh token invalid.`;
        }
        if (!user.refreshTokenExpiry || user.refreshTokenExpiry <= new Date()) {
            return `Refresh token expired.`;
        }
        // Create and return new accessToken
        return this.createAccessToken(user);
    }
}

export default new AuthService();
