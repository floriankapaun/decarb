import * as argon2 from 'argon2';

import MailService from './MailService';
import PrismaService from './PrismaService';

class UserService {
    constructor() {
        this.publicReturnValues = {
            select: {
                id: true,
                email: true,
                telephone: true,
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

    async create(email, telephone) {
        const verificationCode = this.createVerificationCode();
        const userData = {
            email,
            telephone,
            verificationCode,
        };
        console.log(userData);
        const newUser = await PrismaService.create('user', userData);
        return newUser;
    }

    async sendVerificationMail(user) {
        const mailSubject = 'Setup your Eco Web Account';
        const mailBody = `
            <h1>Welcome!</h1>
            <!-- Verify your new Eco Web Account -->
            <p>To get started, please enter this code to confirm it’s you.</p>
            <!-- Please enter the following code: -->
            <pre style="font-size: 2rem"><code>${user.verificationCode}</code></pre>
            <p>The code expires in 24 hours. Didn’t try to sign up for Eco Web? You can safely ignore this email.</p>
            <!-- Do not give this code to third parties, as it can be used to access your Eco Web account. -->
            <p>Best Regards, <br>The Eco Web Team</p>
            <!-- Thank you very much! -->
        `;
        // TODO: Handle not existing user.mail
        return await MailService.send(user.email, mailSubject, mailBody);
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
            return `User already verified at ${userData.verifiedAt}.`;
        }
        if (givenVerificationCode !== userData.verificationCode.toString()) {
            return `Verification failed. Given verification code ${givenVerificationCode} is not correct.`;
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
}

export default new UserService();
