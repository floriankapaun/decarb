import UserService from '../services/UserService.js';


/**
 * If a User got created, send a Mail with a verification Code
 * to his/her E-Mail.
 * 
 * @param {Object} user 
 */
export const createUserSubscriber = (user) => {
    console.log('🗃️ Created User', user);
    UserService.sendVerificationMail(user);
};