import UserService from '../services/UserService.js';

export const createUserSubscriber = (user) => {
    console.log('🗃️ Created User', user);
    // Send verification E-Mail
    UserService.sendVerificationMail(user);
};