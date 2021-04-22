import nodemailer from 'nodemailer';

import {
    PLATFORM_EMAIL_HOST,
    PLATFORM_EMAIL_PASSWORD,
    PLATFORM_EMAIL_PORT,
    PLATFORM_EMAIL_SENDER,
    PLATFORM_EMAIL_USER,
} from '../config';

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
     * Send a Mail with nodemailer
     * 
     * @param {String} to - comma seperated list of receivers
     * @param {String} subject - mail subject line
     * @param {String} html - mail body
     */
    async send(to, subject, html) {
        const mailOptions = {
            from: PLATFORM_EMAIL_SENDER,
            to: to,
            subject: subject,
            html: html,
        };

        const response = await this.transporter.sendMail(mailOptions);
        // TODO: Add error handling
        return response;
    }
}

export default new MailService();
