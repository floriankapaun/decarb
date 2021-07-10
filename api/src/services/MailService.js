import nodemailer from 'nodemailer';

import {
    ADMIN_EMAIL,
    PLATFORM_EMAIL_HOST,
    PLATFORM_EMAIL_PASSWORD,
    PLATFORM_EMAIL_PORT,
    PLATFORM_EMAIL_SENDER,
    PLATFORM_EMAIL_USER,
} from '../config/index.js';


/**
 * Handles mail sending
 */
class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: PLATFORM_EMAIL_HOST,
            port: PLATFORM_EMAIL_PORT,
            secure: false,
            auth: {
                user: PLATFORM_EMAIL_USER,
                pass: PLATFORM_EMAIL_PASSWORD,
            },
        });
    }


    /**
     * Send a Mail with Nodemailer
     * 
     * @param {String} subject - mail subject line
     * @param {String} html - mail body
     * @param {String} to - comma seperated list of receivers
     * @param {String} from
     * @returns {Object} - Nodemailer response
     */
    async send(subject, html, to = ADMIN_EMAIL, from = PLATFORM_EMAIL_SENDER) {
        const mailOptions = { from, to, subject, html };
        const response = await this.transporter.sendMail(mailOptions);
        // TODO: Add error handling and don't return the full Nodemailer response
        return response;
    }
}

export default new MailService();
