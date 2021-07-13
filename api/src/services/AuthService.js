import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import {
    ACCESS_TOKEN_EXPIRES,
    JWT_SECRET_KEY,
    REFRESH_TOKEN_EXPIRES,
} from '../config/index.js';
import AppError from '../utils/AppError.js';
import { addMinutesToDate } from '../utils/date.js';
import PrismaService from './PrismaService.js';


/**
 * Handles Authentication
 * 
 * The implementation is modelled on the OAuth 2.0 standard,
 * with Access- and Refresh-Tokens. But to complete it, more work
 * needs to be put into it, like adding a Client ID and Secret or
 * setting up an external Auth-Service.
 */
class AuthService {


    /**
     * Create a JSON Web Token with user id and email encoded
     * that expires in x minutes.
     * 
     * @param {Object} user 
     * @param {Number} expiresIn - minutes
     * @returns {String} - JWT
     */
    createJWT(user, expiresIn) {
        const payload = {
            'x-decarb-user-id': user.id,
            'x-decarb-user-email': user.email,
        };
        const options = { expiresIn: `${expiresIn}m` };
        return jwt.sign(payload, JWT_SECRET_KEY, options);
    }


    /**
     * Create an Access-Token for a User
     * 
     * @param {Object} user 
     * @returns {Object} - accessToken and accessTokenExpiry
     */
    createAccessToken(user) {
        return {
            accessToken: this.createJWT(user, ACCESS_TOKEN_EXPIRES),
            accessTokenExpiry: addMinutesToDate(new Date(), ACCESS_TOKEN_EXPIRES),
        }
    }


    /**
     * Create a Refresh-Token for a User and save it in DB
     * 
     * @param {Object} user 
     * @returns - refreshToken and refreshTokenExpiry
     */
    async createRefreshToken(user) {
        const refreshToken = uuidv4();
        const refreshTokenExpiry = addMinutesToDate(new Date(), Number(REFRESH_TOKEN_EXPIRES));
        const updatedUserData = { refreshToken, refreshTokenExpiry };
        const persist = await PrismaService.update('user', user.id, updatedUserData);
        if (!persist.refreshToken || !persist.refreshTokenExpiry) {
            throw new AppError(
                `Failed persisting refreshToken for User "${user.id}" to db`,
                500
            );
        }
        return { refreshToken, refreshTokenExpiry };
    }


    /**
     * Log a User in
     * 
     * @param {String} email 
     * @param {String} password 
     * @returns {Object} - accessToken(Expiry) and refreshToken(Expiry)
     */
    async login(email, password) {
        // Find user by email
        const user = await PrismaService.findUnique('user', { email });
        if (!user) {
            throw new AppError(`User does not exist`, 404);
        }
        // Make sure user is verified
        if (!user.verifiedAt) {
            throw new AppError(`${email} is not verified yet`, 409);
        };
        // Check if password is valid
        const validPassword = await argon2.verify(user.password, password)
        if (!validPassword) {
            throw new AppError(`Invalid password given for ${email}`, 403);
        }
        // Create accessToken
        const { accessToken, accessTokenExpiry } = this.createAccessToken(user);
        // TODO: Dont do the next step if already existing to enable double client sessions
        // Create refreshToken and store in db
        const { refreshToken, refreshTokenExpiry } = await this.createRefreshToken(user);
        // Return tokens
        return {
            accessToken,
            accessTokenExpiry,
            refreshToken,
            refreshTokenExpiry,
        };
    }


    /**
     * Log a User out
     * 
     * @param {String} email 
     * @returns {String} - Status
     */
    async logout(email) {
        // Find user by email
        const user = await PrismaService.findUnique('user', { email });
        // Delete refreshToken
        const updatedUserData = {
            refreshToken: null,
            refreshTokenExpiry: null,
        };
        const save = await PrismaService.update('user', user.id, updatedUserData);
        if (!save || save.refreshToken || save.refreshTokenExpiry) {
            throw new AppError(`Failed to logout ${email}`, 500);
        }
        return `Logged out ${email}.`;
    }


    /**
     * Create new Access-Token for a User
     * 
     * @param {String} email 
     * @param {String} givenRefreshToken 
     * @returns {Object} accessToken and accessTokenExpiry
     */
    async refreshToken(email, givenRefreshToken) {
        // Validate givenRefreshToken
        const user = await PrismaService.findUnique('user', { email });
        if (!user) {
            throw new AppError(`Failed to get User by "${email}"`, 500);
        }
        if (!user.refreshToken || user.refreshToken !== givenRefreshToken) {
            throw new AppError(`Invalid refreshToken given for ${email}`, 403);
        }
        if (!user.refreshTokenExpiry || user.refreshTokenExpiry <= new Date()) {
            throw new AppError('Refresh Token Expired. Please login again.', 403);
        }
        // Create and return new accessToken
        return this.createAccessToken(user);
    }
}

export default new AuthService();
