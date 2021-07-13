import * as argon2 from 'argon2';

import { CLIENT_ENTRYPOINT, PROJECT_NAME } from '../config/index.js';
import AppError from '../utils/AppError.js';
import MailService from './MailService.js';
import PrismaService from './PrismaService.js';


/**
 * Controls the 'User' Entity
 */
class UserService {
    constructor() {
        this.publicReturnValues = {
            select: {
                id: true,
                email: true,
                createdAt: true,
                verifiedAt: true,
                deletedAt: true,
                password: false,
                verificationCode: false,
            }
        };
    }


    /**
     * Creates a random verificationCode
     * 
     * Reference: https://stackoverflow.com/a/21816636
     * 
     * @returns {Integer} - 6-digit random number
     */
    createVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000);
    }


    /**
     * Creates a new User by Email and returns public
     * information about him/her
     * 
     * @param {String} email 
     * @returns {Object} - Public User Info
     */
    async create(email) {
        const verificationCode = this.createVerificationCode();
        const userData = {
            email,
            verificationCode,
        };
        const newUser = await PrismaService.create('user', userData);
        // Only give back information that is intended for the public
        return {
            id: newUser.id,
            email: newUser.email,
        };
    }


    /**
     * Returns some info about a Users registration state
     * 
     * @param {String} id - User ID
     * @returns {Object} - Registration State Info
     */
    async getRegistrationState(id) {
        const user = await PrismaService.findUnique('user', { id });
        if (!user) {
            throw new AppError(`Couldn't find User "${id}"`, 404);
        }
        return {
            exists: user.id ? true : false,
            hasPassword: user.password ? true : false,
            isVerified: user.verifiedAt? true: false,
        };
    }


    /**
     * Send an E-Mail to a new registered User including his/her
     * Verification Code
     * 
     * @param {Object} user 
     * @returns {Object} MailService Response
     */
    async sendVerificationMail(user) {
        const mailSubject = `Verify your E-Mail to start using ${PROJECT_NAME}`;
        const mailBody = `
            <h1>Welcome!</h1>
            <p>To verify your E-Mail, copy and paste the following code to <a href="${CLIENT_ENTRYPOINT}/users/${user.id}/verify-email">${CLIENT_ENTRYPOINT}</a>.</p>
            <pre style="font-size: 2rem"><code>${user.verificationCode}</code></pre>
            <p>The code expires in 24 hours.</p>
            <p>You didn’t try to sign up for ${PROJECT_NAME}? Just ignore this message an we'll take care of the rest.</p>
            <p>Thanks, <br>${PROJECT_NAME}</p>
        `;
        // TODO: Handle not existing user.mail
        return await MailService.send(mailSubject, mailBody, user.email);
    }


    /**
     * Create a new Verification Code for a User and send an
     * E-Mail including it.
     * 
     * @param {String} userId - User ID
     * @returns {Object} - MailService Response
     */
    async resendVerificationCode(userId) {
        const updatedUserData = {
            verificationCode: this.createVerificationCode(),
        };
        const updatedUser = await PrismaService.update('user', userId, updatedUserData);
        // TODO: This probably shouldn't return mail sending details. Think of something better.
        return this.sendVerificationMail(updatedUser);
    }


    /**
     * Verifies a User given his/her Verification Code
     * 
     * @param {String} id - User ID
     * @param {String} givenVerificationCode 
     * @returns {Object} - Updated User
     */
    async verify(id, givenVerificationCode) {
        const options = {
            select: {
                verificationCode: true,
                verifiedAt: true,
            }
        };
        const userData = await PrismaService.findUnique('user', { id }, options);
        if (userData.verifiedAt) {
            throw new AppError(
                `User already verified at ${userData.verifiedAt}.`,
                409
            );
        }
        if (givenVerificationCode !== userData.verificationCode.toString()) {
            throw new AppError(
                `Verification failed. Verification Code ${givenVerificationCode} is wrong.`,
                403
            );
        }
        // Update user verifiedAt
        const updatedUserData = { verifiedAt: new Date() };
        const updatedUser = await PrismaService.update('user', id, updatedUserData, this.publicReturnValues);
        // TODO: Maybe send a mail to let the User know the verification was successful
        return updatedUser;
    }


    /**
     * Sets a Users Password
     * 
     * @param {String} id - User ID
     * @param {String} password
     * @returns {String} - Status
     */
    async setUserPassword(id, password) {
        // Make sure User exists and E-Mail is already verified
        const options = { select: { verifiedAt: true } };
        const userData = await PrismaService.findUnique('user', { id }, options);
        if (!userData) {
            throw new AppError(`Couldn't find User "${id}"`, 404);
        }
        if (!userData.verifiedAt) {
            throw new AppError(`User "${id}" E-Mail isn't verified yet.`, 409);
        }
        // Hash password with argon2
        const updatedUserData = { password: await argon2.hash(password) };
        // Set users password
        const updatedUser = await PrismaService.update('user', id, updatedUserData, this.publicReturnValues);
        // Don't return the User data but only a status message
        if (updatedUser) return 'Successfully set User Password';
        throw new AppError(`Unable to set Password for User ${id}`, 500);
    }


    /**
     * Get a User by ID including his/her Domains
     * 
     * @param {String} id - User ID
     * @returns {Object} - User including Domains
     */
    async getIncludingDomains(id) {
        const options = { include: { domains: true } };
        const user = await PrismaService.findUnique('user', { id }, options);
        if (user) return user;
        throw new AppError(
            `Can't find user with id: ${userId}`,
            404
        );
    }
}

export default new UserService();
