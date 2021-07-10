import { Router } from 'express';

import attachCurrentUser from '../middlewares/attachCurrentUser.js';
import isAuth from '../middlewares/isAuth.js';
import DomainService from '../services/DomainService.js';
import UserService from '../services/UserService.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendResponse from '../utils/sendResponse.js';

const router = Router();

export default (app) => {
    app.use('/users', router);

    // Create a User
    router.post('/', asyncHandler(async (req, res) => {
        const newUser = await UserService.create(req.body.email);
        return sendResponse(res, newUser);
    }));

    // Get a Users registration state
    // For more data check '/auth/user'
    router.get('/:id/registration-state', asyncHandler(async (req, res) => {
        const { id } = req.params;
        const userRegistrationState = await UserService.getRegistrationState(id);
        return sendResponse(res, userRegistrationState);
    }));

    // Reset verificationCode: Create new verificationCode and send Mail with new code
    // CHECK: Security implications?
    router.post('/:id/reset-verification', asyncHandler(async (req, res) => {
        const { id } = req.params;
        // NOTE: This is currently not returning an updatedUser but the nodemail response
        const updatedUser = await UserService.resendVerificationCode(id);
        return sendResponse(res, 'Sent new Verification Code');
    }));

    // Verify User email
    // TODO: Make verification code expire after 30 Minutes
    router.post('/:id/verification', asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { verificationCode } = req.body;
        const verification = await UserService.verify(id, verificationCode);
        return sendResponse(res, verification);
    }));

    // Set User password
    // FIXME: This route is currently working forever and without authentication
    router.post('/:id/password', asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { password } = req.body;
        const set = await UserService.setUserPassword(id, password);
        return sendResponse(res, set);
    }));


    /**
     * User -> Domain
     */

    // Get all Domains a User has access to
    router.get(
        '/:id/domains',
        isAuth,
        attachCurrentUser,
        asyncHandler(async (req, res) => {
            const userDomains = await DomainService.getByUser(req);
            return sendResponse(res, userDomains);
        })
    );
};