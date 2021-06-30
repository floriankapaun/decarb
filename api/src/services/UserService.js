import * as argon2 from 'argon2';

import { CLIENT_ENTRYPOINT, PROJECT_NAME } from '../config/index.js';
import AppError from '../utils/AppError.js';
import MailService from './MailService.js';
import PrismaService from './PrismaService.js';

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

    async create(email) {
        const verificationCode = this.createVerificationCode();
        const userData = {
            email,
            verificationCode,
        };
        console.log(userData);
        const newUser = await PrismaService.create('user', userData);
        return newUser;
    }

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

    async resendVerificationCode(userId) {
        const updatedUserData = {
            verificationCode: this.createVerificationCode(),
        };
        const updatedUser = await PrismaService.update('user', userId, updatedUserData);
        // TODO: Should this really return mail sending details to the user?
        return this.sendVerificationMail(updatedUser);
    }

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
        const updatedUserData = {
            verifiedAt: new Date(),
        };
        const updatedUser = await PrismaService.update('user', id, updatedUserData, this.publicReturnValues);
        // TODO: Send mail to let the user know the verification was successful
        return updatedUser;
    }

    async setUserPassword(id, password) {
        const options = { select: { verifiedAt: true } };
        const userData = await PrismaService.findUnique('user', { id }, options);
        // Make sure user email is already verified
        if (!userData.verifiedAt) {
            return 'User email isn\'t verified yet.';
        }
        // Hash password with argon2
        const updatedUserData = { password: await argon2.hash(password) };
        // Set users password
        const updatedUser = await PrismaService.update('user', id, updatedUserData, this.publicReturnValues);
        return updatedUser;
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
